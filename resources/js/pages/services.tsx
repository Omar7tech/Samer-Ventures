import { Head } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import ServicesHero from '@/sections/ServicesHero';
import ServicesGrid from '@/sections/ServicesGrid';
import ServicesIntro from '@/sections/ServicesIntro';

const Services = () => {
  return (
    <>
      <Head title="Services" />
      <ServicesHero />
      <ServicesGrid />
      <ServicesIntro />
    </>
  );
};

Services.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Services;
