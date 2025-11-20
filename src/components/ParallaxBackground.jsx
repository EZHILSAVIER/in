import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxBackground = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    return (
        <div ref={ref} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Layer 1: Slow moving large elements */}
            <motion.div style={{ y: y1 }} className="absolute inset-0">
                <div className="absolute top-[10%] left-[5%] text-rose-gold/10 text-9xl">🌸</div>
                <div className="absolute top-[40%] right-[5%] text-rose-gold/10 text-8xl">❤️</div>
                <div className="absolute top-[70%] left-[15%] text-rose-gold/10 text-9xl">✨</div>
            </motion.div>

            {/* Layer 2: Fast moving small elements (Inverse direction) */}
            <motion.div style={{ y: y2 }} className="absolute inset-0">
                <div className="absolute top-[20%] right-[15%] text-gold/20 text-4xl">💖</div>
                <div className="absolute top-[50%] left-[10%] text-gold/20 text-5xl">🌹</div>
                <div className="absolute top-[80%] right-[20%] text-gold/20 text-4xl">💫</div>
            </motion.div>

            {/* Layer 3: Medium speed elements */}
            <motion.div style={{ y: y3 }} className="absolute inset-0">
                <div className="absolute top-[15%] left-[50%] text-lavender/50 text-6xl blur-sm">☁️</div>
                <div className="absolute top-[60%] right-[40%] text-lavender/50 text-6xl blur-sm">☁️</div>
            </motion.div>
        </div>
    );
};

export default ParallaxBackground;
