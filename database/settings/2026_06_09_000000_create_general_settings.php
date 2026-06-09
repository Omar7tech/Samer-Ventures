<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration {
    public function up(): void
    {
        $this->migrator->add('general.social_media', [
            ['name' => 'Instagram', 'link' => 'https://www.instagram.com/'],
            ['name' => 'LinkedIn', 'link' => 'https://www.linkedin.com/'],
        ]);
    }
};
