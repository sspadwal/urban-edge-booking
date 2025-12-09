import React, { useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { Scissors, Zap, Crown, Sparkles, User } from "lucide-react";

const HeroGallery = () => {
    const [isHovered, setIsHovered] = useState(false);
    const rotation = useMotionValue(0);

    // Continuous rotation using animation frame
    useAnimationFrame((t, delta) => {
        if (!isHovered) {
            // Rotate 0.02 degrees per millisecond
            const currentRotation = rotation.get();
            rotation.set(currentRotation + 0.02 * delta);
        }
    });

    const items = [
        {
            id: 1,
            title: "MODERN",
            subtitle: "FADE",
            icon: Scissors,
            image: "/images/barber-sarah.jpg", // Sharp Fade
            color: "bg-orange-500",
        },
        {
            id: 2,
            title: "CLASSIC",
            subtitle: "POMPADOUR",
            icon: Crown,
            image: "/images/hero-classic-pomp.jpg", // Pompadour/Styled
            color: "bg-amber-500",
        },
        {
            id: 3,
            title: "TEXTURED",
            subtitle: "CROP",
            icon: Zap,
            image: "/images/barber-david.jpg", // Textured Crop
            color: "bg-yellow-500",
        },
        {
            id: 4,
            title: "BEARD",
            subtitle: "SCULPT",
            icon: User,
            image: "/images/service-kids.jpg", // Beard
            color: "bg-rose-500",
        },
        {
            id: 5,
            title: "LONG",
            subtitle: "STYLE",
            icon: Sparkles,
            image: "/images/hero-long-style.jpg", // Long Hair/Styling
            color: "bg-blue-500",
        },
    ];

    const radius = 280; // Radius of the carousel cylinder

    return (
        <div className="w-full h-[500px] flex items-center justify-center perspective-[1000px] overflow-hidden">
            <motion.div
                className="relative w-[200px] h-[300px] preserve-3d"
                style={{
                    transformStyle: "preserve-3d",
                    rotateY: rotation
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {items.map((item, index) => {
                    const angle = (index / items.length) * 360;
                    // const Icon = item.icon;

                    return (
                        <motion.div
                            key={item.id}
                            className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-neutral-900/80 backdrop-blur-sm shadow-2xl"
                            style={{
                                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                                transformStyle: "preserve-3d", // Ensure children can also participate if needed
                            }}
                            whileHover={{
                                // Instead of just scaling, we push it out further (translateZ) and scale slightly
                                // This prevents clipping and feels more like it's popping out of the cylinder
                                transform: `rotateY(${angle}deg) translateZ(${radius + 40}px) scale(1.1)`,
                                boxShadow: "0 0 40px rgba(245, 158, 11, 0.6)",
                                filter: "brightness(1.1)",
                                zIndex: 1000 // Helper for some browsers, though translateZ does the heavy lifting
                            }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            {/* Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ backgroundImage: `url(${item.image})` }}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-5 transform translate-z-10">

                                <p className="text-amber-400 text-[10px] font-bold tracking-widest uppercase mb-1">
                                    {item.title}
                                </p>
                                <h3 className="text-2xl font-black text-white tracking-tighter">
                                    {item.subtitle}
                                </h3>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default HeroGallery;
