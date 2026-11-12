'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { track } from '@/lib/analytics/events';
import EmailLink from '@/app/components/analytics/EmailLink';

// "Get in touch": the end of the home page, after the work and the experience.
// The Handful page's "Get in touch" link lands here (#contact). Email is the
// main action (solid button); LinkedIn and the résumé are outlined, like the
// hero's buttons. The address is repeated as text so it can be copied.
const Contact = ({ siteConfig }) => {
    const { personal } = siteConfig;
    const resumeUrl = `${siteConfig.system.publicUrl}/${personal.resume.fileName}${personal.resume.version}`;

    return (
        <section id='contact' className='s-about s-contact target-section'>
            <div className='row'>
                <motion.div
                    className='column large-12 tab-12'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                >
                    <h3>Get in touch</h3>

                    <div className='s-hero__actions'>
                        <EmailLink
                            user={personal.emailUser}
                            domain={personal.emailDomain}
                            label='Email me'
                            className='btn s-hero__btn s-hero__btn--solid'
                        />
                        <a
                            href={personal.socialMedia.linkedin}
                            className='btn s-hero__btn s-hero__btn--line'
                            target='_blank'
                            rel='noreferrer'
                            onClick={() =>
                                track({ event: 'social_click', network: 'LinkedIn' })
                            }
                        >
                            LinkedIn
                        </a>
                        <a
                            href={resumeUrl}
                            className='btn s-hero__btn s-hero__btn--line'
                            target='_blank'
                            rel='noreferrer'
                            onClick={() =>
                                track({
                                    event: 'resume_download',
                                    file: personal.resume.fileName,
                                })
                            }
                        >
                            Résumé
                        </a>
                    </div>

                    <p className='s-contact__address'>
                        <EmailLink
                            user={personal.emailUser}
                            domain={personal.emailDomain}
                        />
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
