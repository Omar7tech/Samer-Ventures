const ExperienceSection = () => {
  return (
    <section className='p-3 md:p-5 w-full'>
      <div className='mx-auto max-w-[1700px] px-6 py-5 md:px-20 lg:px-24'>
        <div
          className='relative overflow-hidden rounded-2xl md:rounded-4xl shadow-2xl bg-cover bg-top h-[280px] md:h-[350px] transition-all duration-300 ease-in-out'
          style={{ backgroundImage: 'url(/images/experience.jpg)' }}
        >
          {/* Dark Overlay */}
          <div className='absolute inset-0 bg-black/50'></div>

          {/* Text Content - Left Bottom Corner */}
          <div className='relative h-full flex items-end p-6 md:p-10 lg:p-12'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-wide leading-tight uppercase'>
              Built On Experience.
              <br />
              Driven By Relationships.
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
