<?php

namespace App\Http\Controllers;

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
        ]);
    }
}
