import React from 'react';
import { motion } from 'framer-motion';

const Resume = ({ resumeData }) => {
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
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12,
            },
        },
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            boxShadow: '0 10px 30px rgba(17, 171, 176, 0.3)',
            transition: {
                type: 'spring',
                stiffness: 400,
            },
        },
        tap: {
            scale: 0.95,
        },
    };

    return (
        <section id="resume" className="s-resume target-section">
            {/* Download Resume Button */}
            <motion.div
                className="row s-resume__download"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="column large-12">
                    <motion.a
                        href={`${resumeData.system.publicUrl}/${resumeData.personal.resume.fileName}${resumeData.personal.resume.version}`}
                        className="btn btn--download"
                        target="_blank"
                        rel="noreferrer"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            style={{
                                fill: 'rgba(0, 0, 0, 1)',
                            }}
                        >
                            <path d="M12 16L16 11 13 11 13 4 11 4 11 11 8 11z" />
                            <path d="M20,18H4v-7H2v7c0,1.103,0.897,2,2,2h16c1.103,0,2-0.897,2-2v-7h-2V18z" />
                        </svg>
                        Download Resume
                    </motion.a>
                </div>
            </motion.div>

            {/* Experience Section */}
            <div className="row s-resume__section">
                <div className="column large-3 tab-12">
                    <h3 className="section-header-allcaps">
                        <i
                            className="fas fa-briefcase"
                            style={{ marginRight: '10px' }}
                        ></i>
                        Experience
                    </h3>
                </div>
                <motion.div
                    className="column large-9 tab-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {resumeData.career &&
                        resumeData.career.map(item => (
                            <motion.div
                                className="resume-block"
                                key={item.id}
                                variants={itemVariants}
                            >
                                <div className="resume-block__header">
                                    <h4 className="h3">{item.companyName}</h4>
                                    <p className="resume-block__header-meta">
                                        <span> {item.specialization}</span>{' '}
                                        <span className="resume-block__header-date">
                                            {' '}
                                            <em className="date">
                                                {item.monthOfJoining}{' '}
                                                {item.yearOfJoining} -{' '}
                                                {item.monthOfLeaving}{' '}
                                                {item.yearOfLeaving}
                                            </em>
                                        </span>
                                    </p>
                                </div>
                                <p>{item.description}</p>
                            </motion.div>
                        ))}
                </motion.div>
            </div>

            {/* Contact Section */}
            <motion.div
                className="row s-resume__contact"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className="column large-12">
                    <h3 className="section-header-allcaps">
                        <i
                            className="fas fa-envelope"
                            style={{ marginRight: '10px' }}
                        ></i>
                        Contact
                    </h3>
                    <p className="resume-contact__email">
                        {resumeData.personal.email}
                    </p>
                </div>
            </motion.div>
        </section>
    );
};

export default Resume;
