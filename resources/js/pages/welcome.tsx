import { Head } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import AboutSection from '@/sections/AboutSection';
import ExperienceSection from '@/sections/ExperienceSection';
import HeroSection from '@/sections/HeroSection';
import LogoMarquee from '@/sections/LogoMarquee';
import PartnershipSection from '@/sections/PartnershipSection';
import SmallSentence from '@/sections/smallSentence';
import StrategicServicesSection from '@/sections/StrategicServicesSection';
import TestimonialsSection from '@/sections/TestimonialsSection';
import ValueSection from '@/sections/ValueSection';
import type { ClientLogo, Testimonial, ValueItem, WhatWeDo } from '@/types';

interface WelcomeProps {
    whatWeDo?: WhatWeDo[];
    values?: ValueItem[];
    testimonials?: Testimonial[];
    clientLogos?: ClientLogo[];
}

const Welcome = ({ whatWeDo, values, testimonials = [], clientLogos = [] }: WelcomeProps) => {
    return (
        <>
            <Head title="Welcome" />
            <HeroSection whatWeDo={whatWeDo} />
            <AboutSection />
            <LogoMarquee logos={clientLogos} duration={30} pauseOnHover={true} />
            <SmallSentence />
            <ExperienceSection />
            <ValueSection values={values} />
            <div className="relative h-0 overflow-visible">
                <div className="absolute -left-64 md:-left-96 lg:-left-128 top-0 -translate-y-1/2 pointer-events-none">
                    <img
                        src="/logo/sv-icon.svg"
                        alt=""
                        className="w-lg md:w-3xl lg:w-5xl opacity-5 grayscale select-none"
                        aria-hidden="true"
                    />
                </div>
            </div>
            <StrategicServicesSection />
            <TestimonialsSection testimonials={testimonials} />
            <PartnershipSection />
        </>
    );
};

Welcome.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Welcome;
