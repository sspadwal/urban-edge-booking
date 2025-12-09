import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaFacebookF />, href: "#", label: "Facebook" },
    { icon: <FaInstagram />, href: "#", label: "Instagram" },
    { icon: <FaTwitter />, href: "#", label: "Twitter" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    "Classic Haircut",
    "Beard Trim",
    "Hot Towel Shave",
    "Hair Styling",
  ];

  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-neutral-900">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <img
              src="/logo.png"
              alt="Urban Edge Logo"
              className="h-40 w-auto mb-6 object-contain mx-auto md:mx-0"
            />
            <p className="text-neutral-400 mb-8 leading-relaxed">
              Elevating men's grooming with precision, style, and a touch of luxury. Experience the art of barbering redefined.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ y: -5, color: "#f59e0b" }}
                  className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 hover:bg-neutral-800 transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center md:text-left"
          >
            <h4 className="text-lg font-bold mb-6 uppercase tracking-wider text-amber-500">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2 group justify-center md:justify-start"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h4 className="text-lg font-bold mb-6 uppercase tracking-wider text-amber-500">Services</h4>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index} className="text-neutral-400">
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center md:text-left"
          >
            <h4 className="text-lg font-bold mb-6 uppercase tracking-wider text-amber-500">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-neutral-400 justify-center md:justify-start">
                <FaMapMarkerAlt className="mt-1 text-amber-500 shrink-0" />
                <span>123 Barber Street, <br />Downtown City, ST 12345</span>
              </li>
              <li className="flex items-center gap-4 text-neutral-400 justify-center md:justify-start">
                <FaPhoneAlt className="text-amber-500 shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-4 text-neutral-400 justify-center md:justify-start">
                <FaEnvelope className="text-amber-500 shrink-0" />
                <span>info@urbanedge.com</span>
              </li>
              <li className="flex items-start gap-4 text-neutral-400 justify-center md:justify-start">
                <FaClock className="mt-1 text-amber-500 shrink-0" />
                <div>
                  <p>Mon - Fri: 9am - 8pm</p>
                  <p>Sat: 10am - 6pm</p>
                  <p>Sun: Closed</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500"
        >
          <p>&copy; {currentYear} Urban Edge Booking. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Terms of Service</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
