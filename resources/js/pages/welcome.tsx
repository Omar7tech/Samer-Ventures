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

const Welcome = () => {
    const logos = [
        { src: 'https://placehold.co/600x400' },
        { src: 'https://placehold.co/600x400' },
        { src: 'https://placehold.co/600x400' },
        { src: 'https://placehold.co/600x400' },
        { src: 'https://placehold.co/600x400' },
    ];

    const testimonials = [
        {
            id: 1,
            rating: 5,
            quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.',
            name: 'NAME',
            organization: 'Organization',
        },
        {
            id: 2,
            rating: 5,
            quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.',
            name: 'NAME',
            organization: 'Organization',
        },
        {
            id: 3,
            rating: 5,
            quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.',
            name: 'NAME',
            organization: 'Organization',
        },
        {
            id: 4,
            rating: 5,
            quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.',
            name: 'NAME',
            organization: 'Organization',
        },
        {
            id: 5,
            rating: 5,
            quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.',
            name: 'NAME',
            organization: 'Organization',
        },
    ];

    return (
        <>
            <Head title="Welcome" />
            <HeroSection />
            <AboutSection />
            <LogoMarquee logos={logos} duration={30} pauseOnHover={true} />
            <SmallSentence />
            <ExperienceSection />
            <ValueSection />
            <div className="relative h-0 overflow-visible">
                <div className="absolute -left-64 md:-left-96 lg:-left-128 top-0 -translate-y-1/2 pointer-events-none">
                    <img
                        src="/logo/small-on-light.png"
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
