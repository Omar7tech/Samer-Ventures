<?php

namespace App\Filament\Resources\ValueItems\Pages;

use App\Filament\Resources\ValueItems\ValueItemResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListValueItems extends ListRecords
{
    protected static string $resource = ValueItemResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
