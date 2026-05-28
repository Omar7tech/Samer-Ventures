import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const words = gsap.utils.toArray('.reveal-word');

    // Smoothly illuminates from initial 20% opacity up to a subtle 50% opacity
    gsap.to(words, {
      opacity: 0.5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        end: 'top 25%',
        scrub: true,
      },
    });
  }, { scope: containerRef });

  // Splits string into span tokens initialized at 20% opacity (opacity-20)
  const renderRevealWords = (text: string) => {
    return text
      .split(' ')
      .filter(Boolean)
      .map((word, i) => (
        <span key={i} className="reveal-word inline opacity-20">
          {word}{' '}
        </span>
      ));
  };

  return (
    <section ref={containerRef} className="p-3 md:p-5 w-full">
      <div className="mx-auto max-w-[1700px] px-6 py-10 md:px-20 lg:px-24 md:py-20">

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-4 md:gap-12 lg:gap-20 items-start">

          {/* Left: Label */}
          <div className="text-primary text-base md:text-xl font-medium tracking-wider uppercase">
            About Us
          </div>

          {/* Right: Main Content */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-[45px] font-medium leading-[1.2] md:leading-[1.15] tracking-normal sm:tracking-wide md:tracking-widest text-primary">
              <span className="italic">"</span>

              {/* These stay permanently at 100% full primary color */}
              <span>At SamerVentures® We Help </span>
              <span className="underline decoration-4 underline-offset-4 md:underline-offset-8 tracking-normal inline">
                BusinessesGrow{' '}
              </span>

              {/* Only these words animate from 20% to 50% on scroll */}
              <span>
                {renderRevealWords('Through Strategic Partnerships, Outsourced Business Development, And Relationship-Driven Commercial Solutions.')}
              </span>
              <span className="italic">"</span>
            </h2>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;