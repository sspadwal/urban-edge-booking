import React from "react";
import { motion } from "framer-motion";

const ServicesShowcase = () => {
    const services = [
        {
            id: 1,
            title: "Classic Haircut",
            image: "/images/service-haircut.jpg",
        },
        {
            id: 2,
            title: "Luxury Shave",
            image: "/images/service-shave.jpg",
        },
        {
            id: 3,
            title: "Beard Grooming",
            image: "/images/service-beard.jpg",
        },
        {
            id: 4,
            title: "Hair Coloring",
            image: "/images/service-coloring.jpg",
        },
        {
            id: 5,
            title: "Kids Cut",
            image: "/images/service-kids.jpg",
        },
        {
            id: 6,
            title: "Royal Treatment",
            image: "/images/barber-sarah.jpg",
        },
    ];

    return (
        <section className="relative bg-black py-12 sm:py-24 lg:py-32 overflow-hidden">
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(245, 158, 11, 0.15) 1px, transparent 0)`,
                    backgroundSize: "40px 40px"
                }} />
            </div>

            <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
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
                        className="inline-block px-6 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-500 font-bold text-sm tracking-[0.3em] uppercase mb-6"
                    >
                        Our Services
                    </motion.span>
                    <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6">
                        WHAT WE{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600">
                            OFFER
                        </span>
                    </h2>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            whileHover={{ y: -10 }}
                            className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer"
                        >
                            {/* Image */}
                            <motion.div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${service.image})` }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.6 }}
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />

                            {/* Animated Border */}
                            <motion.div
                                className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-amber-500/50 transition-colors duration-300"
                                whileHover={{
                                    boxShadow: "0 0 30px rgba(245, 158, 11, 0.3)",
                                }}
                            />

                            {/* Title */}
                            <div className="absolute inset-0 flex items-end p-8">
                                <motion.h3
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 + 0.3 }}
                                    className="text-3xl sm:text-4xl font-black text-white group-hover:text-amber-400 transition-colors duration-300 leading-tight"
                                >
                                    {service.title}
                                </motion.h3>
                            </div>

                            {/* Hover Shine Effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                                style={{ transform: "skewX(-20deg)" }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesShowcase;
