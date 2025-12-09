import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
    return (
        <div className="pt-40 bg-black min-h-screen pb-20">
            <div className="container mx-auto px-6 sm:px-8 lg:px-12">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl sm:text-7xl font-black text-white mb-6"
                    >
                        GET IN <span className="text-amber-500">TOUCH</span>
                    </motion.h1>
                    <motion.div
                        initial={{ scale: 0, width: 0 }}
                        animate={{ scale: 1, width: "100px" }}
                        transition={{ delay: 0.3 }}
                        className="h-1 bg-amber-500 mx-auto"
                    />
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 mb-20">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-10"
                    >
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <Clock className="w-6 h-6 text-amber-500" /> Opening Hours
                            </h3>
                            <ul className="space-y-3 text-neutral-400">
                                <li className="flex justify-between border-b border-white/5 pb-2">
                                    <span>Monday - Sunday</span>
                                    <span className="text-white">8:00 AM - 9:00 PM</span>
                                </li>

                            </ul>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-white mb-6">Contact Info</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                                        <MapPin className="w-6 h-6 text-amber-500" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-lg">Location</p>
                                        <p className="text-neutral-400">123 Urban Street, Fashion District</p>
                                        <p className="text-neutral-400">New York, NY 10001</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                                        <Phone className="w-6 h-6 text-amber-500" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-lg">Phone</p>
                                        <p className="text-neutral-400">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                                        <Mail className="w-6 h-6 text-amber-500" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-lg">Email</p>
                                        <p className="text-neutral-400">info@urbanedge.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-neutral-900 p-8 rounded-3xl border border-white/10"
                    >
                        <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-neutral-400 mb-2">Name</label>
                                    <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-amber-500 focus:outline-none transition-colors" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-neutral-400 mb-2">Email</label>
                                    <input type="email" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-amber-500 focus:outline-none transition-colors" placeholder="john@example.com" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-neutral-400 mb-2">Subject</label>
                                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-amber-500 focus:outline-none transition-colors" placeholder="How can we help?" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-neutral-400 mb-2">Message</label>
                                <textarea rows="4" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-amber-500 focus:outline-none transition-colors" placeholder="Write your message here..."></textarea>
                            </div>
                            <button className="w-full py-4 bg-amber-500 text-black font-black text-lg rounded-xl hover:bg-amber-400 transition-transformation hover:scale-[1.02] active:scale-[0.98] duration-200">
                                SEND MESSAGE
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* Map Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="w-full h-[400px] rounded-3xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700"
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645000000000!5m2!1sen!2s"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
