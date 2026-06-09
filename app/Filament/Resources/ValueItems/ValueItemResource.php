<?php

namespace App\Filament\Resources\ValueItems;

use App\Filament\Resources\ValueItems\Pages\CreateValueItem;
use App\Filament\Resources\ValueItems\Pages\EditValueItem;
use App\Filament\Resources\ValueItems\Pages\ListValueItems;
use App\Filament\Resources\ValueItems\Schemas\ValueItemForm;
use App\Filament\Resources\ValueItems\Tables\ValueItemsTable;
use App\Models\ValueItem;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ValueItemResource extends Resource
{
    protected static ?string $model = ValueItem::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return ValueItemForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ValueItemsTable::configure($table);
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
            'index' => ListValueItems::route('/'),
            'create' => CreateValueItem::route('/create'),
            'edit' => EditValueItem::route('/{record}/edit'),
        ];
    }
}
