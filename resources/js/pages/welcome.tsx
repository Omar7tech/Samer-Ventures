import { Head } from '@inertiajs/react';
import Nav from '@/components/Nav';
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';
import LogoSlider from '@/sections/LogoSlider';
import SmallSentence from '@/sections/smallSentence';
import ExperienceSection from '@/sections/ExperienceSection';
import ValueSection from '@/sections/ValueSection';
import StrategicServicesSection from '@/sections/StrategicServicesSection';

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
                <LogoSlider logos={logos} duration={30} />
                <SmallSentence />
                <ExperienceSection />
                <ValueSection />
                <StrategicServicesSection />
            </div>
        </>
    );
}
