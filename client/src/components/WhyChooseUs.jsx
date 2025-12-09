import React from "react";
import { motion } from "framer-motion";
import bgImage from "../assets/barbershop-bg.png";

const WhyChooseUs = () => {
    const stats = [
        { number: "15+", label: "Expert Barbers", delay: 0.2 },
        { number: "5K+", label: "Happy Clients", delay: 0.3 },
        { number: "10+", label: "Years Experience", delay: 0.4 },
        { number: "4.9", label: "Average Rating", delay: 0.5 },
    ];

    return (
        <section className="relative min-h-screen py-12 sm:py-24 lg:py-32 flex items-center overflow-hidden bg-black">
            {/* Background Image */}
            <div className="absolute inset-0">
                <div
                    className="w-full h-full bg-cover bg-center opacity-50"
                    style={{
                        backgroundImage: `url(${bgImage})`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-10 sm:mb-16"
                    >
                        <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="inline-block px-6 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 font-bold text-sm tracking-[0.3em] uppercase mb-8"
                        >
                            Why Choose Us
                        </motion.span>

                        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                            EXCELLENCE IN
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600">
                                EVERY DETAIL
                            </span>
                        </h2>

                        <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                            Where traditional craftsmanship meets modern style
                        </p>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: stat.delay,
                                    duration: 0.6,
                                    type: "spring",
                                    stiffness: 100,
                                }}
                                whileHover={{ y: -10, scale: 1.05 }}
                                className="group w-full"
                            >
                                <div className="relative p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-neutral-900/50 to-neutral-900/30 backdrop-blur-xl border border-white/10 hover:border-amber-500/50 transition-all duration-300 overflow-hidden h-full flex flex-col justify-center">
                                    {/* Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/10 group-hover:to-orange-500/10 transition-all duration-500" />

                                    {/* Content */}
                                    <div className="relative flex flex-col items-center justify-center gap-2 text-center">
                                        {/* Number */}
                                        <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-orange-500">
                                            {stat.number}
                                        </div>

                                        {/* Label */}
                                        <div className="text-xs sm:text-sm text-neutral-400 font-medium group-hover:text-white transition-colors leading-tight">
                                            {stat.label}
                                        </div>
                                    </div>

                                    {/* Shine Effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                                        style={{ transform: "skewX(-20deg)" }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 }}
                        className="text-center"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-12 py-5 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-black text-lg rounded-full hover:from-amber-400 hover:to-orange-500 transition-all shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50"
                        >
                            BOOK APPOINTMENT
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
