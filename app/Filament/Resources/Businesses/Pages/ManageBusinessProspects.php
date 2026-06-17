<?php

namespace App\Filament\Resources\Businesses\Pages;

use App\Filament\Resources\Businesses\BusinessResource;
use App\Filament\Resources\Prospects\ProspectResource;
use App\Filament\Resources\Prospects\Schemas\ProspectForm;
use App\Filament\Resources\Prospects\Widgets\ProspectStatsOverview;
use App\Models\Prospect;
use BackedEnum;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ManageRelatedRecords;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ManageBusinessProspects extends ManageRelatedRecords
{
    protected static string $resource = BusinessResource::class;

    protected static string $relationship = 'prospects';

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $title = 'Prospects';

    public static function getNavigationLabel(): string
    {
        return 'Prospects';
    }

    /**
     * Prospects are managed by admins and by the sales agents assigned to the
     * business. Record scoping in the resource already blocks unassigned
     * businesses, so we bypass the resource's admin-only canEdit() gate here.
     */
    protected function authorizeAccess(): void
    {
        //
    }

    protected function getHeaderWidgets(): array
    {
        return [
            ProspectStatsOverview::class,
        ];
    }

    /**
     * Scope the prospect stats widget to the current business.
     *
     * @return array<string, mixed>
     */
    public function getWidgetData(): array
    {
        return [
            'businessId' => $this->getRecord()->getKey(),
        ];
    }

    /**
     * @return array<string, Tab>
     */
    public function getTabs(): array
    {
        return ProspectResource::statusTabs();
    }

    public function form(Schema $schema): Schema
    {
        // business_id is auto-assigned from the owner Business record.
        return ProspectForm::configure($schema, withBusiness: false);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('business_name')
            ->columns([
                TextColumn::make('code')
                    ->label('Code')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('business_name')
                    ->label('Business')
                    ->searchable(),
                TextColumn::make('owner_name')
                    ->label('Owner')
                    ->searchable(),
                TextColumn::make('phone_number')
                    ->label('Phone')
                    ->toggleable(),
                TextColumn::make('deal_status')
                    ->label('Status')
                    ->badge()
                    ->sortable(),
                TextColumn::make('creator.name')
                    ->label('Created by')
                    ->placeholder('—')
                    ->toggleable(),
                TextColumn::make('editor.name')
                    ->label('Last updated by')
                    ->placeholder('—')
                    ->toggleable(),
                TextColumn::make('updated_at')
                    ->label('Last updated')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->deferLoading()
            ->deferFilters()
            ->modifyQueryUsing(fn (Builder $query): Builder => ProspectResource::scopeForSalesAgent($query))
            ->headerActions([
                CreateAction::make()
                    ->visible(fn (): bool => ProspectResource::canCreate()),
            ])
            ->recordActions([
                EditAction::make()
                    ->visible(fn (Prospect $record): bool => ProspectResource::canEdit($record)),
                DeleteAction::make()
                    ->visible(fn (Prospect $record): bool => ProspectResource::canDelete($record)),
            ]);
    }
}
