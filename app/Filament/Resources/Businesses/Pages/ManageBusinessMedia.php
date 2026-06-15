<?php

namespace App\Filament\Resources\Businesses\Pages;

use App\Filament\Resources\Businesses\BusinessResource;
use App\Models\Business;
use BackedEnum;
use Filament\Resources\Pages\EditRecord;
use Filament\Schemas\Components\Actions;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Text;
use Filament\Schemas\Schema;
use Hugomyb\FilamentMediaAction\Actions\MediaAction;

class ManageBusinessMedia extends EditRecord
{
    protected static string $resource = BusinessResource::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-photo';

    protected static ?string $title = 'Media';

    public static function getNavigationLabel(): string
    {
        return 'Media';
    }

    /**
     * Media is viewable by admins and by the sales agents assigned to the business.
     * Record scoping in the resource already blocks unassigned businesses, so we
     * simply bypass the resource's admin-only canEdit() gate here.
     */
    protected function authorizeAccess(): void
    {
        //
    }

    /**
     * This page only previews media (files are uploaded from the main form),
     * so there is nothing to save.
     */
    protected function getFormActions(): array
    {
        return [];
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Attached Files')
                    ->description('Files are uploaded when creating or editing the business. Click a file to preview it.')
                    ->schema(fn (?Business $record): array => $record && $record->getMedia('files')->isNotEmpty()
                        ? [
                            Actions::make(
                                $record->getMedia('files')->map(fn ($media) => MediaAction::make('preview-'.$media->getKey())
                                    ->label($media->name)
                                    ->icon('heroicon-o-eye')
                                    ->color('gray')
                                    ->media($media->getUrl())
                                    ->modalHeading($media->name)
                                )->all()
                            )->columnSpanFull(),
                        ]
                        : [
                            Text::make('No files attached to this business yet.')
                                ->color('gray'),
                        ]
                    )
                    ->columnSpanFull(),
            ]);
    }
}
