<?php

namespace App\Filament\Resources\Businesses\RelationManagers;

use App\Enums\DealStatus;
use App\Filament\Resources\Prospects\Schemas\ProspectForm;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class ProspectsRelationManager extends RelationManager
{
    protected static string $relationship = 'prospects';

    protected static ?string $recordTitleAttribute = 'business_name';

    public function form(Schema $schema): Schema
    {
        return ProspectForm::configure($schema);
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
            ->filters([
                SelectFilter::make('deal_status')
                    ->label('Deal status')
                    ->options(DealStatus::class),
            ])
            ->headerActions([
                CreateAction::make(),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make()
                    ->visible(fn (): bool => (bool) auth()->user()?->hasRole('super_admin')),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()
                        ->visible(fn (): bool => (bool) auth()->user()?->hasRole('super_admin')),
                ]),
            ]);
    }
}
