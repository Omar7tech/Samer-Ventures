import { Head } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';

const Services = () => {
  return (
    <>
      <Head title="Services" />
      <div className="min-h-screen py-20 px-6 md:px-20 lg:px-24">
        <div className="max-w-[1700px] mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-8">
            Our Services
          </h1>
          <p className="text-xl text-gray-600">
            Coming soon...
          </p>
        </div>
      </div>
    </>
  );
};

Services.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Services;
