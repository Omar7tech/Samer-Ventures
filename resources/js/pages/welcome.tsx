import { Head } from '@inertiajs/react';
import Nav from '@/components/Nav';
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';
import LogoSlider from '@/sections/LogoSlider';

export default function Welcome() {
    const logos = [
        { src: 'https://placehold.co/600x400' },
        { src: 'https://placehold.co/600x400' },
        { src: 'https://placehold.co/600x400' },
        { src: 'https://placehold.co/600x400' },
        { src: 'https://placehold.co/600x400' },
    ];

    return (
        <>
            <Head title="Welcome" />
            <Nav />
            <div className='mt-30 lg:mt-0'>
                <HeroSection />
                <AboutSection />
                <LogoSlider logos={logos} duration={20} />
            </div>
        </>
    );
}
