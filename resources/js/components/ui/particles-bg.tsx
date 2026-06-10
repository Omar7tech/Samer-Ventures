import { useEffect, useCallback } from 'react';

declare global {
  interface Window {
    particlesJS?: (id: string, config: object) => void;
    pJSDom?: Array<{ pJS: { fn: { vendors: { destroypJS: () => void } } } }>;
  }
}

export default function ParticlesComponent() {
  const initParticles = useCallback(() => {
    // cleanup old canvas
    const oldCanvas = document.querySelector('#particles-js canvas');
    if (oldCanvas) {
      oldCanvas.remove();
    }

    if (window.pJSDom && window.pJSDom.length > 0) {
      window.pJSDom.forEach((p) => p.pJS.fn.vendors.destroypJS());
      window.pJSDom = [];
    }

    const primary = '#145f60';

    window.particlesJS?.('particles-js', {
      particles: {
        number: { value: 120, density: { enable: true, value_area: 800 } },
        color: { value: primary },
        shape: { type: 'circle', stroke: { width: 0.5, color: primary } },
        opacity: {
          value: 0.7,
          random: true,
          anim: { enable: true, speed: 1, opacity_min: 0.3 },
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: true, speed: 2, size_min: 1 },
        },
        line_linked: {
          enable: true,
          distance: 160,
          color: primary,
          opacity: 0.4,
          width: 1.2,
        },
        move: { enable: true, speed: 2, random: true, out_mode: 'bounce' },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' },
          resize: true,
        },
        modes: {
          grab: { distance: 220, line_linked: { opacity: 0.8 } },
          push: { particles_nb: 4 },
          repulse: { distance: 180, duration: 0.4 },
        },
      },
      retina_detect: true,
    });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      initParticles();
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [initParticles]);

  return (
    <div
      id="particles-js"
      className="absolute inset-0 mx-auto h-full w-full max-w-[1700px]"
    />
  );
}
