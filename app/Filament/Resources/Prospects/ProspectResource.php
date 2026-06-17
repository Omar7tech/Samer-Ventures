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
use Filament\Resources\Resource;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class ProspectResource extends Resource
{
    protected static ?string $model = Prospect::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'business_name';

    /**
     * Only super admins may delete prospects. All other roles with access
     * (including sales agents) can still create and edit.
     */
    public static function canDelete(Model $record): bool
    {
        return (bool) auth()->user()?->hasRole('super_admin');
    }

    public static function canDeleteAny(): bool
    {
        return (bool) auth()->user()?->hasRole('super_admin');
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
