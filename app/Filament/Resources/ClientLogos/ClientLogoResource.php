<?php

namespace App\Filament\Resources\ClientLogos;

use App\Filament\Resources\ClientLogos\Pages\CreateClientLogo;
use App\Filament\Resources\ClientLogos\Pages\EditClientLogo;
use App\Filament\Resources\ClientLogos\Pages\ListClientLogos;
use App\Filament\Resources\ClientLogos\Schemas\ClientLogoForm;
use App\Filament\Resources\ClientLogos\Tables\ClientLogosTable;
use App\Models\ClientLogo;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ClientLogoResource extends Resource
{
    protected static ?string $model = ClientLogo::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedPhoto;

    protected static ?string $navigationLabel = 'Client Logos';

    public static function form(Schema $schema): Schema
    {
        return ClientLogoForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ClientLogosTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListClientLogos::route('/'),
            'create' => CreateClientLogo::route('/create'),
            'edit' => EditClientLogo::route('/{record}/edit'),
        ];
    }
}
