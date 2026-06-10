<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(): Response
    {
        return Inertia::render('services', [
            'services' => Service::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->get()
                ->map(fn (Service $service): array => [
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
