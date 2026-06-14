<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class SitemapController extends Controller
{
    /**
     * Serve a always-fresh, cached XML sitemap.
     *
     * Generating on request (rather than to a static file) avoids needing a
     * cron job on shared hosting; a short cache keeps it fast.
     */
    public function __invoke(): Response
    {
        $xml = Cache::remember('sitemap.xml', now()->addHours(6), function (): string {
            $sitemap = Sitemap::create()
                ->add(
                    Url::create(route('home'))
                        ->setPriority(1.0)
                        ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
                )
                ->add(
                    Url::create(route('services'))
                        ->setPriority(0.9)
                        ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
                )
                ->add(
                    Url::create(route('blogs'))
                        ->setPriority(0.9)
                        ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY)
                )
                ->add(
                    Url::create(route('contact'))
                        ->setPriority(0.6)
                        ->setChangeFrequency(Url::CHANGE_FREQUENCY_YEARLY)
                );

            Blog::query()
                ->select(['slug', 'updated_at'])
                ->latest('updated_at')
                ->get()
                ->each(function (Blog $blog) use ($sitemap): void {
                    $sitemap->add(
                        Url::create(route('blogs.show', $blog->slug))
                            ->setLastModificationDate($blog->updated_at ?? now())
                            ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
                            ->setPriority(0.8)
                    );
                });

            return $sitemap->render();
        });

        return response($xml, 200, ['Content-Type' => 'application/xml']);
    }
}
