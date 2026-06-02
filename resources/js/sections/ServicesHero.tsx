const ServicesHero = () => {
  return (
    <section className="w-full min-h-[60vh] flex items-center justify-center py-12 md:py-16 px-6 md:px-16 lg:px-32 font-inter">
      <div className="max-w-[1400px] w-full flex flex-col items-stretch lg:items-end">
        
        {/* Row 1 Container: Normal column block on mobile/tablet, switches to a split Grid on desktop */}
        <div className="w-full flex flex-col lg:grid lg:grid-cols-[auto_1fr] lg:items-start pb-1">
          
          {/* Left Side: Label - Left-aligned on mobile/tablet, snaps to left side of grid on desktop */}
          <div className="text-primary text-xs md:text-sm lg:text-xl font-bold tracking-wider uppercase mb-6 lg:mb-0 text-left">
            [PICK YOUR NEXT MOVE]
          </div>
          
          {/* Right Side: First Line - Left-aligned on mobile/tablet, right-aligned on desktop */}
          <div className="text-left lg:text-right">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal text-primary tracking-wider lg:tracking-widest leading-tight lg:leading-none">
              STRATEGIC <span className="underline decoration-1 md:decoration-2 underline-offset-8 md:underline-offset-10 lg:underline-offset-16">GROWTH</span>
            </h1>
          </div>
        </div>

        {/* Row 2 Container: Sits normally underneath. Left-aligned on mobile, right-aligned on desktop */}
        <div className="text-left lg:text-right mt-2 lg:mt-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal text-primary leading-[1.2] lg:leading-[1.15] tracking-wider lg:tracking-widest">
            SOLUTIONS FOR GROWING
            <br className="hidden sm:inline" />
            BUSINESSES
          </h1>
        </div>

      </div>
    </section>
  );
};

export default ServicesHero;