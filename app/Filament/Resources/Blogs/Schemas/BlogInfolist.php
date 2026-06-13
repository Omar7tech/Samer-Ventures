<?php

namespace App\Filament\Resources\Blogs\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\SpatieMediaLibraryImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class BlogInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('title'),

                SpatieMediaLibraryImageEntry::make('image')
                    ->placeholder('No Image')
                    ->conversion('webp')
                    ->collection('images'),

                TextEntry::make('description')
                    ->placeholder('-')
                    ->columnSpanFull(),

                IconEntry::make('active')
                    ->boolean(),

                IconEntry::make('have_video')
                    ->label('Has Video')
                    ->boolean(),

                TextEntry::make('video_url')
                    ->label('Video URL')
                    ->placeholder('-')
                    ->url(fn ($record) => $record->video_url)
                    ->openUrlInNewTab(),

                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),

                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
