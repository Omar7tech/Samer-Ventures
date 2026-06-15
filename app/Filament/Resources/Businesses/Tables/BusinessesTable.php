<?php

namespace App\Filament\Resources\Businesses\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class BusinessesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Business')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('representative_name')
                    ->label('Representative')
                    ->searchable(),
                TextColumn::make('representative_phone')
                    ->label('Phone')
                    ->searchable()
                    ->toggleable(),
                TextColumn::make('representative_email')
                    ->label('Email')
                    ->searchable()
                    ->toggleable(),
                TextColumn::make('service.title')
                    ->label('Service')
                    ->badge()
                    ->placeholder('—')
                    ->sortable(),
                TextColumn::make('salesAgents.name')
                    ->label('Sales agents')
                    ->badge()
                    ->placeholder('Unassigned'),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
