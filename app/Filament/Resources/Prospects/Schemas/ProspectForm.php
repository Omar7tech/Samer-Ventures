<?php

namespace App\Filament\Resources\Prospects\Schemas;

use App\Enums\DealStatus;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ProspectForm
{
    public static function configure(Schema $schema, bool $withBusiness = true): Schema
    {
        return $schema
            ->components([
                Section::make('Deal Details')
                    ->schema([
                        Select::make('business_id')
                            ->label('Business')
                            ->relationship('business', 'name')
                            ->searchable()
                            ->preload()
                            ->required()
                            ->visible($withBusiness),
                        TextInput::make('business_name')
                            ->label('Business name')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('quote')
                            ->label('Quote')
                            ->placeholder('SV-001')
                            ->required()
                            ->maxLength(255),
                        Select::make('deal_status')
                            ->label('Deal status')
                            ->options(DealStatus::class)
                            ->default(DealStatus::ColdDeal)
                            ->required(),
                        Textarea::make('deal_description')
                            ->label('Deal description')
                            ->rows(4)
                            ->columnSpanFull(),
                    ])->columns(2)->columnSpanFull(),

                Section::make('Contact')
                    ->schema([
                        TextInput::make('owner_name')
                            ->label('Owner name')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('phone_number')
                            ->label('Phone number')
                            ->tel()
                            ->required()
                            ->maxLength(255),
                    ])->columns(2)->columnSpanFull(),
            ]);
    }
}
