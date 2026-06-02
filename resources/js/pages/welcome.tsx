import { Head } from '@inertiajs/react';
import Nav from '@/components/Nav';
import AboutSection from '@/sections/AboutSection';
import ExperienceSection from '@/sections/ExperienceSection';
import HeroSection from '@/sections/HeroSection';
import LogoMarquee from '@/sections/LogoMarquee';
import PartnershipSection from '@/sections/PartnershipSection';
import SmallSentence from '@/sections/smallSentence';
import StrategicServicesSection from '@/sections/StrategicServicesSection';
import TestimonialsSection from '@/sections/TestimonialsSection';
import ValueSection from '@/sections/ValueSection';

export default function Welcome() {
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
                <TestimonialsSection testimonials={testimonials} />
                <PartnershipSection />
            </div>
        </>
    );
}
