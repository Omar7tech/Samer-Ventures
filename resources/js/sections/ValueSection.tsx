const ValueSection = () => {
  const services = [
    {
      title: 'Commercial\nGrowth Support',
      description:
        'we help businesses access professional business development, sales support, partnerships, and market insights through flexible outsourced solutions designed for growing companies and SMEs.',
    },
    {
      title: 'Outsourced Business\nDevelopment Engine',
      description:
        'access structured sales and business development support without the cost of hiring a full internal commercial department.',
    },
    {
      title: 'Built For SMEs &\nGrowing Businesses',
      description:
        'helping small and medium enterprises create partnerships, opportunities, and scalable business relationships.',
    },
    {
      title: 'Market Research &\nData Collection',
      description:
        'outsource surveys, customer feedback collection, and market insights to support smarter business and product decisions.',
    },
    {
      title: 'Sales Pitch Development\n& Team Support',
      description:
        'helping companies structure stronger sales presentations, improve communication, and support internal sales teams with strategic guidance.',
    },
    {
      title: 'Strategic Relationship\nBuilding',
      description:
        'create access to partnerships, networking opportunities, sponsorships, and business introductions that move your business forward.',
    },
  ]

  return (
    <section className='p-3 md:p-5 w-full relative overflow-visible'>
      <div className='mx-auto max-w-[1700px] px-6 py-10 md:px-20 lg:px-50 md:py-20 relative'>
        {/* Title: Left-aligned on mobile, centered on desktop */}
        <h2 className='text-3xl sm:text-4xl md:text-5xl font-black text-left md:text-center mb-12 md:mb-20 text-gray-300 tracking-tighter'>
          The Value Of Working With Us ?
        </h2>

        {/* Grid with automatic dividers every 3 items */}
        <div className='space-y-12 md:space-y-16 lg:space-y-20'>
          {Array.from({ length: Math.ceil(services.length / 3) }).map((_, rowIndex) => (
            <div key={rowIndex}>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16'>
                {services.slice(rowIndex * 3, (rowIndex + 1) * 3).map((service, index) => (
                  /* Left-aligned on mobile, centered on desktop */
                  <div key={index} className='text-left md:text-center space-y-4'>
                    <h3 className='text-xl sm:text-2xl font-black text-teal-800 whitespace-pre-line tracking-tighter leading-tight'>
                      {service.title}
                    </h3>
                    <p className='text-sm text-gray-400 leading-relaxed'>
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Horizontal Divider Line - hidden on mobile, block on desktop */}
              {rowIndex < Math.ceil(services.length / 3) - 1 && (
                <div className='hidden md:block w-full h-px bg-gray-300 mt-12 md:mt-16 lg:mt-20'></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ValueSection