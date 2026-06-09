<?php

namespace App\Filament\Resources\Testimonials\Schemas;

use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use l3aro\FilamentRatingStar\Components\StarInput;

class TestimonialForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                TextInput::make('organization')
                    ->maxLength(255),
                StarInput::make('rating')
                    ->stars(5)
                    ->default(5)
                    ->required(),
                Textarea::make('quote')
                    ->required()
                    ->rows(5)
                    ->columnSpanFull(),
                SpatieMediaLibraryFileUpload::make('avatar')
                    ->collection('avatar')
                    ->image()
                    ->disk('public')
                    ->visibility('public')
                    ->avatar()
                    ->imageEditor()
                    ->columnSpanFull(),
                Toggle::make('is_active')
                    ->label('Active')
                    ->default(true),
            ]);
    }
}
