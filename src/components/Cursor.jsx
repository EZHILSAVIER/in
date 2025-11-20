import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Cursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [trail, setTrail] = useState([]);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            // Add new particle to trail
            const newParticle = {
                id: Date.now(),
                x: e.clientX,
                y: e.clientY,
            };

            setTrail((prev) => [...prev.slice(-15), newParticle]);
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {/* Main Cursor */}
            <motion.div
                className="fixed w-4 h-4 bg-rose-gold rounded-full mix-blend-multiply"
                animate={{ x: mousePosition.x - 8, y: mousePosition.y - 8 }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
            />

            {/* Trail */}
            <AnimatePresence>
                {trail.map((particle) => (
                    <motion.div
                        key={particle.id}
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{ opacity: 0, scale: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed w-2 h-2 text-rose-gold"
                        style={{ left: particle.x, top: particle.y }}
                    >
                        ❤️
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Cursor;
