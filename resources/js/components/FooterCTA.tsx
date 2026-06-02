import { motion } from 'framer-motion';

const FooterCTA = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-white font-sans">
      <div className="flex items-center justify-center">
        <motion.a
          href="/contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block bg-primary text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold px-12 sm:px-16 md:px-24 lg:px-32 py-6 sm:py-8 md:py-10 rounded-full hover:bg-primary/90 transition-colors uppercase tracking-tighter"
        >
          LET'S TALK BUSINESS
        </motion.a>
      </div>
    </section>
  );
};

export default FooterCTA;
