import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const quotes = [
    "Two souls, one heart.",
    "Love brought us together forever.",
    "Every moment with you feels like magic.",
    "A true love story never ends.",
    "You are my today and all of my tomorrows."
];

const Quotes = () => {
    const [index, setIndex] = useState(0);
    const containerRef = useRef(null);

    // Parallax Scroll Hooks
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Layer Transforms
    const yBackground = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]); // Slow
    const yMidLayer = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);   // Medium
    const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);     // Slight offset for depth

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % quotes.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section ref={containerRef} className="relative py-8 overflow-hidden flex items-center justify-center min-h-[25vh]">

            {/* Layer 1: Background (Slow) */}
            <motion.div
                style={{ y: yBackground }}
                className="absolute inset-0 bg-gradient-to-r from-lavender/30 to-blush-pink/30 z-0"
            >
                {/* Subtle Pattern or Texture could go here */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            </motion.div>

            {/* Layer 2: Mid-Layer Floral Elements (Medium Speed) */}
            <motion.div style={{ y: yMidLayer }} className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute top-4 left-10 text-2xl opacity-60 blur-[1px]">🌸</div>
                <div className="absolute bottom-4 right-20 text-3xl opacity-60 blur-[1px]">🌹</div>
                <div className="absolute top-1/2 right-10 text-xl opacity-50">✨</div>
                <div className="absolute bottom-4 left-1/4 text-2xl opacity-50">🍃</div>
            </motion.div>

            {/* Layer 3: Foreground Content (Normal/Offset Speed) */}
            <motion.div
                style={{ y: yContent }}
                className="relative z-20 text-center max-w-xl px-6"
            >
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        <p className="text-xl md:text-2xl font-serif italic text-dark-text leading-relaxed drop-shadow-sm">
                            "{quotes[index]}"
                        </p>
                        <motion.div
                            className="h-1 w-24 bg-gradient-to-r from-rose-gold to-gold mx-auto mt-4 rounded-full"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 96, opacity: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </section>
    );
};

export default Quotes;
