import React from 'react';
import { motion } from 'framer-motion';

const About = ({ resumeData }) => {
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
                duration: 0.8
            }
        }
    };

    const contentVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        }
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            boxShadow: '0 10px 30px rgba(17, 171, 176, 0.3)',
            transition: {
                type: 'spring',
                stiffness: 400
            }
        },
        tap: {
            scale: 0.95
        }
    };

    return (
        <section id='about' className='s-about target-section'>
            <div className='row'>
                <motion.div
                    className='column large-3 tab-12'
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={imageVariants}
                >
                    <motion.img
                        className='s-about__pic'
                        src={resumeData.about.profileImage}
                        alt='Profile'
                        whileHover={{
                            scale: 1.05,
                            rotate: 2,
                            transition: { duration: 0.3 }
                        }}
                    />
                </motion.div>

                <motion.div
                    className='column large-9 tab-12 s-about__content'
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={contentVariants}
                >
                    <motion.h3 variants={itemVariants}>About Me</motion.h3>

                    <motion.p variants={itemVariants}>
                        I started building websites as a teenager &mdash; not
                        because I wanted to be a programmer, but because I
                        wanted to tell stories through code. The early web felt like a
                        frontier where it was possible to create something from
                        nothing. That sense of possibility hasn&apos;t left me.
                    </motion.p>

                    <motion.p variants={itemVariants}>
                        Every project is a blank canvas. The code, the design,
                        the interactions &mdash; they should all serve the story
                        you&apos;re trying to tell. And the journey someone takes
                        through that story should feel effortless, even
                        enjoyable.
                    </motion.p>

                    <motion.p variants={itemVariants}>
                        I&apos;ve spent 15+ years collaborating with people to
                        bring their ideas to life. The best projects happen
                        when we figure out together what that canvas should
                        become. It&apos;s not just about the work we do, but
                        how we do it.
                    </motion.p>

                    <motion.hr variants={itemVariants} />

                    <motion.div
                        className='row s-about__content-bottom'
                        variants={itemVariants}
                    >

                        <div className='column w-1000-stack'>
                            <motion.a
                                href={`${resumeData.system.publicUrl}/${resumeData.personal.resume.fileName}${resumeData.personal.resume.version}`}
                                className='btn btn--download'
                                target='_blank'
                                rel='noreferrer'
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
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
                                    <path d='M12 16L16 11 13 11 13 4 11 4 11 11 8 11z' />
                                    <path d='M20,18H4v-7H2v7c0,1.103,0.897,2,2,2h16c1.103,0,2-0.897,2-2v-7h-2V18z' />
                                </svg>
                                View CV
                            </motion.a>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
