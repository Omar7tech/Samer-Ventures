const LogoDecorative = () => {
  return (
    <section className="relative w-full h-32 md:h-48 lg:h-64 overflow-hidden">
      <div className="absolute -left-32 md:-left-48 lg:-left-64 top-1/2 -translate-y-1/2">
        <img
          src="/logo/small-on-light.png"
          alt=""
          className="w-64 md:w-96 lg:w-[32rem] opacity-10 grayscale"
          aria-hidden="true"
        />
      </div>
    </section>
  );
};

export default LogoDecorative;
