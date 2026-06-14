<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Support\Seo;
use App\Support\SiteSchema;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(): Response
    {
        $services = Service::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        $seo = Seo::make('Our Services')
            ->description('Explore the venture-building, strategic advisory, and growth services Samer Ventures offers to help businesses launch, scale, and transform.')
            ->image(config('seo.images.services'))
            ->keywords(['business services', 'strategic advisory', 'venture building', 'growth strategy', 'consulting'])
            ->canonical(route('services'))
            ->schema(SiteSchema::breadcrumb([
                ['name' => 'Home', 'url' => route('home')],
                ['name' => 'Services', 'url' => route('services')],
            ]))
            ->schema([
                '@context' => 'https://schema.org',
                '@type' => 'ItemList',
                'name' => 'Samer Ventures Services',
                'itemListElement' => $services->values()->map(fn (Service $service, int $i): array => [
                    '@type' => 'ListItem',
                    'position' => $i + 1,
                    'item' => [
                        '@type' => 'Service',
                        'name' => $service->title,
                        'description' => $service->subtitle
                            ? Str::limit(strip_tags((string) $service->subtitle), 160, '')
                            : Str::limit(strip_tags((string) $service->description), 160, ''),
                        'provider' => ['@id' => url('/#organization')],
                    ],
                ])->all(),
            ]);

        return Inertia::render('services', [
            'seo' => $seo->toArray(),
            'services' => $services->map(fn (Service $service): array => [
                'id' => $service->id,
                'title' => $service->title,
                'subtitle' => $service->subtitle,
                'description' => $service->description,
                'bulletPoints' => $service->bullet_points ?? [],
                'processSteps' => $service->process_steps ?? [],
                'tags' => $service->tags ?? [],
                'buttonText' => $service->button_text,
                'buttonUrl' => $service->button_url,
            ]),
        ]);
    }
}
