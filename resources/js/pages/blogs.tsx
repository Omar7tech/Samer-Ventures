import { Head } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';

const Blogs = () => {
    return (
        <MainLayout>
            <Head title="Blogs" />

            <section className="flex min-h-[60vh] items-center justify-center bg-white font-sans px-6">
                <p className="text-lg text-primary/60">Blogs coming soon.</p>
            </section>
        </MainLayout>
    );
};

export default Blogs;
