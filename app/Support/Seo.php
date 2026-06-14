<?php

namespace App\Support;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Support\Str;

/**
 * Fluent, server-rendered SEO payload for a single page.
 *
 * Controllers build one of these and pass `->toArray()` to Inertia as the
 * `seo` prop. `resources/views/partials/seo.blade.php` reads it from the
 * server-rendered page props and outputs every meta tag + JSON-LD block, so
 * crawlers and social bots get fully-formed markup without needing JavaScript.
 *
 * @implements Arrayable<string, mixed>
 */
class Seo implements Arrayable
{
    protected string $title;

    protected ?string $description = null;

    protected ?string $canonical = null;

    protected ?string $image = null;

    protected ?string $imageAlt = null;

    protected string $type = 'website';

    protected ?string $robots = null;

    /** @var array<int, string> */
    protected array $keywords = [];

    protected ?string $publishedTime = null;

    protected ?string $modifiedTime = null;

    protected ?string $author = null;

    /** @var array<int, array<string, mixed>> */
    protected array $schemas = [];

    public function __construct(?string $title = null)
    {
        $this->title = $title ?? (string) config('seo.name');
    }

    public static function make(?string $title = null): self
    {
        return new self($title);
    }

    public function title(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function description(?string $description): self
    {
        $this->description = $description ? Str::limit(trim(strip_tags($description)), 160, '') : null;

        return $this;
    }

    public function canonical(string $url): self
    {
        $this->canonical = $url;

        return $this;
    }

    public function image(?string $image, ?string $alt = null): self
    {
        $this->image = $image;
        $this->imageAlt = $alt;

        return $this;
    }

    public function type(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function robots(string $robots): self
    {
        $this->robots = $robots;

        return $this;
    }

    public function noindex(): self
    {
        $this->robots = 'noindex, nofollow';

        return $this;
    }

    /**
     * @param  array<int, string>|string  $keywords
     */
    public function keywords(array|string $keywords): self
    {
        $this->keywords = is_array($keywords) ? $keywords : array_map('trim', explode(',', $keywords));

        return $this;
    }

    public function article(?string $publishedTime, ?string $modifiedTime = null, ?string $author = null): self
    {
        $this->type = 'article';
        $this->publishedTime = $publishedTime;
        $this->modifiedTime = $modifiedTime ?? $publishedTime;
        $this->author = $author;

        return $this;
    }

    /**
     * Attach a JSON-LD structured-data graph node.
     *
     * @param  array<string, mixed>  $schema
     */
    public function schema(array $schema): self
    {
        $this->schemas[] = $schema;

        return $this;
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        $titleSuffix = config('seo.name');
        $fullTitle = Str::contains($this->title, (string) $titleSuffix)
            ? $this->title
            : "{$this->title} | {$titleSuffix}";

        $image = $this->image ?: config('seo.default_image');

        return [
            'title' => $fullTitle,
            'description' => $this->description ?? config('seo.description'),
            'canonical' => $this->canonical ?? url()->current(),
            'image' => $image ? (Str::startsWith($image, ['http://', 'https://']) ? $image : url($image)) : null,
            'imageAlt' => $this->imageAlt ?? $this->title,
            'type' => $this->type,
            'robots' => $this->robots ?? config('seo.robots'),
            'keywords' => $this->keywords !== [] ? implode(', ', $this->keywords) : null,
            'publishedTime' => $this->publishedTime,
            'modifiedTime' => $this->modifiedTime,
            'author' => $this->author,
            'schemas' => $this->schemas,
        ];
    }
}
