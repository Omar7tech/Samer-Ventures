import { Head } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import ServicesHero from '@/sections/ServicesHero';

const Services = () => {
  return (
    <>
      <Head title="Services" />
      <ServicesHero />
    </>
  );
};

Services.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Services;
