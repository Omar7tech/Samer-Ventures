export interface Testimonial {
    id: number;
    rating?: number;
    quote: string;
    name: string;
    organization: string;
    avatar?: string | null;
}
