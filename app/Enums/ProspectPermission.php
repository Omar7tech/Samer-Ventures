<?php

namespace App\Enums;

use Filament\Support\Contracts\HasDescription;
use Filament\Support\Contracts\HasLabel;
use Illuminate\Contracts\Support\Htmlable;

enum ProspectPermission: string implements HasDescription, HasLabel
{
    case ViewAll = 'view_all';
    case Create = 'create';
    case EditAll = 'edit_all';
    case EditOwn = 'edit_own';
    case DeleteAll = 'delete_all';
    case DeleteOwn = 'delete_own';
    case CreateBusiness = 'create_business';

    public function getLabel(): string|Htmlable|null
    {
        return match ($this) {
            self::ViewAll => 'View all prospects',
            self::Create => 'Create prospects',
            self::EditAll => 'Edit all prospects',
            self::EditOwn => 'Edit own prospects',
            self::DeleteAll => 'Delete all prospects',
            self::DeleteOwn => 'Delete own prospects',
            self::CreateBusiness => 'Create new businesses',
        };
    }

    public function getDescription(): string|Htmlable|null
    {
        return match ($this) {
            self::ViewAll => 'Otherwise the agent only sees prospects they created.',
            self::Create => 'Allow adding new prospects.',
            self::EditAll => 'Edit any prospect, regardless of who created it.',
            self::EditOwn => 'Edit only prospects the agent created.',
            self::DeleteAll => 'Delete any prospect, regardless of who created it.',
            self::DeleteOwn => 'Delete only prospects the agent created.',
            self::CreateBusiness => 'Allow adding new businesses.',
        };
    }
}
