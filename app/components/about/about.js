'use client';

import React from 'react';
import { motion } from 'framer-motion';

const About = ({ siteConfig }) => {
    const contentVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
            },
        },
    };

    return (
        <section id='about' className='s-about target-section'>
            <div className='row'>
                <motion.div
                    className='column large-12 tab-12 s-about__content'
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, amount: 0.2 }}
                    variants={contentVariants}
                >
                    <motion.h3 variants={itemVariants}>About Me</motion.h3>

                    <motion.p variants={itemVariants}>
                        I have always been a creative problem-solver. One of the
                        most rewarding parts of my career is birthing ideas into
                        impactful solutions.
                    </motion.p>

                    <motion.p variants={itemVariants}>
                        I’ve been making websites since the early dawn of the
                        internet. A lot has changed since then, which is why I
                        am always eager to learn new technologies to help others
                        stay current.
                    </motion.p>

                    <motion.p variants={itemVariants}>
                        Creating intuitive user experiences is important to me.
                        The journey a user takes to get where they need to go
                        should be easy to follow and even enjoyable.
                    </motion.p>

                    <motion.p variants={itemVariants}>
                        Collaboration and positivity are central to how I work.
                        Great results come from great teams, and I value
                        environments where efficiency, quality and a human touch
                        are in balance.
                    </motion.p>

                </motion.div>
            </div>
        </section>
    );
};

export default About;
