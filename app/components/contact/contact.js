'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { track } from '@/lib/analytics/events';
import EmailLink from '@/app/components/analytics/EmailLink';

// "Get in touch": the end of the home page, after the work and the experience.
// The Handful page's "Get in touch" link lands here (#contact). It uses the
// About section's styles, where this block used to live.
const Contact = ({ siteConfig }) => {
    const resumeUrl = `${siteConfig.system.publicUrl}/${siteConfig.personal.resume.fileName}${siteConfig.personal.resume.version}`;

    return (
        <section id='contact' className='s-about s-contact target-section'>
            <div className='row'>
                <motion.div
                    className='column large-12 tab-12 s-about__content'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                >
                    <div className='row s-about__content-bottom'>
                        <div className='column w-1000-stack'>
                            <h3>Get in touch</h3>
                            <p>
                                <EmailLink
                                    user={siteConfig.personal.emailUser}
                                    domain={siteConfig.personal.emailDomain}
                                />
                                <br />
                                <a
                                    href={siteConfig.personal.socialMedia.linkedin}
                                    target='_blank'
                                    rel='noreferrer'
                                    onClick={() =>
                                        track({
                                            event: 'social_click',
                                            network: 'LinkedIn',
                                        })
                                    }
                                >
                                    LinkedIn
                                </a>
                            </p>
                        </div>
                        <div className='column w-1000-stack'>
                            <motion.a
                                href={resumeUrl}
                                className='btn btn--download'
                                target='_blank'
                                rel='noreferrer'
                                onClick={() =>
                                    track({
                                        event: 'resume_download',
                                        file: siteConfig.personal.resume.fileName,
                                    })
                                }
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width={24}
                                    height={24}
                                    viewBox='0 0 24 24'
                                    style={{ fill: 'rgba(0, 0, 0, 1)' }}
                                    aria-hidden='true'
                                >
                                    <path d='M12 16L16 11 13 11 13 4 11 4 11 11 8 11z' />
                                    <path d='M20,18H4v-7H2v7c0,1.103,0.897,2,2,2h16c1.103,0,2-0.897,2-2v-7h-2V18z' />
                                </svg>
                                Download Résumé
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
