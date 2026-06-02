const ServicesHero = () => {
  return (
    <section className="w-full min-h-[60vh] flex items-center justify-center py-16 px-6 md:px-16 lg:px-32 font-inter">
      <div className="max-w-[1400px] w-full flex flex-col items-stretch lg:items-end">
        
        {/* Row 1: The Grid split between the Label and the first line of text */}
        <div className="w-full flex flex-col lg:grid lg:grid-cols-[auto_1fr] lg:items-start border-b-0 pb-1">
          {/* Left Side: Label */}
          <div className="text-primary text-sm md:text-xl font-bold tracking-wider uppercase pt-0 mb-4 lg:mb-0 text-left">
            [PICK YOUR NEXT MOVE]
          </div>
          
          {/* Right Side: First Line Only */}
          <div className="text-left lg:text-right">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal text-primary tracking-wider lg:tracking-widest leading-[1.25] lg:leading-none">
              STRATEGIC <span className="underline decoration-1 md:decoration-2 underline-offset-10 md:underline-offset-16">GROWTH</span>
            </h1>
          </div>
        </div>

        {/* Row 2: The remaining text aligned perfectly underneath the first row */}
        <div className="text-left lg:text-right mt-0 lg:mt-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal text-primary leading-[1.25] lg:leading-[1.15] tracking-wider lg:tracking-widest">
            SOLUTIONS FOR GROWING
            <br />
            BUSINESSES
          </h1>
        </div>

      </div>
    </section>
  );
};

export default ServicesHero;