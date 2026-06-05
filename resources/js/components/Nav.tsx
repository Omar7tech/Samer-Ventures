import { useGSAP } from "@gsap/react"
import { Link } from "@inertiajs/react"
import { gsap } from "gsap"
import { useRef, useState } from "react"
import Logo from "./logo"

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Scoped class selectors for clean state transitions
      const overlay = ".menu-overlay"
      const menuContent = ".menu-content"
      const items = ".menu-item"
      const burgerLines = ".burger-line"

      if (isMenuOpen) {
        document.body.style.overflow = "hidden"

        // Setup clear initial frames
        gsap.set(overlay, { display: "block" })
        gsap.set(items, { opacity: 0, y: 12 })

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" }, // Smooth, professional easing curve
        })

        tl.to(overlay, {
          opacity: 1,
          duration: 0.35,
        })
        .to(
          menuContent,
          {
            height: "auto",
            duration: 0.55,
          },
          "-=0.25" // Starts the height slightly earlier
        )
        .to(
          items,
          {
            y: 0,
            opacity: 1,
            stagger: 0.02, // <-- FASTER STAGGER
            duration: 0.25, // <-- FASTER DURATION
          },
          "<0.1" // Starts exactly 0.1s after the menuContent starts opening
        )

        // Burger transformations
        gsap.to(burgerLines, {
          rotation: (index) => (index === 0 ? 45 : -45),
          y: (index) => (index === 0 ? 4 : -4), // Centered cleanly on its core axis
          duration: 0.35,
          ease: "power2.inOut",
        })
      } else {
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          onComplete: () => {
            document.body.style.overflow = ""
            gsap.set(overlay, { display: "none" })
          },
        })

        tl.to(items, {
          y: 10,
          opacity: 0,
          stagger: { each: 0.03, from: "end" }, // Reverse cascade on close
          duration: 0.25,
        })
        .to(
          menuContent,
          { 
            height: 0, 
            duration: 0.35 
          },
          "<0.1" // Starts closing the height immediately after the items start fading
        )
        .to(
          overlay, 
          { 
            opacity: 0, 
            duration: 0.25 
          },
          "-=0.2"
        )

        gsap.to(burgerLines, {
          rotation: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.inOut",
        })
      }
    },
    { scope: containerRef, dependencies: [isMenuOpen] }
  )

  return (
    <div ref={containerRef}>
      {/* Desktop Navigation */}
      <div className="mx-auto hidden max-w-[1700px] items-start justify-between gap-2 px-20 py-15 text-primary lg:flex">
        <Logo />
        <div className="text-2xl leading-none">
          Business. Growth
          <br />
          & Sales
        </div>

        <div className="flex flex-col gap-3 text-2xl font-normal uppercase">
          <Link href="/" className="cursor-pointer transition-opacity hover:opacity-70">Home</Link>
          <Link href="/services" className="cursor-pointer transition-opacity hover:opacity-70">Services</Link>
          <Link href="/contact" className="cursor-pointer transition-opacity hover:opacity-70">Contact</Link>
        </div>

        <button className="rounded-full bg-primary px-10 py-4 text-xl font-semibold uppercase tracking-wider text-white transition-transform hover:scale-105">
          Book Your Call
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed inset-x-0 top-0 z-50 mx-4 mt-4 lg:hidden">
        <div className="overflow-hidden rounded-2xl bg-white/90 shadow-lg shadow-primary/5 backdrop-blur-xl">
          <div className="flex items-center justify-between px-5 py-4">
            <Logo size="sm" />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group relative flex h-11 w-11 items-center justify-center transition-all active:scale-95"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-[6px]">
                <div className="burger-line h-[1.5px] w-6 rounded-full bg-primary" />
                <div className="burger-line h-[1.5px] w-6 rounded-full bg-primary" />
              </div>
            </button>
          </div>

          {/* ANIMATED BOX: Height moves seamlessly from 0 to 'auto'. 
            Padding is strictly managed by structural margins/padding inside the elements, 
            eliminating layout snap bottlenecks.
          */}
          <div className="menu-content h-0 overflow-hidden px-5">
            <div className="border-t border-primary/10" />

            <div className="menu-item pt-5 text-lg leading-tight text-primary/70">
              Business. Growth & Sales
            </div>

            <div className="mt-5 flex flex-col gap-1">
              <Link href="/" className="menu-item cursor-pointer rounded-xl px-4 py-3 text-xl font-medium uppercase text-primary transition-all hover:bg-primary/5">
                Home
              </Link>
              <Link href="/services" className="menu-item cursor-pointer rounded-xl px-4 py-3 text-xl font-medium uppercase text-primary transition-all hover:bg-primary/5">
                Services
              </Link>
              <Link href="/contact" className="menu-item cursor-pointer rounded-xl px-4 py-3 text-xl font-medium uppercase text-primary transition-all hover:bg-primary/5">
                Contact
              </Link>
            </div>

            <button className="menu-item mb-5 mt-4 w-full rounded-2xl bg-primary px-8 py-4 text-lg font-semibold uppercase tracking-wider text-white shadow-lg shadow-primary/20">
              Book Your Call
            </button>
          </div>
        </div>
      </div>

      {/* Overlay Background */}
      <div
        className="menu-overlay fixed inset-0 z-40 hidden bg-black/20 backdrop-blur-sm lg:hidden"
        onClick={() => setIsMenuOpen(false)}
      />
    </div>
  )
}

export default Nav