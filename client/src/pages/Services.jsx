import React, { useState } from "react";
import ServicesShowcase from "../components/ServicesShowcase";
import BookingModal from "../components/BookingModal";
import { motion } from "framer-motion";

const Services = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
      <div className="pt-24 bg-black min-h-screen">
        <ServicesShowcase />

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-neutral-900/50" />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-5xl font-black text-white mb-8"
            >
              READY FOR A <span className="text-amber-500">TRANSFORMATION?</span>
            </motion.h2>
            <motion.button
              onClick={() => setIsBookingModalOpen(true)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-900 font-black text-lg rounded-full hover:from-amber-400 hover:to-amber-500 transition-all shadow-xl shadow-amber-500/20"
            >
              BOOK APPOINTMENT
            </motion.button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;
