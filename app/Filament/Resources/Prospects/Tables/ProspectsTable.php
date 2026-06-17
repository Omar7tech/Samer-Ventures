<?php

namespace App\Filament\Resources\Prospects\Tables;

use App\Filament\Resources\Prospects\ProspectResource;
use App\Models\Prospect;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ProspectsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('code')
                    ->label('Code')
                    ->searchable(isIndividual: true)
                    ->sortable(),
                TextColumn::make('business_name')
                    ->label('Business')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('owner_name')
                    ->label('Owner')
                    ->searchable(),
                TextColumn::make('phone_number')
                    ->label('Phone')
                    ->searchable()
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
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->deferLoading()
            ->deferFilters()
            ->filters([
                ProspectResource::monthFilter(),
            ])
            ->recordActions([
                EditAction::make()
                    ->visible(fn (Prospect $record): bool => ProspectResource::canEdit($record)),
                DeleteAction::make()
                    ->visible(fn (Prospect $record): bool => ProspectResource::canDelete($record)),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()
                        ->visible(fn (): bool => ProspectResource::canDeleteAny()),
                ]),
            ]);
    }
}
