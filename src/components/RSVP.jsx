import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

const RSVP = () => {
    const handleRSVP = () => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);
    };

    return (
        <section className="py-24 bg-white flex flex-col items-center justify-center relative overflow-hidden">
            <motion.div
                className="text-center z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl font-royal text-rose-gold mb-8">Are You Joining Us?</h2>

                <motion.button
                    onClick={handleRSVP}
                    className="group relative px-8 py-4 bg-gradient-to-r from-rose-gold to-peach rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center space-x-3 overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full"></span>
                    <Heart className="w-6 h-6 text-white fill-white animate-pulse" />
                    <span className="text-white font-serif text-lg font-semibold tracking-wide relative z-10">
                        RSVP for Stephen & Epsy
                    </span>
                </motion.button>
            </motion.div>

            {/* Background Hearts */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-rose-gold/20"
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: -100, opacity: 1 }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            fontSize: `${Math.random() * 20 + 10}px`,
                        }}
                    >
                        ❤️
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default RSVP;
