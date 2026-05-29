import { motion } from 'framer-motion';

const SmallSentence = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }} // Premium cubic-bezier ease
      className='text-center text-xs sm:text-sm max-w-3xl mx-auto py-8 md:py-15 px-6 md:px-0 text-black leading-relaxed font-inter'
    >
      Samer Ventures combines years of experience in sales, customer relations, and business communication across
      insurance, automotive, enterprise services, and client-facing industries — helping businesses create stronger
      partnerships, better opportunities, and structured commercial growth.
    </motion.div>
  );
};

export default SmallSentence;