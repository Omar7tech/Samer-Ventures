import { useGSAP } from "@gsap/react"
import { Link } from "@inertiajs/react"
import { gsap } from "gsap"
import { useRef, useState } from "react"

const mobileLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/blogs", label: "Blogs" },
]

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const hasOpened = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Park the panel offscreen and unfocusable before first paint
      gsap.set(".menu-panel", { yPercent: -100, autoAlpha: 0 })

      gsap.from(".nav-bar", { y: -24, opacity: 0, duration: 0.6, ease: "power3.out", delay: 0.15 })

      return () => {
        document.body.style.overflow = ""
      }
    },
    { scope: containerRef }
  )

  useGSAP(
    () => {
      const panel = ".menu-panel"
      const rows = ".menu-row"
      const dividers = ".menu-divider"
      const footerItems = ".menu-foot"
      const watermark = ".menu-mark"
      const burgerLines = ".burger-line"

      if (isMenuOpen) {
        hasOpened.current = true
        document.body.style.overflow = "hidden"

        // Stage content below its overflow-hidden masks
        gsap.set(rows, { yPercent: 110 })
        gsap.set(dividers, { scaleX: 0, transformOrigin: "left center" })
        gsap.set(footerItems, { opacity: 0, y: 16 })
        gsap.set(watermark, { opacity: 0 })

        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .set(panel, { autoAlpha: 1 })
          .to(panel, { yPercent: 0, duration: 0.65, ease: "expo.inOut" })
          .to(rows, { yPercent: 0, duration: 0.6, stagger: 0.08 }, "-=0.25")
          .to(dividers, { scaleX: 1, duration: 0.7, stagger: 0.08 }, "<")
          .to(footerItems, { opacity: 1, y: 0, duration: 0.45, stagger: 0.06 }, "-=0.5")
          .to(watermark, { opacity: 0.1, duration: 0.5 }, "-=0.4")

        gsap.to(burgerLines, {
          rotation: (index) => (index === 0 ? 45 : -45),
          y: (index) => (index === 0 ? 3.25 : -3.25),
          duration: 0.4,
          ease: "power3.inOut",
        })
      } else if (hasOpened.current) {
        gsap
          .timeline({
            defaults: { ease: "power2.in" },
            onComplete: () => {
              document.body.style.overflow = ""
            },
          })
          .to(watermark, { opacity: 0, duration: 0.2 })
          .to(footerItems, { opacity: 0, y: 10, duration: 0.2 }, "<")
          .to(rows, { yPercent: -110, duration: 0.3, stagger: { each: 0.04, from: "end" } }, "<")
          .to(panel, { yPercent: -100, duration: 0.55, ease: "expo.inOut" }, "-=0.15")
          .set(panel, { autoAlpha: 0 })

        gsap.to(burgerLines, {
          rotation: 0,
          y: 0,
          duration: 0.4,
          ease: "power3.inOut",
        })
      }
    },
    { scope: containerRef, dependencies: [isMenuOpen] }
  )

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <div ref={containerRef}>
      {/* Desktop Navigation */}
      <div className="mx-auto hidden max-w-[1700px] items-start justify-between gap-2 px-6 py-15 text-primary md:px-10 lg:flex lg:px-20">
        <img src="/logo/sv-logo.svg" alt="Samer Ventures" className="h-15" />
        <div className="text-2xl leading-none">
          Business. Growth
          <br />
          & Sales
        </div>

        <div className="flex flex-col gap-3 text-2xl font-normal uppercase">
          <Link href="/" className="cursor-pointer transition-opacity hover:opacity-70">Home</Link>
          <Link href="/services" className="cursor-pointer transition-opacity hover:opacity-70">Services</Link>
          <Link href="/blogs" className="cursor-pointer transition-opacity hover:opacity-70">Blogs</Link>
        </div>

        <Link href="/contact" className="rounded-full bg-primary px-10 py-4 text-xl font-semibold uppercase tracking-wider text-white transition-transform hover:scale-105">
          Book Your Call
        </Link>
      </div>

      {/* Mobile Top Bar — stays on top, panel emerges from underneath it */}
      <div className="fixed left-0 right-0 top-0 z-[70] px-4 pt-4 lg:hidden">
        <div className="nav-bar flex items-center justify-between rounded-full border border-primary/10 bg-white/85 py-2.5 pl-5 pr-2.5 backdrop-blur-xl">
          <Link href="/" aria-label="Samer Ventures home" onClick={closeMenu}>
            <img src="/logo/sv-logo.svg" alt="Samer Ventures" className="h-9" />
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 active:scale-90 ${
              isMenuOpen ? "bg-white ring-1 ring-primary/15" : "bg-primary"
            }`}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <span className="flex flex-col gap-[5px]">
              <span className={`burger-line h-[1.5px] w-5 rounded-full transition-colors duration-300 ${isMenuOpen ? "bg-primary" : "bg-white"}`} />
              <span className={`burger-line h-[1.5px] w-5 rounded-full transition-colors duration-300 ${isMenuOpen ? "bg-primary" : "bg-white"}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Menu */}
      <div className="menu-panel invisible fixed inset-0 z-[60] flex flex-col overflow-hidden bg-primary pt-24 lg:hidden">
        {/* Watermark */}
        <img
          src="/logo/sv-icon.svg"
          alt=""
          aria-hidden="true"
          className="menu-mark pointer-events-none absolute -bottom-12 -right-12 w-72 opacity-10 brightness-0 invert"
        />

        <nav className="relative z-10 flex flex-1 flex-col justify-center px-6">
          {mobileLinks.map((link, index) => (
            <div key={link.href}>
              <div className="menu-divider h-px bg-white/15" />
              <div className="overflow-hidden">
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="menu-row flex items-baseline gap-4 py-5"
                >
                  <span className="font-mono text-sm text-white/40">0{index + 1}</span>
                  <span className="text-5xl font-bold uppercase tracking-tight text-white">
                    {link.label}
                  </span>
                </Link>
              </div>
            </div>
          ))}
          <div className="menu-divider h-px bg-white/15" />
        </nav>

        <div className="relative z-10 px-6 pb-10">
          <div className="menu-foot text-sm uppercase tracking-widest text-white/50">
            Business. Growth & Sales
          </div>
          <Link
            href="/contact"
            onClick={closeMenu}
            className="menu-foot mt-4 block w-full rounded-full bg-white px-8 py-4 text-center text-lg font-semibold uppercase tracking-wider text-primary"
          >
            Book Your Call
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Nav
