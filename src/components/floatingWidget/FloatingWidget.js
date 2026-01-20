import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import './FloatingWidget.css';
import config from '../../siteConfig';

const FloatingWidget = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, 'change', (latest) => {
        // Show after scrolling past ~80% of viewport height
        setIsVisible(latest > window.innerHeight * 0.8);
    });

    const toggleExpand = () => setIsExpanded(!isExpanded);

    const containerVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: 20
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: 20,
            transition: { duration: 0.2 }
        }
    };

    const expandedVariants = {
        hidden: {
            opacity: 0,
            scale: 0.9,
            y: 10
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20,
                staggerChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            y: 10,
            transition: { duration: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { type: 'spring', stiffness: 300 }
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="floating-widget"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <AnimatePresence mode="wait">
                        {isExpanded ? (
                            <motion.div
                                key="expanded"
                                className="floating-widget__expanded"
                                variants={expandedVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <motion.p
                                    className="floating-widget__title"
                                    variants={itemVariants}
                                >
                                    Let&apos;s talk!
                                </motion.p>
                                <motion.div
                                    className="floating-widget__links"
                                    variants={itemVariants}
                                >
                                    <a
                                        href={`mailto:${config.personal.email.replace(" [at] ", "@")}`}
                                        className="floating-widget__link"
                                    >
                                        <i className="fas fa-envelope" />
                                        <span>Email</span>
                                    </a>
                                    <a
                                        href={config.personal.socialMedia.linkedin}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="floating-widget__link"
                                    >
                                        <i className="fab fa-linkedin" />
                                        <span>LinkedIn</span>
                                    </a>
                                </motion.div>
                                <button
                                    className="floating-widget__close"
                                    onClick={toggleExpand}
                                    aria-label="Minimize"
                                >
                                    <i className="fas fa-chevron-down" />
                                </button>
                            </motion.div>
                        ) : (
                            <motion.button
                                key="collapsed"
                                className="floating-widget__button"
                                onClick={toggleExpand}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <span className="floating-widget__wave">
                                    <i className="fas fa-comment-dots" />
                                </span>
                                <span className="floating-widget__label">Get in touch</span>
                            </motion.button>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FloatingWidget;
