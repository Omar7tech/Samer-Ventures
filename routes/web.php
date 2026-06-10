<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::inertia('/services', 'services')->name('services');
Route::get('/blogs', [BlogController::class, 'index'])->name('blogs');
Route::get('/blog/{blog}', [BlogController::class, 'show'])->name('blogs.show');
Route::inertia('/contact', 'contact')->name('contact');
