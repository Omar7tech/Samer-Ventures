<?php

namespace App\Filament\Resources\Businesses\Schemas;

use App\Filament\Resources\Businesses\BusinessResource;
use App\Models\Business;
use Filament\Infolists\Components\RepeatableEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class BusinessInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Business Details')
                    ->schema([
                        TextEntry::make('name')
                            ->label('Business name'),
                        TextEntry::make('service.title')
                            ->label('Service')
                            ->badge()
                            ->placeholder('—'),
                        TextEntry::make('description')
                            ->placeholder('—')
                            ->columnSpanFull(),
                    ])->columns(2),

                Section::make('Representative')
                    ->schema([
                        TextEntry::make('representative_name'),
                        TextEntry::make('representative_phone')
                            ->label('Phone'),
                        TextEntry::make('representative_email')
                            ->label('Email')
                            ->copyable(),
                    ])->columns(3),

                // Sales agents only ever see their own commission, never the full split.
                Section::make('Your Commission')
                    ->visible(fn (): bool => BusinessResource::isSalesAgent())
                    ->schema([
                        TextEntry::make('your_commission')
                            ->label('Commission')
                            ->state(function (Business $record): string {
                                $agent = $record->salesAgents()->whereKey(auth()->id())->first();

                                return $agent ? $agent->pivot->commission_percentage.'%' : '—';
                            }),
                    ]),

                // Admin-only: full assignment split and attached files are sensitive.
                Section::make('Assigned Sales Agents')
                    ->visible(fn (): bool => ! BusinessResource::isSalesAgent())
                    ->schema([
                        RepeatableEntry::make('businessSalesAgents')
                            ->hiddenLabel()
                            ->schema([
                                TextEntry::make('salesAgent.name')
                                    ->label('Sales agent'),
                                TextEntry::make('commission_percentage')
                                    ->label('Commission')
                                    ->suffix('%'),
                            ])
                            ->columns(2)
                            ->placeholder('No sales agents assigned.'),
                    ]),

                Section::make('Attached Files')
                    ->visible(fn (): bool => ! BusinessResource::isSalesAgent())
                    ->schema([
                        TextEntry::make('files')
                            ->hiddenLabel()
                            ->state(fn (Business $record): array => $record->getMedia('files')->map->file_name->all())
                            ->badge()
                            ->placeholder('No files attached.'),
                    ]),
            ]);
    }
}
