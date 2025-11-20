import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const Hero = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <section ref={ref} className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-blush-pink via-lavender to-ivory flex flex-col items-center justify-center text-center">

            {/* Background Particles */}
            <motion.div style={{ y: yBackground }} className="absolute inset-0 pointer-events-none z-0">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full blur-xl opacity-40"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            scale: 0,
                        }}
                        animate={{
                            y: [null, Math.random() * -100],
                            scale: [0, Math.random() * 1 + 0.5, 0],
                            opacity: [0, 0.6, 0],
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeInOut",
                        }}
                        style={{
                            width: Math.random() * 100 + 50,
                            height: Math.random() * 100 + 50,
                            backgroundColor: i % 3 === 0 ? '#ff9eb5' : i % 3 === 1 ? '#e05263' : '#fdfbf7',
                        }}
                    />
                ))}
            </motion.div>

            {/* Main Content */}
            <div className="z-10 flex flex-col items-center space-y-8 px-4 relative w-full max-w-4xl">

                {/* Header Text: Blur-to-Clear + Slide Down */}
                <motion.div
                    className="flex flex-col items-center space-y-4"
                    initial={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                        delay: 1.2, // Starts exactly when zoom finishes
                        duration: 1.2,
                        ease: "easeInOut"
                    }}
                    onAnimationComplete={() => {
                        const duration = 3000;
                        const end = Date.now() + duration;

                        const frame = () => {
                            confetti({
                                particleCount: 5,
                                angle: 60,
                                spread: 55,
                                origin: { x: 0 },
                                colors: ['#ff9eb5', '#d4af37', '#e05263']
                            });
                            confetti({
                                particleCount: 5,
                                angle: 120,
                                spread: 55,
                                origin: { x: 1 },
                                colors: ['#ff9eb5', '#d4af37', '#e05263']
                            });

                            if (Date.now() < end) {
                                requestAnimationFrame(frame);
                            }
                        };
                        frame();
                    }}
                >
                    <h2 className="text-2xl md:text-3xl text-black tracking-[0.2em] uppercase font-serif font-bold text-shadow-perfect">
                        We’re Getting Engaged!
                    </h2>

                    <div className="relative py-2">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-dark-text drop-shadow-2xl whitespace-nowrap">
                            Stephen Raj <span className="text-rose-gold mx-2">&</span> Epsy Millaniya
                        </h1>
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gold/20 blur-3xl -z-10 rounded-full"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 0.5, scale: 1.2 }}
                            transition={{ delay: 1.5, duration: 2, ease: "easeOut" }}
                        />
                    </div>

                    <p className="text-lg md:text-xl text-dark-text/80 font-serif italic">
                        Celebrate the beginning of our forever.
                    </p>
                </motion.div>

                {/* Hero Image: Zoom 110% -> 100% + Light Blur Overlay */}
                <div className="relative w-72 h-96 md:w-96 md:h-[30rem] glass-card rounded-2xl p-4 overflow-hidden">
                    {/* Image Container for Zoom */}
                    <motion.div
                        className="w-full h-full rounded-xl overflow-hidden relative"
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                    >
                        <img
                            src="/assets/photo1.jpg"
                            alt="Stephen & Epsy"
                            className="w-full h-full object-cover"
                        />

                        {/* Light Blur Overlay during zoom */}
                        <motion.div
                            className="absolute inset-0 bg-white/20 backdrop-blur-sm"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                    </motion.div>

                    <div className="absolute -inset-2 border border-gold/30 rounded-2xl -z-10 animate-pulse-slow pointer-events-none"></div>

                    <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
                        <Heart className="w-6 h-6 text-white/90 mx-auto fill-white/60 animate-bounce" />
                    </div>
                </div>

            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 2.5, duration: 2, repeat: Infinity }}
            >
                <div className="w-6 h-10 border-2 border-rose-gold rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-rose-gold rounded-full animate-bounce" />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
