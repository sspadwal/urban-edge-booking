import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Scissors, User, Calendar, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import BookingModal from "./BookingModal";
import { UserButton, SignInButton, useAuth, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const { isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const location = useLocation();

  // Sync user to database on login
  useEffect(() => {
    const syncUser = async () => {
      if (isSignedIn && user) {
        try {
          const token = await getToken();
          await fetch(`${import.meta.env.VITE_API_URL}/api/users/register`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          console.error("Failed to sync user:", error);
        }
      }
    };

    syncUser();
  }, [isSignedIn, user, getToken]);

  // Update active link based on current route
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    // { name: "Barbers", path: "/barbers" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  if (isSignedIn) {
    navItems.push({ name: "My Bookings", path: "/my-bookings" });
  }

  if (isSignedIn && user?.primaryEmailAddress?.emailAddress === import.meta.env.VITE_ADMIN_EMAIL) {
    navItems.push({ name: "Admin", path: "/admin" });
    navItems.push({ name: "Bookings", path: "/admin/bookings" });
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <>
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-neutral-900/80 backdrop-blur-md border-b border-white/5 py-3 md:py-4"
          : "bg-transparent py-4 md:py-6"
          }`}
      >
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative h-20 md:h-24 w-auto flex items-center justify-center transform scale-125 group-hover:scale-135 transition-transform duration-300">
                <img
                  src="/logo.png"
                  alt="Urban Edge Logo"
                  className="h-full w-auto object-contain filter drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                />
              </div>
            </Link>

            {/* Desktop Navigation - Glass Pill */}
            <div className="hidden xl:block absolute left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-1 px-2 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setActiveLink(item.path)}
                    className={`relative px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${activeLink === item.path
                      ? "text-neutral-900"
                      : "text-neutral-400 hover:text-white"
                      }`}
                  >
                    {activeLink === item.path && (
                      <motion.div
                        layoutId="navPill"
                        className="absolute inset-0 bg-amber-500 rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Section - Buttons */}
            <div className="hidden xl:flex items-center gap-4">
              {isSignedIn && (
                <UserButton />
              )}

              <motion.div
                className="relative group"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Neon Glow & Rotating Border */}
                <motion.div
                  className="absolute -inset-1 rounded-full opacity-75 blur-md group-hover:opacity-100 transition duration-200"
                  style={{
                    background: "linear-gradient(90deg, #f59e0b, #fbbf24, #d97706, #f59e0b)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "200% 0%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Button */}
                <motion.button
                  onClick={() => setIsBookingModalOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-8 py-3 rounded-full bg-neutral-900 border border-amber-500/50 flex items-center gap-3 z-10 shadow-xl"
                >
                  <span className="font-black text-amber-400 tracking-wider text-sm">BOOK NOW</span>
                  <motion.div
                    animate={{
                      y: [0, -3, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Calendar className="w-4 h-4 text-amber-400" />
                  </motion.div>
                </motion.button>
              </motion.div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="xl:hidden p-2 text-white hover:text-amber-500 transition-colors"
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </nav >

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm xl:hidden"
            />

            {/* Side Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-[61] w-full sm:w-96 bg-neutral-900 border-l border-white/10 shadow-2xl xl:hidden flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <span className="text-lg font-bold text-white tracking-wider">MENU</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-neutral-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex-1 overflow-y-auto py-8 px-6 space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.1 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-3 text-2xl font-bold tracking-tight rounded-xl transition-all duration-300 ${activeLink === item.path
                        ? "text-amber-500 bg-amber-500/10 pl-6"
                        : "text-neutral-400 hover:text-white hover:bg-white/5 hover:pl-6"
                        }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-white/5 space-y-6 bg-neutral-900/50">
                <div className="flex items-center justify-between px-2">
                  <span className="text-neutral-400 font-medium text-sm">Account</span>
                  {isSignedIn && (
                    <UserButton />
                  )}
                </div>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsBookingModalOpen(true);
                  }}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-900 font-black text-lg rounded-xl flex items-center justify-center gap-2 hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20"
                >
                  <span>BOOK NOW</span>
                  <Calendar className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
