<?php

namespace App\Filament\Pages;

use App\Settings\GeneralSettings;
use BackedEnum;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Pages\SettingsPage;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use UnitEnum;

class ManageGeneral extends SettingsPage
{
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedCog6Tooth;

    protected static string $settings = GeneralSettings::class;

    protected static ?string $navigationLabel = 'General Settings';

    protected static ?string $title = 'General Settings';

    protected static UnitEnum|string|null $navigationGroup = 'Settings';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Settings')
                    ->tabs([
                        Tab::make('Social Media')
                            ->icon(Heroicon::OutlinedShare)
                            ->schema([
                                Repeater::make('social_media')
                                    ->schema([
                                        TextInput::make('name')
                                            ->required()
                                            ->placeholder('e.g., Instagram, LinkedIn, Twitter'),
                                        TextInput::make('link')
                                            ->required()
                                            ->url()
                                            ->placeholder('https://...'),
                                    ])
                                    ->addActionLabel('Add Social Media')
                                    ->reorderable(false)
                                    ->columnSpanFull(),
                            ]),
                        Tab::make('Emails')
                            ->icon(Heroicon::OutlinedEnvelope)
                            ->schema([
                                Repeater::make('emails')
                                    ->schema([
                                        TextInput::make('name')
                                            ->required()
                                            ->placeholder('e.g., General, Support, Sales'),
                                        TextInput::make('email')
                                            ->required()
                                            ->email()
                                            ->placeholder('info@example.com'),
                                    ])
                                    ->addActionLabel('Add Email')
                                    ->reorderable(false)
                                    ->columnSpanFull(),
                            ]),
                    ])
                    ->columnSpanFull()
                    ->persistTabInQueryString(),
            ]);
    }
}
