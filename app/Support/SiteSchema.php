<?php

namespace App\Support;

use App\Settings\GeneralSettings;
use Illuminate\Support\Arr;
use Throwable;

/**
 * Builds the site-wide JSON-LD structured data (Organization + WebSite) that
 * is injected on every facing page. Social profiles and contact emails are
 * sourced live from the CMS (GeneralSettings) so the markup stays in sync with
 * what the admin manages.
 */
class SiteSchema
{
    /**
     * @return array<string, mixed>
     */
    public static function organization(): array
    {
        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'Organization',
            '@id' => url('/#organization'),
            'name' => config('seo.name'),
            'legalName' => config('seo.legal_name', config('seo.name')),
            'url' => url('/'),
            'logo' => [
                '@type' => 'ImageObject',
                'url' => url(config('seo.logo')),
            ],
            'description' => config('seo.description'),
        ];

        $sameAs = self::socialLinks();
        if ($sameAs !== []) {
            $schema['sameAs'] = $sameAs;
        }

        $email = self::primaryEmail();
        if ($email !== null) {
            $schema['contactPoint'] = [
                '@type' => 'ContactPoint',
                'contactType' => 'customer service',
                'email' => $email,
            ];
        }

        return $schema;
    }

    /**
     * @return array<string, mixed>
     */
    public static function website(): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'WebSite',
            '@id' => url('/#website'),
            'name' => config('seo.name'),
            'url' => url('/'),
            'publisher' => ['@id' => url('/#organization')],
            'inLanguage' => str_replace('_', '-', (string) config('seo.locale')),
        ];
    }

    /**
     * Build a BreadcrumbList JSON-LD node.
     *
     * @param  array<int, array{name: string, url: string}>  $items
     * @return array<string, mixed>
     */
    public static function breadcrumb(array $items): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'BreadcrumbList',
            'itemListElement' => collect($items)->map(fn (array $item, int $i): array => [
                '@type' => 'ListItem',
                'position' => $i + 1,
                'name' => $item['name'],
                'item' => $item['url'],
            ])->all(),
        ];
    }

    /**
     * @return array<int, string>
     */
    protected static function socialLinks(): array
    {
        try {
            $settings = app(GeneralSettings::class);
        } catch (Throwable) {
            return [];
        }

        return collect($settings->social_media ?? [])
            ->pluck('link')
            ->filter(fn ($link): bool => is_string($link) && $link !== '')
            ->values()
            ->all();
    }

    protected static function primaryEmail(): ?string
    {
        try {
            $settings = app(GeneralSettings::class);
        } catch (Throwable) {
            return null;
        }

        $emails = collect($settings->emails ?? [])
            ->pluck('email')
            ->filter(fn ($email): bool => is_string($email) && $email !== '')
            ->values();

        return Arr::first($emails->all());
    }
}
