<?php

namespace App\Filament\Resources\WhatWeDos\Pages;

use App\Filament\Resources\WhatWeDos\WhatWeDoResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListWhatWeDos extends ListRecords
{
    protected static string $resource = WhatWeDoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
