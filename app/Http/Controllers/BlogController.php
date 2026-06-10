<?php

namespace App\Http\Controllers;

use App\Http\Resources\BlogListResource;
use App\Http\Resources\BlogResource;
use App\Models\Blog;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(): Response
    {
        $blogs = Blog::with('media')->paginate(8);

        return Inertia::render('blogs/index', [
            'blogs' => fn () => BlogListResource::collection($blogs),
        ]);
    }

    public function show(Blog $blog): Response
    {
        return Inertia::render('blogs/show', [
            'blog' => new BlogResource($blog),
        ]);
    }
}
