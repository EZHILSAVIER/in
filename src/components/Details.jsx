import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin } from 'lucide-react';

const Details = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <section ref={ref} className="py-24 relative overflow-hidden flex justify-center items-center min-h-screen bg-ivory">

            {/* Full Section Floral Background (Uploaded Image) */}
            <div className="absolute inset-0 pointer-events-none">
                <img
                    src="/assets/floral-bg.png"
                    alt="Floral Background"
                    className="w-full h-full object-cover opacity-50 mix-blend-multiply scale-110"
                />
                {/* Gradient Mask to fade edges and remove square look */}
                <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-ivory opacity-80"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-ivory via-transparent to-ivory opacity-80"></div>

                {/* Overlay for texture */}
                <div className="absolute inset-0 bg-ivory/20 mix-blend-overlay"></div>
            </div>

            {/* Floating Petals/Butterflies Background Animation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-2xl opacity-60"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: window.innerHeight + 100,
                            rotate: 0
                        }}
                        animate={{
                            y: -100,
                            x: (Math.random() - 0.5) * 200 + Math.random() * window.innerWidth,
                            rotate: Math.random() * 360
                        }}
                        transition={{
                            duration: Math.random() * 10 + 15,
                            repeat: Infinity,
                            delay: Math.random() * 10,
                            ease: "linear"
                        }}
                    >
                        {i % 2 === 0 ? '🦋' : '🌸'}
                    </motion.div>
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10 flex justify-center">
                <motion.div
                    className="relative w-full max-w-3xl aspect-[3/4] md:aspect-[4/3] flex flex-col items-center justify-center p-8 md:p-16 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    {/* Content Inside Glass Circle */}
                    <motion.div
                        style={{ y: yParallax }}
                        className="relative z-20 space-y-6 bg-white/70 backdrop-blur-xl p-12 md:p-16 rounded-full shadow-2xl border border-white/80"
                    >
                        <motion.h2
                            className="text-5xl md:text-7xl font-royal text-rose-gold drop-shadow-sm"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            Save the Date
                        </motion.h2>

                        <div className="space-y-2">
                            <motion.h1
                                className="text-3xl md:text-5xl font-serif font-bold text-dark-text"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                            >
                                Stephen Raj <span className="text-rose-gold">&</span> Epsy Millaniya
                            </motion.h1>
                        </div>

                        <motion.div
                            className="w-16 h-1 bg-rose-gold mx-auto rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: 64 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                        />

                        <motion.div
                            className="space-y-1"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 1.0, duration: 0.8 }}
                        >
                            <p className="text-2xl md:text-3xl font-serif text-gray-700 font-semibold">
                                25 January 2026
                            </p>
                            <p className="text-xl text-gray-600 italic">
                                From 6 PM Onwards
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                            className="pt-4"
                        >
                            <p className="text-lg font-serif text-dark-text mb-2">
                                Hotel Rajabhojanam, Hosur
                            </p>
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=Hotel+Rajsbhojanam+Hosur"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-rose-gold hover:text-rose-600 transition-colors font-semibold border-b border-rose-gold/30 hover:border-rose-gold pb-0.5"
                            >
                                <MapPin size={18} />
                                <span>View Map</span>
                            </a>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Details;
