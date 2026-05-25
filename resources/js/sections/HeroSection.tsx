import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';

gsap.registerPlugin(useGSAP);

const HeroSection = () => {
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = contentRef.current?.children[0].children;

    if (isOpen) {
      const tl = gsap.timeline();
      
      tl.to(contentRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.6,
        ease: 'power3.inOut'
      })
      .fromTo(items as HTMLCollectionOf<HTMLElement>,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' },
        "-=0.4" 
      );
    } else {
      const tl = gsap.timeline();
      
      tl.to(items as HTMLCollectionOf<HTMLElement>, {
        y: -10,
        opacity: 0,
        duration: 0.2,
        stagger: -0.03,
        ease: 'power2.inOut'
      })
      .to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.inOut'
      }, "-=0.1"); 
    }
  }, { scope: containerRef, dependencies: [isOpen] });

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-3 md:p-5 relative w-full overflow-hidden" ref={containerRef}>
      
      {/* Main Layout Container */}
      <div className="relative w-full min-h-[600px] lg:h-[calc(100vh-4rem)] flex flex-col justify-between lg:grid lg:grid-cols-3 lg:gap-8 rounded-2xl md:rounded-3xl overflow-hidden">

        {/* Background Image Wrapper */}
        <img
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
          src="/hero-bg.jpg"
          alt="Hero background"
        />

        {/* Hero Text: Removed whitespace-nowrap and adjusted line-height for safer desktop scaling */}
        <div className="relative z-10 lg:col-span-2 flex items-center px-6 sm:px-16 md:px-24 lg:px-20 xl:px-32 pt-20 pb-12 lg:py-0 min-w-0">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-7xl font-extrabold leading-[1.1] tracking-wider break-words">
            WE ARE YOUR<br />
            SALES & BUSINESS<br />
            VENTURES
          </h1>
        </div>

        {/* What We Do - Fluid width using w-full and max-w */}
        <div className="relative z-20 lg:col-span-1 mt-auto lg:mt-0 md:flex md:items-end md:justify-end md:pb-12 md:pr-12 w-full md:w-auto px-6 pb-8 md:p-0">
          <div className="overflow-hidden bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 md:bg-transparent md:backdrop-blur-none md:border-none w-full max-w-[420px]">
            
            {/* Toggle Button */}
            <button
              onClick={handleToggle}
              className="w-full px-5 py-4 lg:px-8 text-left flex items-center justify-between transition-colors hover:bg-white/5 lg:hover:bg-transparent"
            >
              <span className="text-xl lg:text-2xl font-bold text-white tracking-wide">WHAT WE DO</span>
              <span className="text-2xl lg:text-3xl font-light text-white">{isOpen ? '−' : '+'}</span>
            </button>

            {/* Content Drawer */}
            <div
              ref={contentRef}
              className="overflow-hidden"
              style={{ opacity: 1, height: 'auto' }}
            >
              <div className="px-5 pb-5 lg:px-8 lg:pb-6 space-y-2">
                <div className="border-t border-white/30 pt-2">
                  <p className="text-base lg:text-lg text-white"><span className="font-semibold mr-4">01</span> Sales Outsourcing</p>
                </div>
                <div className="border-t border-white/30 pt-2">
                  <p className="text-base lg:text-lg text-white"><span className="font-semibold mr-4">02</span> Business Development</p>
                </div>
                <div className="border-t border-white/30 pt-2">
                  <p className="text-base lg:text-lg text-white"><span className="font-semibold mr-4">03</span> Corporate Relations</p>
                </div>
                <div className="border-t border-white/30 pt-2">
                  <p className="text-base lg:text-lg text-white"><span className="font-semibold mr-4">04</span> PR & Sponsorships</p>
                </div>
                <div className="border-t border-white/30 pt-2">
                  <p className="text-base lg:text-lg text-white"><span className="font-semibold mr-4">05</span> Market Research</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default HeroSection;