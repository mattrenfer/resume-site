import React from 'react';
import { motion } from 'framer-motion';
import './specialties.css';

const Specialties = ({ resumeData }) => {
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
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12,
            },
        },
    };

    return (
        <section id="specialties" className="s-specialties target-section">
            <div className="row specialties-header">
                <div className="column large-12">
                    <h3 className="section-header-allcaps">
                        <i
                            className="fas fa-tools"
                            style={{ marginRight: '10px' }}
                        ></i>
                        Specialties
                    </h3>
                </div>
            </div>

            <div className="row">
                <div className="column large-12">
                    <motion.div
                        className="specialties-grid"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {resumeData.specialties &&
                            resumeData.specialties.map(item => (
                                <motion.div
                                    key={item.id}
                                    className="specialty-item"
                                    variants={itemVariants}
                                >
                                    <h4 className="specialty-title">
                                        {item.title}
                                    </h4>
                                    <p className="specialty-skills">
                                        {item.skills}
                                    </p>
                                    <p className="specialty-blurb">
                                        {item.blurb}
                                    </p>
                                </motion.div>
                            ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Specialties;
