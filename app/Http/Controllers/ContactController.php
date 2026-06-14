<?php

namespace App\Http\Controllers;

use App\Settings\GeneralSettings;
use App\Support\Seo;
use App\Support\SiteSchema;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function __invoke(GeneralSettings $settings): Response
    {
        $email = Arr::first(collect($settings->emails ?? [])->pluck('email')->filter()->all());

        $contactPoint = ['@type' => 'ContactPoint', 'contactType' => 'customer service'];
        if ($email) {
            $contactPoint['email'] = $email;
        }

        $seo = Seo::make('Contact Us')
            ->description('Get in touch with Samer Ventures. Let’s talk about how we can help you launch, scale, or transform your business.')
            ->image(config('seo.images.contact'))
            ->keywords(['contact Samer Ventures', 'get in touch', 'business inquiry', 'partnership'])
            ->canonical(route('contact'))
            ->schema(SiteSchema::breadcrumb([
                ['name' => 'Home', 'url' => route('home')],
                ['name' => 'Contact', 'url' => route('contact')],
            ]))
            ->schema([
                '@context' => 'https://schema.org',
                '@type' => 'ContactPage',
                '@id' => route('contact').'#webpage',
                'url' => route('contact'),
                'name' => 'Contact — Samer Ventures',
                'isPartOf' => ['@id' => url('/#website')],
                'about' => ['@id' => url('/#organization')],
                'mainEntity' => array_merge(['@id' => url('/#organization')], ['contactPoint' => $contactPoint]),
            ]);

        return Inertia::render('contact', [
            'seo' => $seo->toArray(),
        ]);
    }
}
