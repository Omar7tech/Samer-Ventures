import { useState, useEffect } from "react";

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

  // Preload all images on mount
  useEffect(() => {
    services.forEach((service) => {
      const img = new Image();
      img.src = service.image;
    });
  }, []);

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
    <section className="w-full bg-white py-16 px-6 md:px-16 lg:px-32 font-inter">
      <div className="max-w-[1400px] mx-auto">

        {/* Top Header Row - Normal Flex Layout */}
        <div className="w-full flex flex-col items-start mb-12">

          {/* Wrapper to align Headline and Label side-by-side on desktop */}
          <div className="w-full flex flex-col lg:flex-row lg:items-start">

            {/* Left Portion: Main Title Block */}
            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-primary tracking-tighter leading-[1.05] max-w-md order-2 lg:order-1">
              How We Grow <br />Your Business
            </h2>

            {/* Right Portion: Services Label - Shifted upwards with a negative margin */}
            <div className="order-1 lg:order-2 mb-2 lg:mb-0 lg:ml-6 lg:-mt-5 pt-0">
              <span className="text-sm sm:text-md md:text-lg font-extrabold tracking-wider uppercase text-primary">
                SERVICES
              </span>
            </div>

          </div>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_2fr] gap-12 lg:gap-16 items-start">

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
                  {/* Left Indicator Line */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary h-full" />
                  )}

                  {/* Tab Numbers */}
                  <span className={`text-sm md:text-base font-medium tracking-tight pl-3 min-w-[35px] ${isActive ? "text-primary/70" : "text-primary"}`}>
                    {service.number}
                  </span>

                  {/* Tab Labels */}
                  <div className="flex flex-col leading-tight">
                    <span className="text-lg md:text-xl lg:text-2xl font-extrabold tracking-wider uppercase text-primary">
                      {service.title}
                    </span>
                    <span className="text-xs md:text-sm font-medium text-primary/80 tracking-wide mt-0.5">
                      {service.subtitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Display Card Asset Showcase */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[1.45/1] rounded-[32px] overflow-hidden bg-[#EBF0F3] transition-all duration-500">

            {/* Loading State */}
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#EBF0F3] z-20">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              </div>
            )}

            {/* The Visual Image Asset - Full Container */}
            <img
              src={currentService.image}
              alt=""
              onLoad={handleImageLoad}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out hover:scale-105 ${
                isImageLoading ? 'opacity-0' : 'opacity-100'
              }`}
            />

            {/* Floating Top Right Content Badge - Overlaid */}
            <div className="absolute top-6 right-6 md:top-8 md:right-8 z-10">
              <div className="flex items-start gap-3 text-right">
                <div className="flex flex-col leading-none">
                  <span className="text-xs md:text-sm font-bold tracking-wider text-primary uppercase">
                    {currentService.title}
                  </span>
                  <span className="text-[10px] font-semibold text-primary/70 tracking-widest uppercase mt-1">
                    {currentService.subtitle}
                  </span>
                </div>
                <span className="text-xs md:text-sm font-medium text-primary/70">
                  {currentService.number}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ServicesGrid;