import { motion } from 'framer-motion';
import React from 'react';

interface Logo {
  src: string;
  alt: string;
  link?: string;
}

interface LogoSliderProps {
  logos?: Logo[];
  duration?: number;
  pauseOnHover?: boolean;
}

const LogoSlider = ({
  logos = [],
  duration = 20,
  pauseOnHover = true,
}: LogoSliderProps) => {
  // Don't render if no logos
  if (!logos || logos.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-16 md:py-20 bg-white">
      <div className="flex relative overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-32 md:before:w-48 before:bg-gradient-to-r before:from-white before:to-transparent before:content-[''] after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-32 md:after:w-48 after:bg-gradient-to-l after:from-white after:to-transparent after:content-['']">
        <motion.div
          transition={{
            duration: duration,
            ease: 'linear',
            repeat: Infinity,
          }}
          initial={{ translateX: 0 }}
          animate={{ translateX: '-50%' }}
          whileHover={pauseOnHover ? { animationPlayState: 'paused' } : {}}
          className="flex flex-none gap-8 md:gap-16 pr-8 md:pr-16"
        >
          {[...new Array(2)].fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {logos.map((logo, logoIndex) => (
                <div key={`${index}-${logoIndex}`} className="flex-none">
                  {logo.link ? (
                    <a
                      href={logo.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="h-12 md:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </a>
                  ) : (
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="h-12 md:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  )}
                </div>
              ))}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LogoSlider;
