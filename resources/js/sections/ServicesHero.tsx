const ServicesHero = () => {
  return (
    <section className="w-full min-h-[60vh] flex items-center justify-center py-16 px-6 md:px-16 lg:px-32 font-inter">
      <div className="max-w-[1400px] w-full flex flex-col items-end">
        
        {/* Row 1: The Grid split between the Label and the first line of text */}
        <div className="w-full grid grid-cols-[auto_1fr] items-start border-b-0 pb-1">
          {/* Left Side: Label */}
          <div className="text-primary text-sm md:text-xl font-bold tracking-wider uppercase pt-3 md:pt-4">
            [PICK YOUR NEXT MOVE]
          </div>
          
          {/* Right Side: First Line Only */}
          <div className="text-right">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal text-primary tracking-widest">
              STRATEGIC <span className="underline decoration-1 md:decoration-2 underline-offset-10 md:underline-offset-16">GROWTH</span>
            </h1>
          </div>
        </div>

        {/* Row 2: The remaining text aligned perfectly underneath the first row */}
        <div className="text-right mt-1 md:mt-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal text-primary leading-[1.2] md:leading-[1.15] tracking-widest">
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