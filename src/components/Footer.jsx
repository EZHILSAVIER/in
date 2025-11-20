import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-ivory to-lavender py-12 relative overflow-hidden">
            <div className="container mx-auto px-4 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center space-y-4"
                >
                    <Heart className="w-8 h-8 text-rose-gold fill-rose-gold animate-pulse" />
                    <p className="text-xl font-royal text-gray-700">
                        With Endless Love
                    </p>
                    <h3 className="text-2xl font-serif text-rose-gold font-bold">
                        Stephen Raj & Epsy Millaniya
                    </h3>
                    <p className="text-sm text-gray-500 mt-8">
                        © 2026 Engagement Invitation. All rights reserved.
                    </p>
                </motion.div>
            </div>

            {/* Fireflies */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-gold rounded-full shadow-[0_0_10px_#ffd700]"
                        animate={{
                            x: [0, Math.random() * 100 - 50],
                            y: [0, Math.random() * 100 - 50],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            repeatType: "mirror",
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            {/* Lace Border (CSS Pattern) */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIiBmaWxsPSJub25lIiBzdHJva2U9IiNlNmUyZmEiIHN0cm9rZS13aWR0aD0iMSI+PHBhdGggZD0iTTAgMTBRNSAwIDEwIDEwVDEwIDEwVDIwIDEwIiAvPjwvc3ZnPg==')] opacity-50"></div>
        </footer>
    );
};

export default Footer;
