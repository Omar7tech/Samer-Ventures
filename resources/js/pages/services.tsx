import { Head } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import ServicesAccordion from '@/sections/ServicesAccordion';
import ServicesGrid from '@/sections/ServicesGrid';
import ServicesHero from '@/sections/ServicesHero';
import ServicesIntro from '@/sections/ServicesIntro';
import type { Service } from '@/types';

interface ServicesProps {
  services?: Service[];
}

const Services = ({ services = [] }: ServicesProps) => {
  return (
    <>
      <Head title="Services" />
      <ServicesHero />
      <ServicesGrid />
      <ServicesIntro />
      <ServicesAccordion services={services} />
    </>
  );
};

Services.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Services;
