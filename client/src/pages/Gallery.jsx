import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

const Gallery = () => {
    const images = [
        {
            id: 1,
            src: "/images/gallery-ambiance.jpg",
            category: "Ambiance",
            title: "The Classic Shop",
            className: "md:col-span-2 md:row-span-2",
        },
        {
            id: 2,
            src: "/images/gallery-beard-trim.jpg",
            category: "Beard",
            title: "Precision Beard Trim",
            className: "md:col-span-1 md:row-span-1",
        },
        {
            id: 3,
            src: "/images/gallery-modern-fade.jpg",
            category: "Haircut",
            title: "Modern Fade",
            className: "md:col-span-1 md:row-span-2",
        },
        {
            id: 4,
            src: "/images/gallery-master-tools.jpg",
            category: "Tools",
            title: "Master Tools",
            className: "md:col-span-1 md:row-span-1",
        },
        {
            id: 5,
            src: "/images/gallery-expert-hands.jpg",
            category: "Service",
            title: "Expert Hands",
            className: "md:col-span-1 md:row-span-1",
        },
        {
            id: 6,
            src: "/images/gallery-hot-towel.jpg",
            category: "Shave",
            title: "Hot Towel Experience",
            className: "md:col-span-2 md:row-span-1",
        },
        {
            id: 7,
            src: "/images/gallery-sharp-looks.jpg",
            category: "Styling",
            title: "Sharp Looks",
            className: "md:col-span-1 md:row-span-2",
        },
        {
            id: 8,
            src: "/images/gallery-urban-vibe.jpg",
            category: "Vibe",
            title: "Urban Atmosphere",
            className: "md:col-span-2 md:row-span-2",
        },
        {
            id: 9,
            src: "/images/gallery-detail.jpg",
            category: "Detail",
            title: "Attention to Detail",
            className: "md:col-span-1 md:row-span-1",
        },
        {
            id: 10,
            src: "/images/gallery-textured-crop.jpg",
            category: "Haircut",
            title: "Textured Crop",
            className: "md:col-span-1 md:row-span-1",
        },
        {
            id: 19,
            src: "/images/gallery-final-look.jpg",
            category: "Style",
            title: "The Final Look",
            className: "md:col-span-1 md:row-span-1",
        },
        {
            id: 11,
            src: "/images/gallery-interior.jpg",
            category: "Interior",
            title: "The Chair",
            className: "md:col-span-2 md:row-span-1",
        },
        {
            id: 12,
            src: "/images/gallery-fresh-cut.jpg",
            category: "Style",
            title: "Fresh Cut",
            className: "md:col-span-1 md:row-span-1",
        },
        {
            id: 13,
            src: "/images/gallery-beard-care.jpg",
            category: "Grooming",
            title: "Beard Care",
            className: "md:col-span-1 md:row-span-1",
        },
        {
            id: 14,
            src: "/images/gallery-fine-detailing.jpg",
            category: "Process",
            title: "Fine Detailing",
            className: "md:col-span-1 md:row-span-1",
        },
        {
            id: 15,
            src: "/images/gallery-vintage-clipper.jpg",
            category: "Tools",
            title: "Vintage Clipper",
            className: "md:col-span-2 md:row-span-1",
        },

        {
            id: 17,
            src: "/images/gallery-scissor-cut.jpg",
            category: "Haircut",
            title: "Scissor Cut",
            className: "md:col-span-1 md:row-span-1",
        },


        {
            id: 20,
            src: "/images/gallery-straight-razor.jpg",
            category: "Shave",
            title: "Straight Razor",
            className: "md:col-span-2 md:row-span-1",
        },
        {
            id: 21,
            src: "/images/gallery-professional-kit.jpg",
            category: "Tools",
            title: "Professional Kit",
            className: "md:col-span-1 md:row-span-1",
        },
        {
            id: 22,
            src: "/images/gallery-vintage-seat.jpg",
            category: "Interior",
            title: "Vintage Seat",
            className: "md:col-span-1 md:row-span-1",
        },
    ];

    return (
        <div className="pt-40 bg-black min-h-screen pb-20">
            <div className="container mx-auto px-6 sm:px-8 lg:px-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl sm:text-7xl font-black text-white mb-6"
                    >
                        OUR <span className="text-amber-500">GALLERY</span>
                    </motion.h1>
                    <motion.div
                        initial={{ scale: 0, width: 0 }}
                        animate={{ scale: 1, width: "100px" }}
                        transition={{ delay: 0.3 }}
                        className="h-1 bg-amber-500 mx-auto"
                    />
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-6 text-neutral-400 text-lg max-w-2xl mx-auto"
                    >
                        A showcase of our finest cuts, shaves, and the unique atmosphere of Urban Edge.
                    </motion.p>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
                    {images.map((image, index) => (
                        <motion.div
                            key={image.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.3 }
                            }}
                            className={`group relative rounded-2xl overflow-hidden ${image.className || "md:col-span-1 md:row-span-1"}`}
                        >
                            <img
                                src={image.src}
                                alt={image.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:filter group-hover:brightness-75"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <span className="text-amber-500 text-sm font-bold tracking-widest uppercase mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {image.category}
                                </span>
                                <h3 className="text-2xl font-bold text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                    {image.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Gallery;
