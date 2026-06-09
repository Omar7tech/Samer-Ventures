<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration {
    public function up(): void
    {
        $this->migrator->add('general.emails', [
            ['name' => 'General', 'email' => 'info@samerventures.com'],
        ]);
    }
};
