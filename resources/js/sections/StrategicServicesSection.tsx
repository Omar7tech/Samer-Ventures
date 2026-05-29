import AnimatedButton from '@/components/shadcn-space/button/button-01';
import { Button } from '@/components/ui/button';
import React from 'react';

const StrategicServicesSection = () => {
  const services = [
    {
      id: 1,
      title: 'SV GROWTH',
      subtitle: 'Outsourced Business Development, Sales Support, Lead Generation, And Client Acquisition.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
      layout: 'card',
    },
    {
      id: 2,
      title: 'SV RELATIONS',
      subtitle: 'Corporate Relations, Strategic Partnerships, Sponsorships, And PR Collaborations.',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=600&auto=format&fit=crop',
      layout: 'card',
    },
    {
      id: 3,
      title: 'SV INSIGHTS',
      subtitle: 'Market Research, Surveys, Customer Feedback, And Field Data Collection.',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop',
      layout: 'card',
    },
    {
      id: 4,
      title: 'SV INSIGHTS',
      subtitle: 'Market Research, Surveys, Customer Feedback, And Field Data Collection.',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop',
      layout: 'horizontal',
    },
    {
      id: 5,
      title: 'SV PITCH',
      subtitle: 'Sales Pitch Development And Communication Support For Internal Sales Teams.',
      image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=600&auto=format&fit=crop',
      layout: 'horizontal',
    },
  ];

  const cardServices = services.filter((s) => s.layout === 'card');
  const horizontalServices = services.filter((s) => s.layout === 'horizontal');

  // Unified styling helper variables to enforce identical mobile layout rules
  const baseCardStyles = "bg-card rounded-[24px] md:rounded-[32px] p-4 md:p-6 flex flex-col justify-between";
  const baseImageWrapper = "w-full overflow-hidden rounded-[18px] md:rounded-[24px] shrink-0 mb-4";
  const baseTitleStyles = "text-xl sm:text-3xl font-black text-primary tracking-tight mb-1.5 md:mb-3";
  const baseSubtitleStyles = "text-[14px] sm:text-[18px] font-light text-primary/80 leading-tight tracking-tight md:tracking-tighter pr-2";

  return (
    <section className="font-inter w-full py-6 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1700px] px-2 py-2 md:px-20 lg:px-24">
        
        {/* Section Header */}
        <h2 className="text-[28px] sm:text-5xl font-bold text-primary leading-[1.1] md:leading-[0.9] tracking-tight mb-6 md:mb-10">
          Strategic Services <br />
          Built For Business Growth
        </h2> 

        {/* Top Grid Layer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10 mb-4 md:mb-6">
          {cardServices.map((service) => (
            <div key={service.id} className={`${baseCardStyles} min-h-[380px] sm:min-h-[440px] md:min-h-[540px]`}>
              <div>
                <div className={`${baseImageWrapper} h-[180px] sm:h-[200px] md:h-[260px]`}>
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
                <h3 className={baseTitleStyles}>{service.title}</h3>
                <p className={baseSubtitleStyles}>{service.subtitle}</p>
              </div>
              <div className="pt-4 md:pt-6 mt-auto">
                <AnimatedButton text="Let's Collaborate" href="#contact" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Horizontal Layer */}
        <div className="space-y-4 md:space-y-6">
          {horizontalServices.map((service) => (
            <div key={service.id} className={`${baseCardStyles} md:flex-row md:items-start gap-4 md:gap-6`}>
              
              {/* Image box scales up on desktop but stays identical to cards on mobile */}
              <div className={`${baseImageWrapper} h-[180px] sm:h-[200px] md:h-[150px] md:w-[280px] md:mb-0`}>
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
              </div>

              {/* Text Content block wrapped cleanly for desktop columns */}
              <div className="flex-1 flex flex-col md:flex-row items-start justify-between gap-4 w-full h-full md:pt-2">
                <div className="space-y-1 md:space-y-2 max-w-[500px]">
                  <h3 className={baseTitleStyles}>{service.title}</h3>
                  <p className={baseSubtitleStyles}>{service.subtitle}</p>
                </div>
                <div className="shrink-0 self-start w-full md:w-auto pt-2 md:pt-0">
                  <AnimatedButton text="Let's Collaborate" href="#contact" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StrategicServicesSection;