<?php

namespace App\Filament\Resources\Prospects;

use App\Enums\DealStatus;
use App\Filament\Resources\Prospects\Pages\CreateProspect;
use App\Filament\Resources\Prospects\Pages\EditProspect;
use App\Filament\Resources\Prospects\Pages\ListProspects;
use App\Filament\Resources\Prospects\Schemas\ProspectForm;
use App\Filament\Resources\Prospects\Tables\ProspectsTable;
use App\Models\Prospect;
use BackedEnum;
use Carbon\CarbonInterface;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class ProspectResource extends Resource
{
    protected static ?string $model = Prospect::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'business_name';

    /**
     * A user who is only a sales agent is governed by their per-user prospect permissions.
     */
    public static function isSalesAgent(): bool
    {
        $user = auth()->user();

        return (bool) ($user?->hasRole('sales_agent') && ! $user->hasRole('super_admin'));
    }

    public static function canCreate(): bool
    {
        if (static::isSalesAgent()) {
            return (bool) auth()->user()?->hasProspectPermission('create');
        }

        return true;
    }

    public static function canEdit(Model $record): bool
    {
        if (! static::isSalesAgent()) {
            return true;
        }

        $user = auth()->user();

        return $user->hasProspectPermission('edit_all')
            || ($user->hasProspectPermission('edit_own') && $record->created_by === $user->id);
    }

    public static function canDelete(Model $record): bool
    {
        if (auth()->user()?->hasRole('super_admin')) {
            return true;
        }

        if (! static::isSalesAgent()) {
            return false;
        }

        $user = auth()->user();

        return $user->hasProspectPermission('delete_all')
            || ($user->hasProspectPermission('delete_own') && $record->created_by === $user->id);
    }

    public static function canDeleteAny(): bool
    {
        if (auth()->user()?->hasRole('super_admin')) {
            return true;
        }

        return static::isSalesAgent()
            && (bool) auth()->user()?->hasProspectPermission('delete_all');
    }

    public static function getEloquentQuery(): Builder
    {
        return static::scopeForSalesAgent(parent::getEloquentQuery());
    }

    /**
     * Sales agents without the "view all" permission only see prospects they created.
     *
     * @param  Builder<Prospect>  $query
     * @return Builder<Prospect>
     */
    public static function scopeForSalesAgent(Builder $query): Builder
    {
        $user = auth()->user();

        if (static::isSalesAgent() && ! $user->hasProspectPermission('view_all')) {
            $query->where('created_by', $user->id);
        }

        return $query;
    }

    /**
     * Status tabs shared by the standalone list and the per-business page,
     * each scoping the table to a single deal status (plus an "All" tab).
     *
     * @return array<string, Tab>
     */
    public static function statusTabs(): array
    {
        $tabs = ['all' => Tab::make('All')->badgeColor('gray')];

        foreach (DealStatus::cases() as $status) {
            $tabs[$status->value] = Tab::make($status->getLabel())
                ->badgeColor($status->getColor())
                ->modifyQueryUsing(fn (Builder $query): Builder => $query->where('deal_status', $status->value));
        }

        return $tabs;
    }

    /**
     * Smart period filter for prospects by creation date. Offers month-level presets
     * (this/last month, etc.) plus a custom day range, and defaults to the current month.
     *
     * @return array<string, string>
     */
    public static function periodPresets(): array
    {
        return [
            'today' => 'Today',
            'yesterday' => 'Yesterday',
            'this_week' => 'This week',
            'this_month' => 'This month',
            'last_month' => 'Last month',
            'this_year' => 'This year',
            'custom' => 'Custom range (days)',
        ];
    }

    /**
     * Resolve a preset (and optional custom dates) into a [from, until] range.
     *
     * @param  array<string, mixed>  $data
     * @return array{0: ?CarbonInterface, 1: ?CarbonInterface}
     */
    public static function resolvePeriod(array $data): array
    {
        return match ($data['preset'] ?? null) {
            'today' => [now()->startOfDay(), now()->endOfDay()],
            'yesterday' => [now()->subDay()->startOfDay(), now()->subDay()->endOfDay()],
            'this_week' => [now()->startOfWeek(), now()->endOfWeek()],
            'this_month' => [now()->startOfMonth(), now()->endOfMonth()],
            'last_month' => [now()->subMonthNoOverflow()->startOfMonth(), now()->subMonthNoOverflow()->endOfMonth()],
            'this_year' => [now()->startOfYear(), now()->endOfYear()],
            'custom' => [
                filled($data['from'] ?? null) ? Carbon::parse($data['from'])->startOfDay() : null,
                filled($data['until'] ?? null) ? Carbon::parse($data['until'])->endOfDay() : null,
            ],
            default => [null, null],
        };
    }

    public static function periodFilter(): Filter
    {
        return Filter::make('period')
            ->schema([
                Select::make('preset')
                    ->label('Period')
                    ->options(static::periodPresets())
                    ->default('this_month')
                    ->selectablePlaceholder(false)
                    ->columnSpanFull(),
                DatePicker::make('from')
                    ->label('From')
                    ->native(false)
                    ->visibleJs("\$get('preset') === 'custom'"),
                DatePicker::make('until')
                    ->label('Until')
                    ->native(false)
                    ->visibleJs("\$get('preset') === 'custom'"),
            ])
            ->columns(2)
            ->query(function (Builder $query, array $data): Builder {
                [$from, $until] = static::resolvePeriod($data);

                return $query
                    ->when($from, fn (Builder $query): Builder => $query->where('created_at', '>=', $from))
                    ->when($until, fn (Builder $query): Builder => $query->where('created_at', '<=', $until));
            })
            ->indicateUsing(function (array $data): ?string {
                if (blank($data['preset'] ?? null)) {
                    return null;
                }

                [$from, $until] = static::resolvePeriod($data);
                $label = static::formatPeriod($from, $until);

                return $label ? 'Period: '.$label : null;
            });
    }

    /**
     * Render a [from, until] range as a friendly label: a single day, a whole month
     * ("June 2026"), a whole year ("2026"), or a day range.
     */
    protected static function formatPeriod(?CarbonInterface $from, ?CarbonInterface $until): ?string
    {
        if (! $from && ! $until) {
            return null;
        }

        if ($from && $until) {
            if ($from->isSameDay($until)) {
                return $from->translatedFormat('d M Y');
            }

            if ($from->isSameDay($from->copy()->startOfMonth()) && $until->isSameDay($from->copy()->endOfMonth())) {
                return $from->translatedFormat('F Y');
            }

            if ($from->isSameDay($from->copy()->startOfYear()) && $until->isSameDay($from->copy()->endOfYear())) {
                return $from->translatedFormat('Y');
            }

            return $from->translatedFormat('d M Y').' – '.$until->translatedFormat('d M Y');
        }

        return ($from?->translatedFormat('d M Y') ?? '…').' – '.($until?->translatedFormat('d M Y') ?? '…');
    }

    public static function form(Schema $schema): Schema
    {
        return ProspectForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ProspectsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListProspects::route('/'),
            'create' => CreateProspect::route('/create'),
            'edit' => EditProspect::route('/{record}/edit'),
        ];
    }
}
