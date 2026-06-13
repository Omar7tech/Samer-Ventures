<?php

namespace App\Filament\Resources\Blogs\Schemas;

use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;

class BlogForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('📝 Post Details')
                    ->description('Set the post title and publishing status.')
                    ->components([
                        TextInput::make('title')
                            ->required(),

                        Toggle::make('active')
                            ->required()
                            ->label('Post is Active / Publish')
                            ->inline(false)
                            ->default(true),
                    ])->columnSpanFull(),

                Section::make('🖼️ Featured Image')
                    ->description('Upload the main image for the blog post.')
                    ->components([
                        SpatieMediaLibraryFileUpload::make('image')
                            ->label('Upload Images')
                            ->disk('public')
                            ->visibility('public')
                            ->directory('blogs')
                            ->image()
                            ->downloadable()
                            ->openable()
                            ->imageEditor()
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'])
                            ->conversion('webp')
                            ->collection('images')
                            ->imageEditorAspectRatios([
                                null,
                                '16:9',
                                '4:3',
                                '1:1',
                                '3:4',
                            ])
                            ->maxSize(2048)
                            ->helperText('📸 Upload image (max 2MB)')
                            ->columnSpanFull(),
                    ])->columnSpanFull(),

                Section::make('🎬 Video')
                    ->description('Optionally attach a YouTube video to this blog post.')
                    ->components([
                        Toggle::make('have_video')
                            ->label('Post Has a Video')
                            ->live()
                            ->inline(false)
                            ->default(false),

                        TextInput::make('video_url')
                            ->label('YouTube Video URL')
                            ->url()
                            ->visible(fn (Get $get): bool => (bool) $get('have_video'))
                            ->requiredIf('have_video', true)
                            ->placeholder('https://www.youtube.com/watch?v=...')
                            ->columnSpanFull(),
                    ])->columnSpanFull(),

                Section::make('✍️ Article Content')
                    ->description('Write the main article and provide an SEO summary.')
                    ->components([
                        RichEditor::make('content')
                            ->toolbarButtons([
                                ['bold', 'italic', 'underline', 'highlight', 'details', 'strike', 'subscript', 'superscript', 'link'],
                                ['clearFormatting'],
                                ['h1', 'h2', 'h3', 'alignStart', 'alignCenter', 'alignEnd', 'lead'],
                                ['blockquote', 'codeBlock', 'bulletList', 'orderedList'],
                                ['table'],
                                ['undo', 'redo'],
                            ])
                            ->columnSpanFull(),

                        Textarea::make('description')
                            ->label('Summary Description')
                            ->helperText('A brief summary of the post (ideal for SEO and excerpts).')
                            ->columnSpanFull(),
                    ])->columnSpanFull(),
            ]);
    }
}
