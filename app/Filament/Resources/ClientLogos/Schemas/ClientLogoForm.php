<?php

namespace App\Filament\Resources\ClientLogos\Schemas;

use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ClientLogoForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                SpatieMediaLibraryFileUpload::make('logo')
                    ->label('Logo')
                    ->collection('logo')
                    ->disk('public')
                    ->visibility('public')
                    ->image()
                    ->conversion('webp')
                    ->imageEditor()
                    ->required()
                    ->columnSpanFull(),

                Toggle::make('is_active')
                    ->label('Active')
                    ->default(true),
            ]);
    }
}
