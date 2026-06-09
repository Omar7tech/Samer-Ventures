<?php

namespace App\Filament\Resources\ValueItems\Pages;

use App\Filament\Resources\ValueItems\ValueItemResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditValueItem extends EditRecord
{
    protected static string $resource = ValueItemResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
