import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import scissorsImg from "../assets/images/scissors.png";
import trimmerImg from "../assets/images/trimmer.png";
import razorImg from "../assets/images/razor.png";
import brushImg from "../assets/images/brush.png";
import combImg from "../assets/images/comb.png";

const FloatingTools = () => {
    // Initialize state immediately to avoid layout shift on mobile
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth < 768 : false
    );

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Define the tools
    const toolTypes = [
        {
            id: "scissors",
            image: scissorsImg,
            scale: 1.2
        },
        {
            id: "trimmer",
            image: trimmerImg,
            scale: 1.4
        },
        {
            id: "razor",
            image: razorImg,
            scale: 1.0
        },
        {
            id: "brush",
            image: brushImg,
            scale: 1.0
        },
        {
            id: "comb",
            image: combImg,
            scale: 1.0
        }
    ];

    // Responsive configuration
    // Mobile: 9 items (Better balance), Medium speed (20s)
    // Desktop: 15 items (Dense), Standard speed (30s)
    const marqueeItems = isMobile
        ? [...toolTypes, ...toolTypes.slice(0, 4)] // 9 items
        : [...toolTypes, ...toolTypes, ...toolTypes]; // 15 items

    const duration = isMobile ? 20 : 30;
    const waveAmplitude = isMobile ? "5vh" : "8vh"; // Smoother wave on mobile

    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Container for the rolling wave */}
            <div className="absolute bottom-0 w-full h-[300px] translate-y-8 flex items-center">
                {marqueeItems.map((tool, index) => {
                    // Calculate delay based on duration and item count
                    const delay = index * (duration / marqueeItems.length);

                    return (
                        <motion.div
                            key={`${tool.id}-${index}`}
                            className="absolute top-1/2 -translate-y-1/2 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 opacity-80 drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
                            initial={{ x: "-50vw", y: 0 }}
                            animate={{
                                x: ["-50vw", "150vw"],
                                y: [`-${waveAmplitude}`, waveAmplitude, `-${waveAmplitude}`], // Responsive vertical wave
                                rotate: [-10, 10, -10]
                            }}
                            transition={{
                                x: {
                                    duration: duration,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: delay - duration,
                                    repeatDelay: 0
                                },
                                y: {
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: delay * -0.5
                                },
                                rotate: {
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }
                            }}
                        >
                            <img
                                src={tool.image}
                                alt={tool.id}
                                className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                                style={{ transform: `scale(${tool.scale})` }}
                            />
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default FloatingTools;
