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

  // Reusable Book A Call Button Component
  const BookCallButton = () => (
    <button className="flex items-center justify-center gap-2 px-4 py-2 md:px-5 md:py-2.5 bg-[#d9dedc] text-[#9ca4a2] font-semibold text-[12px] md:text-[13px] rounded-full tracking-wide hover:bg-[#ced4cd] hover:text-[#7f8886] transition-all duration-200 group whitespace-nowrap max-sm:w-full">
      Book A Call
      <svg 
        className="w-3.5 h-3.5 md:w-4 md:h-4 stroke-[2.5] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
      </svg>
    </button>
  );

  return (
    <section className="font-inter w-full py-6 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1700px] px-2 py-2 md:px-20 lg:px-24">
        
        {/* Section Header */}
        <h2 className="text-[28px] sm:text-5xl font-bold text-primary leading-[1.1] md:leading-[0.9] tracking-tight mb-6 md:mb-10">
          Strategic Services <br />
          Built For Business Growth
        </h2> 

        {/* 3-Column Top Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10 mb-4 md:mb-6">
          {cardServices.map((service) => (
            <div
              key={service.id}
              className="bg-[#f1f3f2] rounded-[24px] md:rounded-[32px] p-4 md:p-6 flex flex-col justify-between min-h-[380px] sm:min-h-[440px] md:min-h-[540px]"
            >
              <div>
                {/* Rounded Top Image */}
                <div className="w-full h-[160px] sm:h-[200px] md:h-[260px] rounded-[18px] md:rounded-[24px] overflow-hidden mb-4 md:mb-6">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Text Content */}
                <h3 className="text-xl sm:text-3xl font-black text-primary tracking-tight mb-1.5 md:mb-3">
                  {service.title}
                </h3>
                <p className="text-[14px] sm:text-[18px] font-light text-[#4a5e5a] leading-tight tracking-tight md:tracking-tighter pr-2">
                  {service.subtitle}
                </p>
              </div>
              
              {/* Button Container */}
              <div className="pt-4 md:pt-6 mt-auto">
                <BookCallButton />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Horizontal Rows Layout */}
        <div className="space-y-4 md:space-y-6">
          {horizontalServices.map((service) => (
            <div
              key={service.id}
              className="bg-[#f1f3f2] rounded-[24px] md:rounded-[32px] p-4 md:p-5 flex flex-col md:flex-row items-start gap-4 md:gap-6"
            >
              {/* Horizontal Row Image */}
              <div className="w-full md:w-[280px] h-[140px] md:h-[150px] shrink-0 rounded-[18px] md:rounded-[24px] overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Horizontal Row Content Wrap */}
              <div className="flex-1 flex flex-col sm:flex-row items-start justify-between gap-4 pt-0 md:pt-2 w-full">
                <div className="space-y-1 md:space-y-2 max-w-[500px]">
                  <h3 className="text-xl sm:text-3xl font-black text-primary tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-[14px] sm:text-[18px] font-light text-[#4a5e5a] leading-tight tracking-tight md:tracking-tighter">
                    {service.subtitle}
                  </p>
                </div>
                
                {/* Button Container */}
                <div className="shrink-0 self-start max-sm:w-full">
                  <BookCallButton />
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