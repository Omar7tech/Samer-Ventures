import React from 'react';

const ExperienceSection = () => {
  return (
    <section className="p-3 md:p-5 w-full font-inter">
      <div className="mx-auto max-w-[1700px] px-2 py-2 md:px-20 lg:px-24">
        
        {/* Card Container with Group Hover Context */}
        <div className="group/card relative overflow-hidden rounded-2xl md:rounded-[32px] h-[280px] md:h-[380px] w-full transition-all duration-500 ease-out shadow-sm">
          
          {/* Smooth Zoom Background Layer */}
          <div 
            className="absolute inset-0 bg-cover bg-top transform scale-100 group-hover/card:scale-[1.03] transition-transform duration-700 ease-out"
            style={{ backgroundImage: 'url(/images/experience.jpg)' }}
          />

          {/* Premium Gradient Overlay: Injected dark cinematic depth exactly where the text lives */}
          <div className="absolute inset-0 bg-linear-to-tr from-black/80 via-black/40 to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

          {/* Text Content - Positioned Left Bottom Corner */}
          <div className="relative h-full flex items-end p-6 md:p-12 lg:p-16">
            <h2 className="text-2xl sm:text-4xl md:text-[44px] lg:text-[52px] font-black text-white tracking-tight md:tracking-tighter leading-[1.1] md:leading-[1.05] uppercase">
              Built On Experience.<br />
              <span className="opacity-90 font-extrabold">Driven By Relationships.</span>
            </h2>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ExperienceSection;