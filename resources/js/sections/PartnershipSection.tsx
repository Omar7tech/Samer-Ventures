import { motion } from 'framer-motion';

const HighlightedText = ({ children }: { children: React.ReactNode }) => (
  <span className="text-primary font-medium underline decoration-2 underline-offset-[6px] md:underline-offset-8 tracking-normal inline">
    {children}
  </span>
);

const PartnershipSection = () => {
  return (
    <section className="p-3 md:p-5 w-full font-inter">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }}
        className='text-lg sm:text-2xl md:text-[40px] font-medium leading-[1.3] md:leading-[1.2] tracking-tight sm:tracking-wide md:tracking-widest  mx-auto max-w-[1700px] px-2 py-2 md:px-20 lg:px-24 md:text-base lg:text-3xl md:py-16  text-black font-inter'
      >
        Samer Ventures works alongside <HighlightedText>GrownBusinesses</HighlightedText> and <HighlightedText>EnabledOrganizations</HighlightedText> that need help creating strategic commercial relationships, business development support, and strategic growth opportunities. From <HighlightedText>SMEs</HighlightedText> and <HighlightedText>Startups</HighlightedText> to agencies, architecture and real estate firms, healthcare providers, service companies, and beyond—we help businesses of all sizes build stronger commercial partnerships, access new opportunities, and create sustainable growth through partnership-driven commerce.
      </motion.div>
    </section>
  );
};

export default PartnershipSection;
