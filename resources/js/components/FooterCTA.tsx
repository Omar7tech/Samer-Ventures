import { motion } from 'framer-motion';
import { InteractiveGrid } from '@/components/ui/interactive-grid';

const FooterCTA = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-white font-sans">
      <InteractiveGrid />
      <div className="pointer-events-none relative z-10 flex min-h-screen items-center justify-center px-5">
        <motion.a
          href="/contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="pointer-events-auto inline-block w-full max-w-md text-center sm:w-auto sm:max-w-none bg-primary text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold px-8 sm:px-16 md:px-24 lg:px-32 py-5 sm:py-8 md:py-10 rounded-full hover:bg-primary/90 transition-colors uppercase tracking-tighter"
        >
          LET'S TALK BUSINESS
        </motion.a>
      </div>
    </section>
  );
};

export default FooterCTA;
