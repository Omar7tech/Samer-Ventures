import { Head, usePage } from '@inertiajs/react';

/**
 * Keeps the browser tab title in sync during client-side navigation.
 *
 * All SEO meta tags + JSON-LD are rendered server-side in
 * `resources/views/partials/seo.blade.php` (the source of truth for crawlers
 * and social bots, which don't run JS). Here we only manage the document title
 * for the SPA so it matches the server-rendered `seo.title` on every visit.
 */
export default function SeoHead() {
    const seo = usePage().props.seo as { title?: string } | undefined;

    return <Head title={seo?.title} />;
}
