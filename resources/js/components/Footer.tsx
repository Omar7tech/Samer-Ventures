import { Link } from '@inertiajs/react';
import Logo from './logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-primary text-white font-inter">
      <div className="max-w-[1700px] mx-auto px-6 md:px-20 lg:px-24 py-12 md:py-16">
        {/* Top Section - Tagline & Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 mb-16">
          {/* Tagline */}
          <div className="text-3xl md:text-4xl lg:text-5xl leading-none tracking-tighter">
            Business. Growth
            <br />
            & Sales
          </div>

          {/* Navigation Links - 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Home Column */}
            <div>
              <h3 className="text-lg md:text-2xl lg:text-3xl font-bold uppercase mb-6 tracking-wider">HOME</h3>
              <ul className="space-y-3 text-base md:text-lg font-light">
                <li><Link href="/#about" className="hover:opacity-70 transition-opacity">About</Link></li>
                <li><Link href="/#work" className="hover:opacity-70 transition-opacity">Work</Link></li>
                <li><Link href="/#clients" className="hover:opacity-70 transition-opacity">Clients</Link></li>
              </ul>
            </div>

            {/* Services Column */}
            <div>
              <h3 className="text-lg md:text-2xl lg:text-3xl font-bold uppercase mb-6 tracking-wider">SERVICES</h3>
              <ul className="space-y-3 text-base md:text-lg font-light">
                <li><Link href="/services" className="hover:opacity-70 transition-opacity">SV Growth</Link></li>
                <li><Link href="/services" className="hover:opacity-70 transition-opacity">SV Relations</Link></li>
                <li><Link href="/services" className="hover:opacity-70 transition-opacity">SV Insights</Link></li>
                <li><Link href="/services" className="hover:opacity-70 transition-opacity">SV Connect</Link></li>
                <li><Link href="/services" className="hover:opacity-70 transition-opacity">SV Pitch</Link></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="text-lg md:text-2xl lg:text-3xl font-bold uppercase mb-6 tracking-wider">CONTACT</h3>
              <ul className="space-y-3 text-base md:text-lg font-light">
                <li><a href="#" className="hover:opacity-70 transition-opacity">Whatsapp</a></li>
                <li><a href="#" className="hover:opacity-70 transition-opacity">Instagram</a></li>
                <li><a href="#" className="hover:opacity-70 transition-opacity">LinkedIn</a></li>
                <li><a href="#" className="hover:opacity-70 transition-opacity">Email</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Middle Section - Logo & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mb-16 pb-16 border-b border-white/20">
          {/* Logo */}
          <div>
            <Logo isWhite layout="horizontal" size="full" />
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold uppercase mb-6 tracking-tight">LET'S TALK BUSINESS</h3>
            <form className="flex gap-3">
              <input
                type="email"
                placeholder="your email"
                className="flex-1 px-6 py-4 rounded-full bg-primary-dark/30 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-full bg-white/20 text-white font-bold uppercase tracking-wider hover:bg-white/30 transition-colors"
              >
                GROW
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="text-center text-sm md:text-base font-light opacity-80">
          <p>© {currentYear} Samer Ventures. All Rights Reserved.</p>
          <p className="mt-1">
            Crafted By <a href="https://yamencreates.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">YamenCreates®</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
