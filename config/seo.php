<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Brand / Organization
    |--------------------------------------------------------------------------
    |
    | Site-wide identity used to build default meta tags and the global
    | Organization / WebSite JSON-LD structured data injected on every page.
    |
    */

    'name' => 'Samer Ventures',

    'legal_name' => 'Samer Ventures',

    'description' => 'Samer Ventures is a venture-building and strategic advisory firm partnering with founders and ambitious businesses to launch, scale, and transform — combining capital, operating expertise, and hands-on execution.',

    'locale' => 'en_US',

    'theme_color' => '#145f60',

    // Square-ish logo used for Organization structured data (PNG/JPG recommended).
    'logo' => '/logo/full-on-light.png',

    // Default Open Graph / Twitter image (1200x630) used as a fallback.
    'default_image' => '/og/HomePage.png',

    // Twitter / X handle (without @). Leave null to omit twitter:site/creator.
    'twitter' => null,

    /*
    |--------------------------------------------------------------------------
    | Per-page Open Graph images (1200x630)
    |--------------------------------------------------------------------------
    */

    'images' => [
        'home' => '/og/HomePage.png',
        'services' => '/og/ServicesPage.png',
        'blogs' => '/og/BlogsPage.png',
        'contact' => '/og/ContactPage.png',
    ],

    /*
    |--------------------------------------------------------------------------
    | Defaults
    |--------------------------------------------------------------------------
    */

    'robots' => 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',

    // Optional geo-targeting for local SEO. Set to null to disable.
    'geo' => [
        'region' => 'LB',
        'placename' => 'Beirut, Lebanon',
    ],
];
