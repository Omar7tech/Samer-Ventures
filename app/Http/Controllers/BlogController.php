<?php

namespace App\Http\Controllers;

use App\Http\Resources\BlogListResource;
use App\Http\Resources\BlogResource;
use App\Models\Blog;
use App\Support\Seo;
use App\Support\SiteSchema;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(): Response
    {
        $blogs = Blog::with('media')->paginate(8);

        $seo = Seo::make('Insights & Blog')
            ->description('Ideas, perspectives, and lessons on venture building, strategy, and growth from the Samer Ventures team.')
            ->image(config('seo.images.blogs'))
            ->keywords(['business insights', 'venture building blog', 'strategy', 'growth', 'Samer Ventures'])
            ->canonical(route('blogs'))
            ->schema(SiteSchema::breadcrumb([
                ['name' => 'Home', 'url' => route('home')],
                ['name' => 'Blog', 'url' => route('blogs')],
            ]))
            ->schema([
                '@context' => 'https://schema.org',
                '@type' => 'CollectionPage',
                '@id' => route('blogs').'#webpage',
                'url' => route('blogs'),
                'name' => 'Insights & Blog — Samer Ventures',
                'isPartOf' => ['@id' => url('/#website')],
                'about' => ['@id' => url('/#organization')],
                'mainEntity' => [
                    '@type' => 'ItemList',
                    'itemListElement' => $blogs->getCollection()->values()->map(fn (Blog $blog, int $i): array => [
                        '@type' => 'ListItem',
                        'position' => $i + 1,
                        'url' => route('blogs.show', $blog->slug),
                        'name' => $blog->title,
                    ])->all(),
                ],
            ]);

        return Inertia::render('blogs/index', [
            'seo' => $seo->toArray(),
            'blogs' => fn () => BlogListResource::collection($blogs),
        ]);
    }

    public function show(Blog $blog): Response
    {
        $image = $blog->getFirstMediaUrl('images', 'webp')
            ?: $blog->getFirstMediaUrl('images')
            ?: url((string) config('seo.images.blogs'));

        $description = $blog->meta_description ?: $blog->description;

        $seo = Seo::make($blog->meta_title ?: $blog->title)
            ->description($description)
            ->image($image, $blog->title)
            ->canonical(route('blogs.show', $blog->slug))
            ->article(
                $blog->created_at?->toIso8601String(),
                $blog->updated_at?->toIso8601String(),
                config('seo.name'),
            )
            ->schema(SiteSchema::breadcrumb([
                ['name' => 'Home', 'url' => route('home')],
                ['name' => 'Blog', 'url' => route('blogs')],
                ['name' => $blog->title, 'url' => route('blogs.show', $blog->slug)],
            ]))
            ->schema([
                '@context' => 'https://schema.org',
                '@type' => 'BlogPosting',
                '@id' => route('blogs.show', $blog->slug).'#article',
                'headline' => Str::limit($blog->title, 110, ''),
                'description' => Str::limit(strip_tags((string) $description), 160, ''),
                'image' => $image,
                'datePublished' => $blog->created_at?->toIso8601String(),
                'dateModified' => $blog->updated_at?->toIso8601String(),
                'url' => route('blogs.show', $blog->slug),
                'mainEntityOfPage' => ['@type' => 'WebPage', '@id' => route('blogs.show', $blog->slug)],
                'author' => ['@id' => url('/#organization')],
                'publisher' => ['@id' => url('/#organization')],
                'isPartOf' => ['@id' => url('/#website')],
            ]);

        return Inertia::render('blogs/show', [
            'seo' => $seo->toArray(),
            'blog' => new BlogResource($blog),
        ]);
    }
}
