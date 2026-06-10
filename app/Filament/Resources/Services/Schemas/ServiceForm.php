<?php

namespace App\Filament\Resources\Services\Schemas;

use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ServiceForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required()
                    ->maxLength(255),
                TextInput::make('subtitle')
                    ->required()
                    ->maxLength(255)
                    ->helperText('Category shown in the pill, e.g. Sales, Technology.'),
                Textarea::make('description')
                    ->required()
                    ->rows(5)
                    ->columnSpanFull(),
                Repeater::make('bullet_points')
                    ->label('Bullet points')
                    ->simple(
                        TextInput::make('point')
                            ->required()
                            ->maxLength(255),
                    )
                    ->reorderable()
                    ->columnSpanFull(),
                TagsInput::make('process_steps')
                    ->label('Process steps')
                    ->placeholder('Add a step and press Enter')
                    ->helperText('Shown as a timeline, e.g. Discovery, Planning, Activation, Optimization.')
                    ->reorderable()
                    ->trim(),
                TagsInput::make('tags')
                    ->placeholder('Add a tag and press Enter')
                    ->reorderable()
                    ->trim(),
                TextInput::make('button_text')
                    ->required()
                    ->maxLength(255),
                TextInput::make('button_url')
                    ->required()
                    ->maxLength(255)
                    ->default('/contact'),
                Toggle::make('is_active')
                    ->label('Active')
                    ->default(true),
            ]);
    }
}
