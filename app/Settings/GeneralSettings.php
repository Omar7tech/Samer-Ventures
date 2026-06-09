<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class GeneralSettings extends Settings
{
    public ?array $social_media;
    public ?array $emails;

    public static function group(): string
    {
        return 'general';
    }
}
