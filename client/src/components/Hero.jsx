import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import HeroGallery from "./HeroGallery";
import BookingModal from "./BookingModal";
import FloatingTools from "./FloatingTools";

const Hero = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
      <div className="relative w-full min-h-screen bg-black overflow-hidden flex items-start pt-32 lg:items-center lg:pt-0">
        {/* Background Image with Ken Burns Effect */}
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            className="w-full h-full"
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: "url(/images/hero-bg.jpg)",
              }}
            />
          </motion.div>
          {/* Heavy Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent/20" />

          {/* Animated Background Tools */}
          <FloatingTools />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Kicker */}
              <motion.p
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-amber-500 font-bold tracking-[0.5em] text-sm sm:text-base uppercase mb-4 pl-1"
              >
                Experience
              </motion.p>

              {/* Main Headline */}
              <div className="space-y-2">
                <motion.h1
                  initial={{ opacity: 0, filter: "blur(15px)", y: 20 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
                  className="text-4xl sm:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-500 to-amber-700 tracking-tighter leading-[0.9]"
                >
                  URBAN
                </motion.h1>
                <motion.h1
                  initial={{ opacity: 0, filter: "blur(15px)", y: 20 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
                  className="text-4xl sm:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9]"
                >
                  LUXURY
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, filter: "blur(5px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-lg sm:text-xl text-neutral-400 max-w-lg leading-relaxed font-light pl-1"
              >
                Experience the perfect blend of traditional barbering and modern
                styling. Where precision meets luxury for the ultimate grooming
                experience.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="flex flex-row gap-3 pt-4"
              >
                <motion.button
                  onClick={() => setIsBookingModalOpen(true)}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(245, 158, 11, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex-1 sm:flex-none px-4 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-amber-500 to-amber-600 font-bold text-sm sm:text-lg rounded-full shadow-lg shadow-amber-500/20 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>BOOK NOW</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 sm:flex-none px-4 py-3 sm:px-8 sm:py-4 bg-white/5 backdrop-blur-sm border border-white/20 text-white font-bold text-sm sm:text-lg rounded-full hover:border-white/40 transition-all duration-300 text-center"
                >
                  <span>
                    VIEW SERVICES
                  </span>
                </motion.button>
              </motion.div>

              {/* Stats / Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="pt-2 flex items-center gap-15 border-t border-white/10"
              >
                <div>
                  <p className="text-3xl font-bold text-white">5k+</p>
                  <p className="text-sm text-neutral-400 uppercase tracking-wider">
                    Happy Clients
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">4.9</p>
                  <p className="text-sm text-neutral-400 uppercase tracking-wider">
                    Rating
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">10+</p>
                  <p className="text-sm text-neutral-400 uppercase tracking-wider">
                    Years Exp.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Interactive Gallery */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              className="hidden lg:block relative w-full h-full"
            >
              <HeroGallery />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
