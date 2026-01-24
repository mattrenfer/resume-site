import React from 'react';
import { motion } from 'framer-motion';
import './WorkWithMe.css';
import config from '../../siteConfig';

const WorkWithMe = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12,
            },
        },
    };

    const cardVariants = {
        hidden: { y: 40, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12,
            },
        },
    };

    const engagementTypes = [
        {
            id: 1,
            icon: 'fas fa-rocket',
            question: 'Quick project?',
            title: 'Contract',
            description: 'A focused project with clear goals',
        },
        {
            id: 2,
            icon: 'fas fa-sync-alt',
            question: 'Ongoing thing?',
            title: 'Part-Time',
            description: 'Ongoing work, flexible hours',
        },
        {
            id: 3,
            icon: 'fas fa-users',
            question: 'Want me on your team?',
            title: 'Full-Time',
            description: 'Join your team full-time',
        },
    ];

    return (
        <section id="work-with-me" className="s-work-with-me target-section">
            <div className="row">
                <motion.div
                    className="column large-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.h3 className="work-with-me__title" variants={itemVariants}>
                        Need a hand?
                    </motion.h3>
                    <motion.p className="work-with-me__subtitle" variants={itemVariants}>
                        Here&apos;s how we could collaborate
                    </motion.p>

                    <motion.div
                        className="work-with-me__cards"
                        variants={containerVariants}
                    >
                        {engagementTypes.map((type) => (
                            <motion.div
                                key={type.id}
                                className="work-with-me__card"
                                variants={cardVariants}
                                whileHover={{
                                    y: -8,
                                    transition: { type: 'spring', stiffness: 300 },
                                }}
                            >
                                <div className="work-with-me__card-icon">
                                    <i className={type.icon} />
                                </div>
                                <p className="work-with-me__card-question">{type.question}</p>
                                <h4 className="work-with-me__card-title">{type.title}</h4>
                                <p className="work-with-me__card-description">
                                    {type.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div className="work-with-me__cta" variants={itemVariants}>
                        <a
                            href={`mailto:${config.personal.email.replace(" [at] ", "@")}`}
                            className="work-with-me__button"
                        >
                            Say hello
                        </a>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
};

export default WorkWithMe;
