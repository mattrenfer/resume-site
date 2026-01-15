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
                        I have always been a problem-solver who thinks
                        in logical, systematic ways&mdash;engaging the
                        creative process along the way. A big part of
                        what I love in my career is birthing ideas into
                        practical, impactful solutions.
                    </motion.p>

                    <motion.p variants={itemVariants}>
                        I&apos;ve been making websites since the early
                        dawn of the internet. A lot has changed since
                        then, which is why I am always eager to learn
                        newer technologies and expand my web development
                        toolkit, keeping clients ahead of the curve.
                    </motion.p>

                    <motion.p variants={itemVariants}>
                        Creating intuitive user experiences is important
                        to me. The journey a user takes to get where
                        they need to go should be easy to follow and
                        even enjoyable.
                    </motion.p>

                    <motion.p variants={itemVariants}>
                        Collaboration and positivity are central to how
                        I work. Great results come from great teams, and
                        I value environments where efficiency meets
                        balance. After all, it&apos;s not just about the
                        work we do, but how we do it.
                    </motion.p>

                    <motion.hr variants={itemVariants} />

                    <motion.div
                        className='row s-about__content-bottom'
                        variants={itemVariants}
                    >
                        <div className='column w-1000-stack'>
                            <h3>Contact Details</h3>
                            <p>
                                <br />
                                {resumeData.personal.email}
                            </p>
                        </div>
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
