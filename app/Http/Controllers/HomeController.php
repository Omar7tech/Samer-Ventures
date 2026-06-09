<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use App\Models\ValueItem;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('welcome', [
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
        ]);
    }
}
