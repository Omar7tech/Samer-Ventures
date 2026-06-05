import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

interface ServiceTab {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  image: string;
}

const services: ServiceTab[] = [
  {
    id: "growth",
    number: "101",
    title: "SV GROWTH",
    subtitle: "SALES",
    image: "https://picsum.photos/1100/800?random=1",
  },
  {
    id: "development",
    number: "202",
    title: "SV DEVELOPMENT",
    subtitle: "BUSINESS DEVELOPMENT",
    image: "https://picsum.photos/1100/800?random=2",
  },
  {
    id: "relations",
    number: "303",
    title: "SV RELATIONS",
    subtitle: "PUBLIC RELATIONS",
    image: "https://picsum.photos/1100/800?random=3",
  },
  {
    id: "insights",
    number: "404",
    title: "SV INSIGHTS",
    subtitle: "MARKET RESEARCH",
    image: "https://picsum.photos/1100/800?random=4",
  },
];

const ServicesGrid = () => {

  const [activeTab, setActiveTab] = useState<string>("growth");
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const currentService = services.find((s) => s.id === activeTab) || services[0];
  const activeIndex = Math.max(0, services.findIndex((s) => s.id === activeTab));
  const sectionRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Preload all images on mount
  useEffect(() => {
    services.forEach((service) => {
      const img = new Image();
      img.src = service.image;
    });
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 1023px)", () => {
        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${(services.length - 1) * window.innerHeight * 0.7}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (services.length - 1),
            duration: 0.3,
            ease: "power1.inOut",
          },
          onUpdate: (self) => {
            const index = Math.min(
              services.length - 1,
              Math.floor(self.progress * services.length)
            );
            const id = services[index].id;
            setActiveTab((prev) => (prev === id ? prev : id));

            if (progressBarRef.current) {
              gsap.set(progressBarRef.current, { scaleX: self.progress });
            }
          },
        });

        return () => st.kill();
      });
    },
    { scope: sectionRef }
  );

  // Handle tab change with loading state
  const handleTabChange = (id: string) => {
    const service = services.find((s) => s.id === id);

    if (service && !loadedImages.has(service.image)) {
      setIsImageLoading(true);
    }

    setActiveTab(id);
  };

  // Reset loading state when image loads
  const handleImageLoad = () => {
    setLoadedImages(prev => new Set(prev).add(currentService.image));
    setIsImageLoading(false);
  };

  return (
    <section ref={sectionRef} className="w-full bg-white py-10 lg:py-16 px-6 md:px-16 lg:px-32 font-inter">
      <div className="max-w-[1400px] mx-auto">

        <div className="hidden lg:block">

          <div className="w-full flex flex-col items-start mb-12">
            <div className="w-full flex flex-row items-start">
              <h2 className="text-[56px] font-bold text-primary tracking-tighter leading-[1.05] max-w-md">
                How We Grow <br />Your Business
              </h2>
              <div className="ml-6 -mt-5">
                <span className="text-lg font-extrabold tracking-wider uppercase text-primary">
                  SERVICES
                </span>
              </div>
            </div>
          </div>

          {/* Content Layout Grid */}
          <div className="grid grid-cols-[1.2fr_2fr] gap-16 items-start">

            {/* Left Column: Interactive Navigation Menu */}
            <div className="flex flex-col w-full border-t border-gray-100">
              {services.map((service) => {
                const isActive = activeTab === service.id;

                return (
                  <div
                    key={service.id}
                    onMouseEnter={() => handleTabChange(service.id)}
                    className={`w-full flex items-start gap-4 py-6 border-b text-left transition-all duration-300 relative group cursor-pointer
                      ${isActive
                        ? "border-gray-200 opacity-100"
                        : "border-gray-100 opacity-25 hover:opacity-50"
                      }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary h-full" />
                    )}

                    <span className={`text-base font-medium tracking-tight pl-3 min-w-[35px] ${isActive ? "text-primary/70" : "text-primary"}`}>
                      {service.number}
                    </span>

                    <div className="flex flex-col leading-tight">
                      <span className="text-2xl font-extrabold tracking-wider uppercase text-primary">
                        {service.title}
                      </span>
                      <span className="text-sm font-medium text-primary/80 tracking-wide mt-0.5">
                        {service.subtitle}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Display Card Asset Showcase */}
            <div className="relative w-full aspect-[1.45/1] rounded-[32px] overflow-hidden bg-[#EBF0F3] transition-all duration-500">
              {isImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#EBF0F3] z-20">
                  <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                </div>
              )}

              <img
                src={currentService.image}
                alt=""
                onLoad={handleImageLoad}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out hover:scale-105 ${
                  isImageLoading ? 'opacity-0' : 'opacity-100'
                }`}
              />

              <div className="absolute top-8 right-8 z-10">
                <div className="flex items-start gap-3 text-right">
                  <div className="flex flex-col leading-none">
                    <span className="text-sm font-bold tracking-wider text-primary uppercase">
                      {currentService.title}
                    </span>
                    <span className="text-[10px] font-semibold text-primary/70 tracking-widest uppercase mt-1">
                      {currentService.subtitle}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-primary/70">
                    {currentService.number}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ============================= MOBILE (< lg) ============================= */}
        <div className="lg:hidden">

          {/* Header */}
          <div className="flex items-end justify-between mb-5">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary tracking-tighter leading-[1.05]">
              How We Grow<br />Your Business
            </h2>
            <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-primary/50 pb-1.5">
              Services
            </span>
          </div>

          {/* Showcase Card */}
          <div className="relative w-full h-[60vh] rounded-[28px] overflow-hidden bg-[#EBF0F3] shadow-xl shadow-primary/5">

            {/* Crossfading images (all mounted, toggled by opacity — no loading flash) */}
            {services.map((service) => (
              <img
                key={service.id}
                src={service.image}
                alt={service.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
                  activeTab === service.id ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {/* Bottom gradient for caption legibility */}
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/75 via-black/30 to-transparent" />

            {/* Counter */}
            <div className="absolute top-5 right-5 z-10 flex items-baseline gap-1 text-white">
              <span className="text-2xl font-bold tabular-nums leading-none">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-medium text-white/60 leading-none">
                / {String(services.length).padStart(2, "0")}
              </span>
            </div>

            {/* Caption (re-animates on each switch) */}
            <div
              key={activeTab}
              className="absolute inset-x-0 bottom-0 z-10 p-6 text-white animate-in fade-in slide-in-from-bottom-3 duration-500"
            >
              <span className="block text-[11px] font-semibold tracking-[0.25em] uppercase text-white/70">
                {currentService.number}
              </span>
              <h3 className="mt-1 text-3xl font-extrabold uppercase tracking-tight leading-none">
                {currentService.title}
              </h3>
              <span className="mt-1.5 block text-sm font-medium tracking-wide text-white/80 uppercase">
                {currentService.subtitle}
              </span>
            </div>
          </div>

          {/* Scroll-driven progress bar */}
          <div className="mt-5 h-1 w-full rounded-full bg-primary/10 overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full w-full origin-left scale-x-0 rounded-full bg-primary"
            />
          </div>

          {/* Segment labels */}
          <div className="mt-3 flex justify-between gap-2">
            {services.map((service, index) => (
              <span
                key={service.id}
                className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                  index === activeIndex ? "text-primary" : "text-primary/25"
                }`}
              >
                {service.number}
              </span>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default ServicesGrid;