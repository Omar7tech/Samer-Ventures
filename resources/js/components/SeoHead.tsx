import { Head, usePage } from '@inertiajs/react';

interface SeoProps {
    title?: string;
    description?: string;
    canonical?: string;
    image?: string;
    imageAlt?: string;
    type?: string;
}

/**
 * Renders the page's SEO meta through Inertia's <Head>.
 *
 * The same tags are also server-rendered in `partials/seo.blade.php` (the
 * source of truth for crawlers / social bots that don't run JS). By marking
 * those server tags with the `inertia` attribute and re-declaring them here
 * with matching `head-key`s, Inertia adopts and keeps them in the live DOM
 * after hydration and updates them on client-side navigation — without
 * duplicating tags.
 */
export default function SeoHead() {
    const seo = (usePage().props.seo ?? {}) as SeoProps;

    const type = seo.type ?? 'website';

    return (
        <Head title={seo.title}>
            {seo.description && <meta head-key="description" name="description" content={seo.description} />}
            {seo.canonical && <link head-key="canonical" rel="canonical" href={seo.canonical} />}

            <meta head-key="og:type" property="og:type" content={type} />
            {seo.title && <meta head-key="og:title" property="og:title" content={seo.title} />}
            {seo.description && <meta head-key="og:description" property="og:description" content={seo.description} />}
            {seo.canonical && <meta head-key="og:url" property="og:url" content={seo.canonical} />}
            {seo.image && <meta head-key="og:image" property="og:image" content={seo.image} />}
            {seo.imageAlt && <meta head-key="og:image:alt" property="og:image:alt" content={seo.imageAlt} />}

            <meta head-key="twitter:card" name="twitter:card" content="summary_large_image" />
            {seo.title && <meta head-key="twitter:title" name="twitter:title" content={seo.title} />}
            {seo.description && <meta head-key="twitter:description" name="twitter:description" content={seo.description} />}
            {seo.image && <meta head-key="twitter:image" name="twitter:image" content={seo.image} />}
            {seo.imageAlt && <meta head-key="twitter:image:alt" name="twitter:image:alt" content={seo.imageAlt} />}
        </Head>
    );
}
