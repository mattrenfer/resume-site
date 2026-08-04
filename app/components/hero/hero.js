'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import config from '../../siteConfig';

const Hero = ({ siteConfig }) => {
    const [displayRole, setDisplayRole] = useState('');
    const [roleIndex, setRoleIndex] = useState(0);

    // Typewriter effect
    useEffect(() => {
        const currentRole =
            config.hero.roles[roleIndex % config.hero.roles.length];
        let charIndex = 0;

        const typeInterval = setInterval(() => {
            if (charIndex <= currentRole.length) {
                setDisplayRole(currentRole.slice(0, charIndex));
                charIndex++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    setRoleIndex(prev => prev + 1);
                }, config.hero.typewriter.pauseDuration);
            }
        }, config.hero.typewriter.typingSpeed);

        return () => clearInterval(typeInterval);
    }, [roleIndex]);

    // Container no longer fades (no opacity gate) so its children — including the
    // LCP text — are painted in the server-rendered HTML instead of waiting on JS.
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
            },
        },
    };

    // LCP elements (name + tagline): stay fully opaque from first paint so they
    // count as the largest contentful paint immediately; only a subtle settle
    // animates in once JS loads.
    const lcpItemVariants = {
        hidden: { y: 12, opacity: 1 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
            },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8, rotate: -10 },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10,
                duration: 0.8,
            },
        },
    };

    const socialVariants = {
        hover: {
            scale: 1.2,
            rotate: 360,
            transition: {
                type: 'spring',
                stiffness: 300,
            },
        },
    };

    return (
        <section id='hero' className='s-hero target-section'>
            {/* Background gradient comes from the .s-hero__bg CSS layer. */}
            <div className='s-hero__bg'></div>

            <motion.div
                className='row s-hero__content'
                variants={containerVariants}
                initial='hidden'
                animate='visible'
            >
                <div className='column'>
                    <div className='s-hero__content-about'>
                        <motion.h1 variants={lcpItemVariants}>
                            {siteConfig.personal.name}
                        </motion.h1>

                        <motion.h2 variants={itemVariants}>
                            <em>
                                {displayRole}
                                <span className='cursor-blink'>|</span>
                            </em>
                        </motion.h2>

                        <br />

                        <motion.div
                            className='column tab-12'
                            initial='hidden'
                            whileInView='visible'
                            viewport={{ once: true, amount: 0.3 }}
                            variants={imageVariants}
                        >
                            <motion.img
                                className='s-about__pic'
                                src={siteConfig.about.profileImage}
                                alt='Matthew Renfer'
                                width={300}
                                height={300}
                                fetchpriority='high'
                                loading='eager'
                                decoding='async'
                                whileHover={{
                                    scale: 1.05,
                                    rotate: 2,
                                    transition: { duration: 0.3 },
                                }}
                            />
                        </motion.div>

                        <motion.h3 variants={lcpItemVariants}>
                            {config.hero.tagline
                                .split(/(\{highlight:.*?\})/)
                                .map((part, index) => {
                                    const highlightMatch =
                                        part.match(/\{highlight:(.*?)\}/);
                                    if (highlightMatch) {
                                        return (
                                            <span
                                                key={index}
                                                className='highlight'
                                            >
                                                {highlightMatch[1]}
                                            </span>
                                        );
                                    }
                                    return part;
                                })}
                        </motion.h3>

                        <motion.div
                            className='s-hero__content-social'
                            variants={itemVariants}
                        >
                            <motion.a
                                href={siteConfig.personal.socialMedia.linkedin}
                                target='_blank'
                                rel='noreferrer'
                                aria-label='LinkedIn'
                                variants={socialVariants}
                                whileHover='hover'
                            >
                                <i
                                    className='fab fa-linkedin'
                                    aria-hidden='true'
                                />
                            </motion.a>
                            <motion.a
                                href={siteConfig.personal.socialMedia.github}
                                target='_blank'
                                rel='noreferrer'
                                aria-label='GitHub'
                                variants={socialVariants}
                                whileHover='hover'
                            >
                                <i
                                    className='fab fa-github-square'
                                    aria-hidden='true'
                                />
                            </motion.a>
                            <motion.a
                                href={siteConfig.personal.socialMedia.facebook}
                                target='_blank'
                                rel='noreferrer'
                                aria-label='Facebook'
                                variants={socialVariants}
                                whileHover='hover'
                            >
                                <i
                                    className='fab fa-facebook-square'
                                    aria-hidden='true'
                                />
                            </motion.a>
                            <motion.a
                                href={siteConfig.personal.socialMedia.instagram}
                                target='_blank'
                                rel='noreferrer'
                                aria-label='Instagram'
                                variants={socialVariants}
                                whileHover='hover'
                            >
                                <i
                                    className='fab fa-instagram'
                                    aria-hidden='true'
                                />
                            </motion.a>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
