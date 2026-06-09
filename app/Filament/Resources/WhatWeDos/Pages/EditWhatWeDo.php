<?php

namespace App\Filament\Resources\WhatWeDos\Pages;

use App\Filament\Resources\WhatWeDos\WhatWeDoResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditWhatWeDo extends EditRecord
{
    protected static string $resource = WhatWeDoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
