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
    <div className="p-5 relative" ref={containerRef}>
      <img className="w-full aspect-video min-h-[600px] h-[calc(100vh-4rem)] rounded-3xl object-cover" src="/hero-bg.jpg" alt="" />

      {/* Hero Text */}
      <div className="absolute inset-0 flex items-center px-32">
        <h1 className="text-white text-8xl font-extrabold leading-tight tracking-wider">
          WE ARE YOUR<br />
          SALES & BUSINESS<br />
          VENTURES
        </h1>
      </div>

      {/* What We Do - Bottom Right */}
      <div className="absolute bottom-12 right-12">
        <div className="overflow-hidden">
          {/* Toggle Button */}
          <button
            onClick={handleToggle}
            className="w-full px-8 py-4 text-left flex items-center justify-between transition-colors"
          >
            <span className="text-2xl font-bold text-white">WHAT WE DO</span>
            <span className="text-3xl font-light text-white">{isOpen ? '−' : '+'}</span>
          </button>

          {/* Content */}
          <div
            ref={contentRef}
            className="overflow-hidden"
            style={{ opacity: 1, height: 'auto' }}
          >
            <div className="px-8 pb-6 space-y-4">
              <div className="border-t border-white/30 pt-4">
                <p className="text-lg text-white"><span className="font-semibold">01</span> Sales Outsourcing</p>
              </div>
              <div className="border-t border-white/30 pt-4">
                <p className="text-lg text-white"><span className="font-semibold">02</span> Business Development</p>
              </div>
              <div className="border-t border-white/30 pt-4">
                <p className="text-lg text-white"><span className="font-semibold">03</span> Corporate Relations</p>
              </div>
              <div className="border-t border-white/30 pt-4">
                <p className="text-lg text-white"><span className="font-semibold">04</span> PR & Sponsorships</p>
              </div>
              <div className="border-t border-white/30 pt-4">
                <p className="text-lg text-white"><span className="font-semibold">05</span> Market Research</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection