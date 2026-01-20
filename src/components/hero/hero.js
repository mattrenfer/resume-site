import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import config from '../../siteConfig';

const Hero = ({ resumeData }) => {
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

    // Memoize particles initialization
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    // Memoize particles configuration
    const particlesConfig = useMemo(() => ({
        background: {
            opacity: 0,
        },
        fpsLimit: config.particles.fpsLimit,
        particles: {
            color: {
                value: config.theme.particleColors,
            },
            links: {
                color: config.particles.links.color,
                distance: config.particles.links.distance,
                enable: config.particles.links.enable,
                opacity: config.particles.links.opacity,
                width: config.particles.links.width,
            },
            move: {
                enable: true,
                speed: config.particles.speed,
                direction: config.particles.direction,
                random: true,
                straight: false,
                outModes: {
                    default: 'bounce',
                },
            },
            number: {
                density: {
                    enable: config.particles.density.enable,
                    area: config.particles.density.area,
                },
                value: config.particles.number,
            },
            opacity: {
                value: config.particles.opacity,
                random: true,
                animation: {
                    enable: config.particles.opacityAnimation.enable,
                    speed: config.particles.opacityAnimation.speed,
                    minimumValue:
                        config.particles.opacityAnimation.minimumValue,
                },
            },
            shape: {
                type: config.particles.shapes,
            },
            size: {
                value: {
                    min: config.particles.sizeMin,
                    max: config.particles.sizeMax,
                },
                random: true,
            },
        },
        interactivity: {
            events: {
                onHover: {
                    enable: config.particles.interactivity.hover.enable,
                    mode: config.particles.interactivity.hover.mode,
                },
                onClick: {
                    enable: config.particles.interactivity.click.enable,
                    mode: config.particles.interactivity.click.mode,
                },
            },
            modes: {
                grab: {
                    distance: config.particles.interactivity.grab.distance,
                    links: {
                        opacity:
                            config.particles.interactivity.grab.lineLinked
                                .opacity,
                    },
                },
                repulse: {
                    distance: config.particles.interactivity.repulse.distance,
                    duration: config.particles.interactivity.repulse.duration,
                    speed: config.particles.interactivity.repulse.speed,
                },
                push: {
                    quantity: 4,
                },
                remove: {
                    quantity: 2,
                },
            },
        },
        detectRetina: true,
    }), []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
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
            <div className='s-hero__bg'>
                <Particles
                    id='hero-particles'
                    init={particlesInit}
                    options={particlesConfig}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 1,
                    }}
                />
            </div>

            <motion.div
                className='row s-hero__content'
                variants={containerVariants}
                initial='hidden'
                animate='visible'
            >
                <div className='column'>
                    <div className='s-hero__content-about'>
                        <motion.h1 variants={itemVariants}>
                            {resumeData.personal.name}
                        </motion.h1>

                        <motion.h2 variants={itemVariants}>
                            <em>
                                {displayRole}
                                <span className='cursor-blink'>|</span>
                            </em>
                        </motion.h2>

                        <motion.div
                            className='status-badge'
                            variants={itemVariants}
                            animate={{
                                boxShadow: [
                                    '0 0 0 0 rgba(17, 171, 176, 0.4)',
                                    '0 0 0 8px rgba(17, 171, 176, 0)',
                                ],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeOut',
                            }}
                        >
                            <span className='status-dot'>●</span>
                            <span className='status-text'>Available for your next project</span>
                            <span className='status-types'>Contract • Part-Time • Full-Time</span>
                        </motion.div>

                        <br />

                        <motion.h3 variants={itemVariants}>
                            {config.hero.tagline.split(/(\{highlight:.*?\})/).map((part, index) => {
                                const highlightMatch = part.match(/\{highlight:(.*?)\}/);
                                if (highlightMatch) {
                                    return <span key={index} className='highlight'>{highlightMatch[1]}</span>;
                                }
                                return part;
                            })}
                        </motion.h3>

                        <motion.div
                            className='s-hero__content-social'
                            variants={itemVariants}
                        >
                            <motion.a
                                href={resumeData.personal.socialMedia.linkedin}
                                target='_blank'
                                rel='noreferrer'
                                variants={socialVariants}
                                whileHover='hover'
                            >
                                <i
                                    className='fab fa-linkedin'
                                    aria-hidden='true'
                                />
                            </motion.a>
                            <motion.a
                                href={resumeData.personal.socialMedia.github}
                                target='_blank'
                                rel='noreferrer'
                                variants={socialVariants}
                                whileHover='hover'
                            >
                                <i
                                    className='fab fa-github-square'
                                    aria-hidden='true'
                                />
                            </motion.a>
                            <motion.a
                                href={resumeData.personal.socialMedia.facebook}
                                target='_blank'
                                rel='noreferrer'
                                variants={socialVariants}
                                whileHover='hover'
                            >
                                <i
                                    className='fab fa-facebook-square'
                                    aria-hidden='true'
                                />
                            </motion.a>
                            <motion.a
                                href={resumeData.personal.socialMedia.instagram}
                                target='_blank'
                                rel='noreferrer'
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

            <motion.div
                className='s-hero__scroll'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <motion.a
                    href='#about'
                    className='s-hero__scroll-link smoothscroll'
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: 'easeInOut',
                    }}
                >
                    <span className='scroll-arrow'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width={24}
                            height={24}
                            viewBox='0 0 24 24'
                            style={{
                                fill: 'rgba(0, 0, 0, 1)',
                                transform: '',
                                msFilter: '',
                            }}
                        >
                            <path d='M18.707 12.707L17.293 11.293 13 15.586 13 6 11 6 11 15.586 6.707 11.293 5.293 12.707 12 19.414z' />
                        </svg>
                    </span>
                    <span className='scroll-text'>Scroll Down</span>
                </motion.a>
            </motion.div>
        </section>
    );
};

export default Hero;
