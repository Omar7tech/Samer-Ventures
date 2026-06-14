<?php

namespace App\Http\Controllers;

use App\Models\ClientLogo;
use App\Models\Testimonial;
use App\Models\ValueItem;
use App\Models\WhatWeDo;
use App\Support\Seo;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $seo = Seo::make('Venture Building & Strategic Advisory')
            ->description('Samer Ventures partners with founders and ambitious businesses to launch, scale, and transform — combining capital, operating expertise, and hands-on execution.')
            ->image(config('seo.images.home'))
            ->keywords(['venture building', 'strategic advisory', 'business growth', 'startup partner', 'Samer Ventures'])
            ->canonical(route('home'))
            ->schema([
                '@context' => 'https://schema.org',
                '@type' => 'WebPage',
                '@id' => route('home').'#webpage',
                'url' => route('home'),
                'name' => 'Samer Ventures — Venture Building & Strategic Advisory',
                'isPartOf' => ['@id' => url('/#website')],
                'about' => ['@id' => url('/#organization')],
            ]);

        return Inertia::render('welcome', [
            'seo' => $seo->toArray(),
            'whatWeDo' => WhatWeDo::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->get(['title']),
            'values' => ValueItem::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->get(['title', 'description']),
            'testimonials' => Testimonial::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->with('media')
                ->get()
                ->map(fn (Testimonial $testimonial): array => [
                    'id' => $testimonial->id,
                    'rating' => $testimonial->rating,
                    'quote' => $testimonial->quote,
                    'name' => $testimonial->name,
                    'organization' => $testimonial->organization,
                    'avatar' => $testimonial->getFirstMediaUrl('avatar', 'thumb') ?: null,
                ]),
            'clientLogos' => ClientLogo::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->with('media')
                ->get()
                ->map(fn (ClientLogo $clientLogo): ?array => $clientLogo->getFirstMediaUrl('logo')
                    ? [
                        'id' => $clientLogo->id,
                        'src' => $clientLogo->getFirstMediaUrl('logo'),
                    ]
                    : null)
                ->filter()
                ->values(),
        ]);
    }
}
