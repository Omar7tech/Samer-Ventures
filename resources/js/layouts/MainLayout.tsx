import Nav from '@/components/Nav';
import { ReactNode } from 'react';

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
    </>
  );
}
