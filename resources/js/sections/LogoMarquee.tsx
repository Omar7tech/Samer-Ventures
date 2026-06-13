import { useEffect, useMemo, useRef, useState } from "react";
import type { ClientLogo } from "@/types";

interface LogoMarqueeProps {
  logos?: ClientLogo[];
  duration?: number;
  pauseOnHover?: boolean;
}

const LogoMarquee = ({
  logos = [],
  duration = 30,
  pauseOnHover = true,
}: LogoMarqueeProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sequenceRef = useRef<HTMLDivElement | null>(null);

  const [sequenceWidth, setSequenceWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const container = containerRef.current;
    const sequence = sequenceRef.current;

    if (!container || !sequence) {
      return;
    }

    const update = () => {
      const cw = container.getBoundingClientRect().width;
      const sw = sequence.getBoundingClientRect().width;

      if (Number.isFinite(cw)) {
        setContainerWidth(Math.ceil(cw));
      }

      if (Number.isFinite(sw)) {
        setSequenceWidth(Math.ceil(sw));
      }
    };

    update();

    if (!("ResizeObserver" in window)) {
      const w = window as unknown as Window;
      w.addEventListener("resize", update);

      return () => w.removeEventListener("resize", update);
    }

    const ro = new ResizeObserver(update);
    ro.observe(container);
    ro.observe(sequence);

    return () => ro.disconnect();
  }, [logos]);

  const copies = useMemo(() => {
    if (sequenceWidth <= 0 || containerWidth <= 0) {
      return 2;
    }

    const minCopiesToFill = Math.ceil(containerWidth / sequenceWidth);

    return Math.max(2, minCopiesToFill + 2);
  }, [sequenceWidth, containerWidth]);

  const sequences = useMemo(
    () => Array.from({ length: copies }, (_, i) => i),
    [copies],
  );

  if (!logos || logos.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-5 bg-white max-w-[1700px] mx-auto">
      <div className="relative before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-32 md:before:w-48 before:bg-linear-to-r before:from-white before:to-transparent before:content-[''] after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-32 md:after:w-48 after:bg-linear-to-l after:from-white after:to-transparent after:content-['']">
        <div
          ref={containerRef}
          className={`logo-marquee ${pauseOnHover ? "logo-marquee--pause" : ""}`}
          aria-label="Client logos"
          style={
            {
              "--logo-marquee-gap": "32px",
              "--logo-marquee-duration": `${duration}s`,
              "--logo-marquee-distance":
                sequenceWidth > 0 ? `${sequenceWidth}px` : undefined,
            } as React.CSSProperties
          }
        >
          <div className="logo-marquee__track" aria-hidden>
            {sequences.map((seqIndex) => (
              <div
                key={seqIndex}
                ref={seqIndex === 0 ? sequenceRef : undefined}
                className="logo-marquee__sequence"
                role="presentation"
              >
                {logos.map((logo) => (
                  <div key={logo.id} className="logo-marquee__item">
                    <img
                      src={logo.src}
                      alt="Partner logo"
                      className="h-12 md:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
