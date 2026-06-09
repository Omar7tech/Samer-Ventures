import type { Auth } from '@/types/auth';

export interface SocialMedia {
    name: string;
    link: string;
}

export interface EmailEntry {
    name: string;
    email: string;
}

export interface AppSettings {
    social_media: SocialMedia[];
    emails: EmailEntry[];
}

declare module 'react' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            settings: AppSettings;
            [key: string]: unknown;
        };
    }
}
