import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const words = gsap.utils.toArray('.reveal-word');

    // Smoothly illuminates from initial 20% opacity up to a subtle 50% opacity
    gsap.to(words, {
      opacity: 0.5, // Keeping your original subtle 50% opacity target
      stagger: 0.1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        end: 'top 25%',
        scrub: true,
      },
    });
  }, { scope: containerRef });

  // FIXED SPACE COLLAPSE ON MOBILE
  const renderRevealWords = (text: string) => {
    return text
      .split(' ')
      .filter(Boolean)
      .map((word, i) => (
        <span key={i} className="reveal-word inline-block md:inline opacity-20">
          {word}
          {/* Forces a distinct margin gap on mobile, falls back to normal space string on desktop */}
          <span className="inline-block w-[0.27em] md:hidden" aria-hidden="true" />
          <span className="hidden md:inline">{' '}</span>
        </span>
      ));
  };

  return (
    <section ref={containerRef} className="p-3 md:p-5 w-full font-inter">
      {/* 
        ENHANCED FOR DESKTOP: 
        - max-w shortened from 1700px to 1400px to avoid extreme stretching
        - md:px-28 and lg:px-36 pull the entire content block tighter towards the center
      */}
      <div className="mx-auto max-w-[1400px] px-2 py-10 md:px-28 lg:px-36 md:py-24">

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-4 md:gap-12 lg:gap-20 items-start">

          {/* Left: Label (Responsive typography scales matched) */}
          <div className="text-primary text-xs md:text-lg font-medium tracking-wider uppercase opacity-80 md:opacity-100 lg:pt-2">
            About Us
          </div>

          {/* Right: Main Content */}
          <div className="w-full space-y-0 md:space-y-6">
            {/* 
              ENHANCED FOR DESKTOP:
              - md:text-[40px] stops the text from feeling too huge
              - All mobile configurations and layout constraints are exactly preserved
            */}
            <h2 className="text-2xl sm:text-4xl md:text-[40px] font-medium leading-[1.3] md:leading-[1.2] tracking-tight sm:tracking-wide md:tracking-widest text-primary">
              <span className="italic mr-1 md:mr-0">"</span>

              {/* These stay permanently at 100% full primary color */}
              <span>At SamerVentures® We Help </span>
              <span className="underline decoration-2 md:decoration-4 underline-offset-[6px] md:underline-offset-8 tracking-normal inline">
                Businesses Grow{' '}
              </span>

              {/* Only these words animate from 20% to 50% on scroll */}
              <span className="inline">
                {renderRevealWords('Through Strategic Partnerships, Outsourced Business Development, And Relationship-Driven Commercial Solutions.')}
              </span>
              
              <span className="italic ml-0.5 md:ml-0">"</span>
            </h2>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;