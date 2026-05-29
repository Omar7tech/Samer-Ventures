import { Head } from '@inertiajs/react';
import Nav from '@/components/Nav';
import AboutSection from '@/sections/AboutSection';
import ExperienceSection from '@/sections/ExperienceSection';
import HeroSection from '@/sections/HeroSection';
import LogoMarquee from '@/sections/LogoMarquee';
import SmallSentence from '@/sections/smallSentence';
import StrategicServicesSection from '@/sections/StrategicServicesSection';
import ValueSection from '@/sections/ValueSection';

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
            <Head title="Welcome " />
            <Nav />
            <div className='mt-30 lg:mt-0'>
                <HeroSection />
                <AboutSection />
                <LogoMarquee logos={logos} duration={30} pauseOnHover={true} />
                <SmallSentence />
                <ExperienceSection />
                <ValueSection />
                <StrategicServicesSection />
            </div>
        </>
    );
}
