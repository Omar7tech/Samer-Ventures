<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\SitemapController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::get('/services', ServiceController::class)->name('services');
Route::get('/blogs', [BlogController::class, 'index'])->name('blogs');
Route::get('/blog/{blog}', [BlogController::class, 'show'])->name('blogs.show');
Route::get('/contact', ContactController::class)->name('contact');

Route::get('/sitemap.xml', SitemapController::class)->name('sitemap');

Route::get('/robots.txt', function () {
    $lines = [
        'User-agent: *',
        'Allow: /',
        'Disallow: /admin',
        'Disallow: /admin/',
        '',
        'Sitemap: '.route('sitemap'),
        '',
    ];

    return response(implode("\n", $lines), 200, ['Content-Type' => 'text/plain']);
})->name('robots');
