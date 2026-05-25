const HeroSection = () => {
  return (
    <div className="p-5 relative">
      <img className="w-full aspect-video min-h-[600px] h-[calc(100vh-4rem)] rounded-3xl object-cover" src="/hero-bg.jpg" alt="" />
      <div className="absolute inset-0 flex items-center px-32">
        <h1 className="text-white text-8xl font-extrabold leading-tight tracking-wider">
          WE ARE YOUR<br />
          SALES & BUSINESS<br />
          VENTURES
        </h1>
      </div>
    </div>
  )
}

export default HeroSection