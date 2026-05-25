import Logo from '@/components/logo';
import Nav from '@/components/Nav';
import HeroSection from '@/sections/HeroSection';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <Nav />
            <div className='mt-30 md:mt-0'>
               <HeroSection />
            </div>

        </>
    );
}
