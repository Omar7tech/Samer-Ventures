import { Marquee } from "@/components/shadcn-space/animations/marquee";

interface Logo {
  src: string;
  link?: string;
  alt?: string;
}

interface LogoMarqueeProps {
  logos?: Logo[];
  duration?: number;
  pauseOnHover?: boolean;
}

const LogoMarquee = ({
  logos = [],
  duration = 30,
  pauseOnHover = true,
}: LogoMarqueeProps) => {
  if (!logos || logos.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-5 bg-white max-w-[1700px] mx-auto">
      <div className="relative before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-32 md:before:w-48 before:bg-linear-to-r before:from-white before:to-transparent before:content-[''] after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-32 md:after:w-48 after:bg-linear-to-l after:from-white after:to-transparent after:content-['']">
        <Marquee
          className="p-0"
          pauseOnHover={pauseOnHover}
          style={{ '--duration': `${duration}s` } as React.CSSProperties}
        >
          {logos.map((logo, index) => (
            <div key={index} className="flex-none">
              {logo.link ? (
                <a
                  href={logo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt || "Partner logo"}
                    className="h-12 md:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 mx-4 md:mx-10"
                  />
                </a>
              ) : (
                <img
                  src={logo.src}
                  alt={logo.alt || "Partner logo"}
                  className="h-12 md:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 mx-4 md:mx-10"
                />
              )}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default LogoMarquee;
