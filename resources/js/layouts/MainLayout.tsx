import type { ReactNode } from 'react';
import Footer from '@/components/Footer';
import FooterCTA from '@/components/FooterCTA';
import Nav from '@/components/Nav';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Nav />
      <div className="mt-30 lg:mt-0">
        {children}
      </div>
      <FooterCTA />
      <Footer />
    </>
  );
}
