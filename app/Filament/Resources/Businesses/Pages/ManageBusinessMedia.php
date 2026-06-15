<?php

namespace App\Filament\Resources\Businesses\Pages;

use App\Filament\Resources\Businesses\BusinessResource;
use App\Models\Business;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Actions\ActionGroup;
use Filament\Resources\Pages\EditRecord;
use Filament\Schemas\Components\Actions;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Text;
use Filament\Schemas\Schema;

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
                    ->description('Files are uploaded when creating or editing the business. Open a file to preview it in a new tab, or download it.')
                    ->schema(fn (?Business $record): array => $record && $record->getMedia('files')->isNotEmpty()
                        ? [
                            Actions::make(
                                $record->getMedia('files')->map(function ($media) {
                                    [$icon, $color] = static::mediaIconAndColor($media->mime_type, pathinfo($media->file_name, PATHINFO_EXTENSION));

                                    return ActionGroup::make([
                                        Action::make('open-'.$media->getKey())
                                            ->label('Open in new tab')
                                            ->icon('heroicon-o-arrow-top-right-on-square')
                                            ->url($media->getUrl())
                                            ->openUrlInNewTab(),
                                        Action::make('download-'.$media->getKey())
                                            ->label('Download')
                                            ->icon('heroicon-o-arrow-down-tray')
                                            ->action(fn () => response()->download($media->getPath(), $media->file_name)),
                                    ])
                                        ->label($media->name)
                                        ->icon($icon)
                                        ->color($color)
                                        ->button()
                                        ->outlined();
                                })->all()
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

    /**
     * Map a file's type to a color-coded icon for nicer previews.
     *
     * @return array{0: string, 1: string}
     */
    protected static function mediaIconAndColor(string $mime, string $extension): array
    {
        $extension = strtolower($extension);

        return match (true) {
            str_starts_with($mime, 'image/') => ['heroicon-o-photo', 'info'],
            str_starts_with($mime, 'video/') => ['heroicon-o-video-camera', 'warning'],
            str_starts_with($mime, 'audio/') => ['heroicon-o-musical-note', 'gray'],
            str_contains($mime, 'pdf') => ['heroicon-o-document-text', 'danger'],
            str_contains($mime, 'sheet') || str_contains($mime, 'excel') || in_array($extension, ['xls', 'xlsx', 'csv']) => ['heroicon-o-table-cells', 'success'],
            str_contains($mime, 'word') || in_array($extension, ['doc', 'docx']) => ['heroicon-o-document', 'primary'],
            str_contains($mime, 'zip') || in_array($extension, ['zip', 'rar', '7z']) => ['heroicon-o-archive-box', 'warning'],
            default => ['heroicon-o-document', 'gray'],
        };
    }
}
