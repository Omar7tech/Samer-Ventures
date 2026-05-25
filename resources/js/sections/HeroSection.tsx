import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

const HeroSection = () => {
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP((context, contextSafe) => {
    if (isOpen) {
      gsap.to(contentRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in'
      });
    }
  }, { scope: containerRef, dependencies: [isOpen] });

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-3 md:p-5 relative w-full overflow-hidden" ref={containerRef}>
      
      {/* Main Layout Container */}
      <div className="relative w-full min-h-[600px] lg:h-[calc(100vh-4rem)] flex flex-col justify-between lg:block rounded-2xl md:rounded-3xl overflow-hidden">
        
        {/* Background Image Wrapper */}
        <img 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0" 
          src="/hero-bg.jpg" 
          alt="Hero background" 
        />

        {/* Hero Text: Perfectly scaled to ensure lines never break prematurely */}
        <div className="relative lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-0 z-10 flex items-center px-6 sm:px-16 md:px-24 lg:px-20 xl:px-32 pt-20 pb-12 lg:py-0">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-wider whitespace-nowrap">
            WE ARE YOUR<br />
            SALES & BUSINESS<br />
            VENTURES
          </h1>
        </div>

        {/* What We Do - Bottom Center on Mobile, Bottom Right on Desktop */}
        <div className="relative lg:absolute z-20 mt-auto lg:mt-0 lg:bottom-12 lg:right-12 w-full sm:max-w-[420px] lg:w-[360px] xl:w-[400px] px-6 pb-8 sm:px-16 md:px-24 lg:p-0">
          <div className="overflow-hidden bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 lg:bg-transparent lg:backdrop-blur-none lg:border-none">
            
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