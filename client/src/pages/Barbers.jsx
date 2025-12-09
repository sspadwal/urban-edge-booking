import React from "react";
import { motion } from "framer-motion";
import { Instagram, Twitter } from "lucide-react";

const Barbers = () => {
    const barbers = [
        {
            id: 1,
            name: "Alex 'The Blade'",
            role: "Master Barber",
            image: "/images/barber-alex.jpg",
            bio: "10+ years of mastering the art of the fade. Alex blends classic techniques with modern trends.",
        },
        {
            id: 2,
            name: "Sarah Jenkins",
            role: "Stylist & Colorist",
            image: "/images/barber-sarah.jpg",
            bio: "Specializing in creative color and precision styling. Sarah brings a fresh perspective to men's grooming.",
        },
        {
            id: 3,
            name: "Marcus Thorne",
            role: "Beard Specialist",
            image: "/images/barber-marcus.jpg",
            bio: "The beard whisperer. From shaping to hot towel treatments, Marcus treats your beard like royalty.",
        },
        {
            id: 4,
            name: "David Kim",
            role: "Junior Barber",
            image: "/images/barber-david.jpg",
            bio: "A rising star with steady hands and an eye for detail. Book him now before he's famous.",
        },
    ];

    return (
        <div className="pt-24 bg-black min-h-screen pb-20">
            <div className="container mx-auto px-6 sm:px-8 lg:px-12">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl sm:text-7xl font-black text-white mb-6"
                    >
                        MEET THE <span className="text-amber-500">TEAM</span>
                    </motion.h1>
                    <motion.div
                        initial={{ scale: 0, width: 0 }}
                        animate={{ scale: 1, width: "100px" }}
                        transition={{ delay: 0.3 }}
                        className="h-1 bg-amber-500 mx-auto"
                    />
                    <p className="mt-6 text-neutral-400 text-lg max-w-2xl mx-auto">
                        Our team of expert barbers is dedicated to providing you with the best grooming experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {barbers.map((barber, index) => (
                        <motion.div
                            key={barber.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-colors"
                        >
                            <div className="aspect-[3/4] overflow-hidden relative">
                                <img
                                    src={barber.image}
                                    alt={barber.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                                {/* Socials */}
                                <div className="absolute bottom-4 right-4 flex gap-2 translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                                    <button className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-amber-500 hover:text-black transition-colors">
                                        <Instagram className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-amber-500 hover:text-black transition-colors">
                                        <Twitter className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-6 relative">
                                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-amber-500 transition-colors">{barber.name}</h3>
                                <p className="text-amber-500 text-sm font-bold tracking-wider uppercase mb-3">{barber.role}</p>
                                <p className="text-neutral-400 text-sm leading-relaxed">{barber.bio}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Barbers;
