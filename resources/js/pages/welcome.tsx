import { Head } from '@inertiajs/react';
import Nav from '@/components/Nav';
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <Nav />
            <div className='mt-30 lg:mt-0'>
                <HeroSection />
                <AboutSection />
            </div>
        </>
    );
}
