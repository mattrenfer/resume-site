'use client';

import React from 'react';
import Link from 'next/link';
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
                        I&rsquo;ve been building for the web for 15+ years, and in
                        that time the work has come in every form, from detailed
                        specs to hallway conversations. I&rsquo;m comfortable with
                        both. When the requirements are clear, I build to them.
                        When they aren&rsquo;t, I help clarify them, then deliver.
                    </motion.p>

                    <motion.p variants={itemVariants}>
                        I learned to work both ways at a university, where
                        requests came in from every department, from quick page
                        updates to database-driven applications. Agency work
                        later had me moving between tech stacks and industries to
                        meet each client&rsquo;s requirements. On in-house teams,
                        it&rsquo;s often meant taking a loosely defined need,
                        digging into the codebase to work out what it actually
                        involves, and pushing it through to production.
                    </motion.p>

                    <motion.p variants={itemVariants}>
                        I also build personal projects. The most recent is{' '}
                        <Link href='/portfolio/handful/'>Handful</Link>, a client
                        tracker I made because every CRM I tried was either too
                        thin or too much. Before development, I worked in
                        professional writing and journalism, and those skills
                        still show up in how I work: asking thoughtful questions
                        and saying things plainly.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
