import { createInertiaApp } from '@inertiajs/react';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    // Server-rendered `seo.title` is already fully composed (incl. brand),
    // so pass it through untouched; fall back to the app name when absent.
    title: (title) => title || appName,
    progress: {
        color: '#145f60',
    },
    defaults: {
        visitOptions: () => {
            return { viewTransition: true };
        },
    },
});
