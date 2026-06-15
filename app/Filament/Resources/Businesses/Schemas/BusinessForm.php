<?php

namespace App\Filament\Resources\Businesses\Schemas;

use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class BusinessForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Business Details')
                    ->schema([
                        TextInput::make('name')
                            ->label('Business name')
                            ->required()
                            ->maxLength(255),
                        Select::make('service_id')
                            ->label('Selected service')
                            ->relationship('service', 'title')
                            ->searchable()
                            ->preload(),
                        Textarea::make('description')
                            ->rows(4)
                            ->columnSpanFull(),
                    ])->columns(2)->columnSpanFull(),

                Section::make('Representative')
                    ->schema([
                        TextInput::make('representative_name')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('representative_phone')
                            ->label('Representative phone')
                            ->tel()
                            ->required()
                            ->maxLength(255),
                        TextInput::make('representative_email')
                            ->label('Representative email')
                            ->email()
                            ->required()
                            ->maxLength(255),
                    ])->columns(2)->columnSpanFull(),

                Section::make('Assigned Sales Agents')
                    ->description('Assign zero, one, or many sales agents. Each assignment has its own commission percentage.')
                    ->schema([
                        Repeater::make('businessSalesAgents')
                            ->relationship()
                            ->hiddenLabel()
                            ->schema([
                                Select::make('user_id')
                                    ->label('Sales agent')
                                    ->relationship('salesAgent', 'name', fn ($query) => $query->whereHas('roles', fn ($q) => $q->where('name', 'sales_agent')))
                                    ->searchable()
                                    ->preload()
                                    ->required()
                                    ->distinct()
                                    ->disableOptionsWhenSelectedInSiblingRepeaterItems(),
                                TextInput::make('commission_percentage')
                                    ->label('Commission %')
                                    ->numeric()
                                    ->minValue(0)
                                    ->maxValue(100)
                                    ->suffix('%')
                                    ->required()
                                    ->default(0),
                            ])
                            ->columns(2)
                            ->addActionLabel('Assign sales agent')
                            ->defaultItems(0)
                            ->columnSpanFull(),
                    ])->columnSpanFull(),

                Section::make('Attached Files')
                    ->schema([
                        SpatieMediaLibraryFileUpload::make('files')
                            ->hiddenLabel()
                            ->collection('files')
                            ->disk('public')
                            ->visibility('public')
                            ->directory('businesses')
                            ->multiple()
                            ->reorderable()
                            ->appendFiles()
                            ->panelLayout('grid')
                            ->maxSize(10240)
                            ->helperText('Images, PDFs, video, audio and documents. Max 10MB per file.')
                            ->columnSpanFull(),
                    ])->columnSpanFull(),
            ]);
    }
}
