import { Head } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import ServicesHero from '@/sections/ServicesHero';
import ServicesGrid from '@/sections/ServicesGrid';
import ServicesIntro from '@/sections/ServicesIntro';
import ServicesAccordion from '@/sections/ServicesAccordion';

const Services = () => {
  return (
    <>
      <Head title="Services" />
      <ServicesHero />
      <ServicesGrid />
      <ServicesIntro />
      <ServicesAccordion />
    </>
  );
};

Services.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Services;
