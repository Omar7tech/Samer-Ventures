{{--
    Server-rendered SEO head.

    Reads the `seo` prop that controllers attach to the Inertia page and outputs
    fully-formed meta tags + JSON-LD into the initial HTML response. This means
    search engines and social crawlers (which do not run JavaScript) always
    receive correct, per-URL metadata even though the app is a non-SSR SPA.

    The `inertia` attribute lets Inertia adopt/replace these tags during
    client-side navigation so titles stay in sync for users.
--}}
@php
    $seo = $page['props']['seo'] ?? [];

    $title = $seo['title'] ?? config('seo.name');
    $description = $seo['description'] ?? config('seo.description');
    $canonical = $seo['canonical'] ?? url()->current();
    $image = $seo['image'] ?? url(config('seo.default_image'));
    $imageAlt = $seo['imageAlt'] ?? config('seo.name');
    $type = $seo['type'] ?? 'website';
    $robots = $seo['robots'] ?? config('seo.robots');
    $keywords = $seo['keywords'] ?? null;
    $publishedTime = $seo['publishedTime'] ?? null;
    $modifiedTime = $seo['modifiedTime'] ?? null;
    $author = $seo['author'] ?? null;

    // Global structured data + any page-specific graphs.
    $schemas = array_merge(
        [\App\Support\SiteSchema::organization(), \App\Support\SiteSchema::website()],
        $seo['schemas'] ?? []
    );

    $jsonLdFlags = JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE;
@endphp

<title inertia>{{ $title }}</title>
<meta name="description" content="{{ $description }}">
@if ($keywords)
    <meta name="keywords" content="{{ $keywords }}">
@endif
<meta name="author" content="{{ $author ?? config('seo.name') }}">
<meta name="robots" content="{{ $robots }}">
<link rel="canonical" href="{{ $canonical }}">

{{-- Open Graph --}}
<meta property="og:site_name" content="{{ config('seo.name') }}">
<meta property="og:locale" content="{{ config('seo.locale') }}">
<meta property="og:type" content="{{ $type }}">
<meta property="og:title" content="{{ $title }}">
<meta property="og:description" content="{{ $description }}">
<meta property="og:url" content="{{ $canonical }}">
<meta property="og:image" content="{{ $image }}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="{{ $imageAlt }}">
@if ($type === 'article')
    @if ($publishedTime)
        <meta property="article:published_time" content="{{ $publishedTime }}">
    @endif
    @if ($modifiedTime)
        <meta property="article:modified_time" content="{{ $modifiedTime }}">
    @endif
@endif

{{-- Twitter / X --}}
<meta name="twitter:card" content="summary_large_image">
@if (config('seo.twitter'))
    <meta name="twitter:site" content="@{{ config('seo.twitter') }}">
    <meta name="twitter:creator" content="@{{ config('seo.twitter') }}">
@endif
<meta name="twitter:title" content="{{ $title }}">
<meta name="twitter:description" content="{{ $description }}">
<meta name="twitter:image" content="{{ $image }}">
<meta name="twitter:image:alt" content="{{ $imageAlt }}">

{{-- Local SEO / geo --}}
@if (config('seo.geo'))
    <meta name="geo.region" content="{{ config('seo.geo.region') }}">
    <meta name="geo.placename" content="{{ config('seo.geo.placename') }}">
@endif
<meta name="theme-color" content="{{ config('seo.theme_color') }}">

{{-- Structured data --}}
@foreach ($schemas as $schema)
    <script type="application/ld+json">{!! json_encode($schema, $jsonLdFlags) !!}</script>
@endforeach
