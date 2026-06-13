export interface Blog {
    id: number;
    title: string;
    slug: string;
    content: string;
    description: string;
    have_video: boolean;
    video_url: string | null;
    image: string | null;
    created_at: string;
    updated_at?: string;
}

export interface PaginationLink {
    url?: string;
    label: string;
    active: boolean;
    page?: number;
}

export interface PaginationMeta {
    current_page: number;
    last_page: number;
    total: number;
    from: number;
    to: number;
    links: PaginationLink[];
}

export interface PaginationProps<T> {
    data: T[];
    meta: PaginationMeta;
}
