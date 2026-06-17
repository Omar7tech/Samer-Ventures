<?php

namespace App\Filament\Resources\Users\Schemas;

use App\Enums\ProspectPermission;
use Filament\Forms\Components\CheckboxList;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('User Information')
                    ->schema([
                        TextInput::make('name')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('email')
                            ->label('Email address')
                            ->email()
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255),
                        TextInput::make('phone_number')
                            ->label('Phone Number')
                            ->tel()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255),
                    ])->columns(2),

                Section::make('Security')
                    ->schema([
                        TextInput::make('password')
                            ->password()
                            ->live()
                            ->dehydrateStateUsing(fn ($state) => filled($state) ? Hash::make($state) : null)
                            ->dehydrated(fn ($state) => filled($state))
                            ->required(fn (string $context): bool => $context === 'create')
                            ->maxLength(255)
                            ->revealable(),
                    ]),

                Section::make('Roles')
                    ->schema([
                        Select::make('roles')
                            ->relationship('roles', 'name', fn ($query) => $query->where('name', '!=', 'super_admin'))
                            ->multiple()
                            ->preload()
                            ->searchable()
                            ->live()
                            ->required(),
                    ]),

                Section::make('Sales Agent Permissions')
                    ->description('These permissions apply to the prospects table for this sales agent.')
                    ->schema([
                        CheckboxList::make('prospect_permissions')
                            ->hiddenLabel()
                            ->options(ProspectPermission::class)
                            ->columns(1)
                            ->columnSpanFull(),
                    ])
                    ->visible(fn (Get $get): bool => static::hasSalesAgentRole($get('roles'))),
            ]);
    }

    /**
     * Whether the sales_agent role is among the currently selected role IDs.
     *
     * @param  array<int, int|string>|null  $selectedRoleIds
     */
    protected static function hasSalesAgentRole(?array $selectedRoleIds): bool
    {
        if (blank($selectedRoleIds)) {
            return false;
        }

        $salesAgentRoleId = Role::where('name', 'sales_agent')->value('id');

        return $salesAgentRoleId !== null
            && in_array((string) $salesAgentRoleId, array_map('strval', $selectedRoleIds), true);
    }
}
