import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Heart, Star, Music, Gift, Infinity as InfinityIcon, Coffee } from 'lucide-react';

const timelineEvents = [
    {
        year: "First Chapter",
        title: "How We Met",
        description: "Destiny brought us together in the most unexpected way.",
        icon: <Star className="w-5 h-5 text-white" />,
        image: "/assets/photo1.jpg"
    },
    {
        year: "Sweet Memories",
        title: "Bonding Over Coffee",
        description: "Countless hours of conversations and laughter.",
        icon: <Coffee className="w-5 h-5 text-white" />,
        image: "/assets/photo2.jpg"
    },
    {
        year: "The Spark",
        title: "Falling in Love",
        description: "Realizing that we were meant to be.",
        icon: <Music className="w-5 h-5 text-white" />,
        image: "/assets/photo3.jpg"
    },
    {
        year: "The Question",
        title: "She Said Yes!",
        description: "A magical moment that changed our lives forever.",
        icon: <Gift className="w-5 h-5 text-white" />,
        image: "/assets/photo4.jpg"
    },
    {
        year: "25/01/2026",
        title: "Forever Begins",
        description: "Join us as we start our happily ever after.",
        icon: <InfinityIcon className="w-5 h-5 text-white" />,
        image: "/assets/photo5.jpg"
    }
];

const Timeline = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

    return (
        <section ref={containerRef} className="py-20 bg-ivory relative overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.h2
                    className="text-5xl font-royal text-center text-rose-gold mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Our Love Story
                </motion.h2>

                <div className="relative max-w-5xl mx-auto min-h-[1000px]">
                    {/* Heartbeat SVG Path (Box Zig-Zag) */}
                    <svg
                        className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible"
                        viewBox="0 0 1000 1000"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <linearGradient id="heartbeatGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#ff9eb5" />
                                <stop offset="50%" stopColor="#d4af37" />
                                <stop offset="100%" stopColor="#e05263" />
                            </linearGradient>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="4" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>

                        {/* 
                            Path Logic (Tighter Spacing):
                            Row Height: ~180px
                            Start (100, 50)
                            Row 1: y=50 -> Right to (900, 50)
                            Curve Down -> (900, 230)
                            Curve Left -> (100, 230)
                            Curve Down -> (100, 410)
                            Curve Right -> (900, 410)
                            Curve Down -> (900, 590)
                            Curve Left -> (100, 590)
                            Curve Down -> (100, 770)
                            Curve Right -> (900, 770)
                        */}
                        <motion.path
                            d={`
                                M 100 50 
                                L 850 50 Q 900 50 900 100 
                                L 900 180 Q 900 230 850 230 
                                L 150 230 Q 100 230 100 280 
                                L 100 360 Q 100 410 150 410 
                                L 850 410 Q 900 410 900 460 
                                L 900 540 Q 900 590 850 590 
                                L 150 590 Q 100 590 100 640 
                                L 100 720 Q 100 770 150 770 
                                L 850 770
                            `}
                            fill="none"
                            stroke="url(#heartbeatGradient)"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ pathLength }}
                            className="drop-shadow-lg animate-pulse-slow"
                        />
                    </svg>

                    {/* Story Cards & Hearts */}
                    {timelineEvents.map((event, index) => {
                        const isLeftToRight = index % 2 === 0;

                        // Vertical positions corresponding to the horizontal lines
                        // Row 1: y=50
                        // Row 2: y=230
                        // Row 3: y=410
                        // Row 4: y=590
                        // Row 5: y=770
                        const topPos = 50 + (index * 180);

                        return (
                            <React.Fragment key={index}>
                                {/* Story Card */}
                                <div
                                    className="absolute w-full max-w-xs md:max-w-sm transform -translate-y-1/2 z-10"
                                    style={{
                                        top: `${topPos}px`,
                                        left: isLeftToRight ? '20%' : 'auto',
                                        right: isLeftToRight ? 'auto' : '20%',
                                    }}
                                >
                                    <StoryCard event={event} index={index} isLeftToRight={isLeftToRight} />
                                </div>

                                {/* Bouncing Hearts at Turns */}
                                <motion.div
                                    className="absolute w-8 h-8 text-rose-gold z-20"
                                    style={{
                                        top: `${topPos}px`,
                                        left: isLeftToRight ? '90%' : '10%',
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: [0, 1.4, 1] }}
                                    transition={{ delay: 0.5 + (index * 0.2), duration: 0.5 }}
                                >
                                    <Heart fill="currentColor" className="animate-bounce" />
                                </motion.div>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

const StoryCard = ({ event, index, isLeftToRight }) => {
    return (
        <motion.div
            className={`relative bg-white p-4 rounded-2xl shadow-xl border border-rose-gold/20 group hover:scale-105 transition-transform duration-300 flex items-center gap-4 ${!isLeftToRight ? 'flex-row-reverse text-right' : 'text-left'}`}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
        >
            {/* Thumbnail */}
            <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 border-rose-gold/10 shadow-sm">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className={`flex items-center gap-2 mb-1 ${!isLeftToRight ? 'justify-end' : ''}`}>
                    <div className="p-1.5 bg-rose-gold rounded-full text-white shadow-sm">
                        {event.icon}
                    </div>
                    <span className="text-xs font-bold text-rose-gold tracking-wider uppercase">{event.year}</span>
                </div>
                <h3 className="text-lg font-serif font-bold text-gray-800 leading-tight mb-1 truncate">{event.title}</h3>
                <p className="text-sm text-gray-600 leading-snug line-clamp-2">{event.description}</p>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-rose-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </motion.div>
    );
};

export default Timeline;
