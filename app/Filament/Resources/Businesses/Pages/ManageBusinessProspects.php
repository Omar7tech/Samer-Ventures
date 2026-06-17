<?php

namespace App\Filament\Resources\Businesses\Pages;

use App\Filament\Resources\Businesses\BusinessResource;
use App\Filament\Resources\Prospects\ProspectResource;
use App\Filament\Resources\Prospects\Schemas\ProspectForm;
use BackedEnum;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ManageRelatedRecords;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

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
                TextColumn::make('quote')
                    ->label('Quote')
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
            ])
            ->headerActions([
                CreateAction::make(),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make()
                    ->visible(fn (): bool => (bool) auth()->user()?->hasRole('super_admin')),
            ]);
    }
}
