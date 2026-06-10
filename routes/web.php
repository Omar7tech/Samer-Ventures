<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::inertia('/services', 'services')->name('services');
Route::inertia('/blogs', 'blogs')->name('blogs');
Route::inertia('/contact', 'contact')->name('contact');
