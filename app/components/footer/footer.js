'use client';

import React, { useEffect, useState } from 'react';
import { track } from '@/lib/analytics/events';
import styles from './footer.module.scss';

// Site footer (home page and the Handful page): social links, copyright, and
// a back-to-top link that appears once you've scrolled.
const SOCIAL = [
    { key: 'linkedin', label: 'LinkedIn', icon: 'fab fa-linkedin-in', external: true },
    { key: 'github', label: 'GitHub', icon: 'fab fa-github', external: true },
    { key: 'facebook', label: 'Facebook', icon: 'fab fa-facebook-f', external: true },
    { key: 'instagram', label: 'Instagram', icon: 'fab fa-instagram', external: true },
];

const Footer = ({ siteConfig }) => {
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const onScroll = () => setShowTop(window.scrollY >= 900);
        onScroll(); // in case the page loads already scrolled
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <footer className={styles.footer} data-surface='dark'>
            <div className={styles.wrap}>
                <p className={styles.copyright}>
                    &copy; {new Date().getFullYear()} Matthew Renfer
                </p>
                <ul className={styles.social}>
                    {SOCIAL.map(s => (
                        <li key={s.key}>
                            <a
                                href={siteConfig.personal.socialMedia[s.key]}
                                aria-label={s.label}
                                target='_blank'
                                rel='noreferrer'
                                onClick={() => track({ event: 'social_click', network: s.label })}
                            >
                                <i className={s.icon} aria-hidden='true' />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <a
                href='#top'
                className={`${styles.top}${showTop ? ` ${styles.topVisible}` : ''}`}
                aria-label='Back to top'
                tabIndex={showTop ? 0 : -1}
            >
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden='true'>
                    <path d='M6 4h12v2H6zm5 10v6h2v-6h5l-6-6-6 6z' />
                </svg>
            </a>
        </footer>
    );
};

export default Footer;
