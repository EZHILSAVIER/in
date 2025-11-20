import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart } from 'lucide-react';

const photos = [
    { src: '/assets/photo1.jpg', caption: 'Our Journey Begins' },
    { src: '/assets/photo2.jpg', caption: 'Moments of Love' },
    { src: '/assets/photo3.jpg', caption: 'Together Forever' },
    { src: '/assets/photo4.jpg', caption: 'Stephen ❤️ Epsy' },
    { src: '/assets/photo5.jpg', caption: 'A Love Written in the Stars' },
    { src: '/assets/photo1.jpg', caption: 'Endless Joy' },
];

const Carousel = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { amount: 0.2 });

    // Duplicate photos for seamless loop
    const displayPhotos = [...photos, ...photos, ...photos];

    return (
        <section ref={containerRef} className="py-24 bg-ivory overflow-hidden relative">
            {/* Floating Pastel Hearts Background */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            color: ['#ff9eb5', '#ffdab9', '#f3e5f5', '#e05263'][Math.floor(Math.random() * 4)],
                        }}
                        animate={{
                            y: [0, -100, -200],
                            opacity: [0, 0.6, 0],
                            scale: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10, // Slow upward float
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "linear",
                        }}
                    >
                        <Heart
                            size={Math.random() * 20 + 10}
                            fill="currentColor"
                            className="opacity-40 blur-[1px]"
                        />
                    </motion.div>
                ))}
            </div>

            <div className="container mx-auto px-4 text-center mb-12 relative z-10">
                <motion.h2
                    className="text-5xl font-serif font-bold text-rose-gold text-shadow-perfect"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Captured Moments
                </motion.h2>
            </div>

            {/* Continuous Scroll Container */}
            <div className="relative w-full flex overflow-hidden mask-gradient-sides z-20">
                <motion.div
                    className="flex gap-8 px-4"
                    animate={isInView ? { x: ["0%", "-33.33%"] } : {}}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30, // Even slower, more cinematic
                            ease: "linear",
                        },
                    }}
                    style={{ width: "fit-content" }}
                    whileHover={{ animationPlayState: "paused" }} // CSS pause fallback
                >
                    {displayPhotos.map((photo, index) => (
                        <Card key={index} photo={photo} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const Card = ({ photo }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="relative w-[280px] md:w-[320px] aspect-[3/4] flex-shrink-0 bg-white p-4 shadow-xl rounded-xl cursor-pointer"
            whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px -10px rgba(224, 82, 99, 0.3)",
                zIndex: 10
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <div className="w-full h-full overflow-hidden rounded border border-gray-100 relative group">
                <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover"
                />

                {/* Glowing Heart Outline on Hover */}
                {isHovered && (
                    <motion.div
                        className="absolute inset-0 border-4 border-rose-gold/50 rounded z-10 pointer-events-none"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="absolute inset-0 bg-rose-gold/10 animate-pulse-slow"></div>
                    </motion.div>
                )}

                {/* Tiny Hearts Explosion on Hover */}
                {isHovered && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute"
                                initial={{
                                    x: "50%",
                                    y: "50%",
                                    opacity: 0,
                                    scale: 0
                                }}
                                animate={{
                                    x: `${50 + (Math.random() - 0.5) * 150}%`,
                                    y: `${50 + (Math.random() - 0.5) * 150}%`,
                                    opacity: [0, 1, 0],
                                    scale: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: Math.random() * 0.5
                                }}
                            >
                                <Heart size={12} fill="#ff9eb5" className="text-rose-gold" />
                            </motion.div>
                        ))}
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6 z-20">
                    <p className="text-white font-serif text-lg font-bold tracking-wide drop-shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {photo.caption}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default Carousel;
