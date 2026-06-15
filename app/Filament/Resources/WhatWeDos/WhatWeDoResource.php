<?php

namespace App\Filament\Resources\WhatWeDos;

use App\Filament\Resources\WhatWeDos\Pages\CreateWhatWeDo;
use App\Filament\Resources\WhatWeDos\Pages\EditWhatWeDo;
use App\Filament\Resources\WhatWeDos\Pages\ListWhatWeDos;
use App\Filament\Resources\WhatWeDos\Schemas\WhatWeDoForm;
use App\Filament\Resources\WhatWeDos\Tables\WhatWeDosTable;
use App\Models\WhatWeDo;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class WhatWeDoResource extends Resource
{
    protected static ?string $model = WhatWeDo::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedLightBulb;

    protected static ?string $modelLabel = 'What We Do Item';

    protected static ?string $pluralModelLabel = 'What We Do Items';

    protected static ?string $navigationLabel = 'What We Do';

    public static function form(Schema $schema): Schema
    {
        return WhatWeDoForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return WhatWeDosTable::configure($table);
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
            'index' => ListWhatWeDos::route('/'),
            'create' => CreateWhatWeDo::route('/create'),
            'edit' => EditWhatWeDo::route('/{record}/edit'),
        ];
    }
}
