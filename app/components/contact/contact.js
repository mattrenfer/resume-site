'use client';

import React from 'react';
import { track } from '@/lib/analytics/events';
import EmailLink from '@/app/components/analytics/EmailLink';
import styles from './contact.module.scss';

// "Get in touch": the end of the home page. The Handful page's "Get in touch"
// link lands here (#contact). Email is the one button; LinkedIn and the résumé
// are text links, like the hero. The address is repeated so it can be copied.
const Contact = ({ siteConfig }) => {
    const { personal } = siteConfig;
    const resumeUrl = `${siteConfig.system.publicUrl}/${personal.resume.fileName}${personal.resume.version}`;

    return (
        <section
            id='contact'
            className={`${styles.contact} target-section`}
            data-surface='dark'
            aria-labelledby='contact-heading'
        >
            <div className={styles.wrap}>
                <h2 id='contact-heading' className={styles.heading}>
                    Get in touch
                </h2>

                <div className={styles.actions}>
                    <EmailLink
                        user={personal.emailUser}
                        domain={personal.emailDomain}
                        label='Email me'
                        className={styles.button}
                    />
                    <a
                        href={personal.socialMedia.linkedin}
                        className={styles.textLink}
                        target='_blank'
                        rel='noreferrer'
                        onClick={() => track({ event: 'social_click', network: 'LinkedIn' })}
                    >
                        LinkedIn <span aria-hidden='true'>↗</span>
                        <span className={styles.srOnly}> (opens in a new tab)</span>
                    </a>
                    <a
                        href={resumeUrl}
                        className={styles.textLink}
                        target='_blank'
                        rel='noreferrer'
                        onClick={() =>
                            track({ event: 'resume_download', file: personal.resume.fileName })
                        }
                    >
                        Résumé <span aria-hidden='true'>→</span>
                        <span className={styles.srOnly}> (PDF, opens in a new tab)</span>
                    </a>
                </div>

                <p className={styles.address}>
                    <EmailLink user={personal.emailUser} domain={personal.emailDomain} />
                </p>
            </div>
        </section>
    );
};

export default Contact;
