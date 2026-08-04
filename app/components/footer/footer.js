'use client';

import React, { useState, useEffect } from 'react';
import { track } from '@/lib/analytics/events';

const Footer = ({ siteConfig }) => {
    // Show the "back to top" button once the user has scrolled down a bit.
    // Replaces the Ceevee main.js ssBackToTop() behavior.
    const [showGoTop, setShowGoTop] = useState(false);

    useEffect(() => {
        const pxShow = 900;
        const onScroll = () => setShowGoTop(window.scrollY >= pxShow);

        onScroll(); // sync on mount in case the page loads already scrolled
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <React.Fragment>
            <footer className='s-footer'>
                <div className='row'>
                    <div className='column large-4 medium-6 w-1000-stack s-footer__social-block'>
                        <ul className='s-footer__social'>
                            <li>
                                <a
                                    href={
                                        siteConfig.personal.socialMedia.linkedin
                                    }
                                    aria-label='LinkedIn'
                                    onClick={() =>
                                        track({
                                            event: 'social_click',
                                            network: 'LinkedIn',
                                        })
                                    }
                                >
                                    <i
                                        className='fab fa-linkedin-in'
                                        aria-hidden='true'
                                    />
                                </a>
                            </li>
                            <li>
                                <a
                                    href={
                                        siteConfig.personal.socialMedia.github
                                    }
                                    target='_blank'
                                    rel='noreferrer'
                                    aria-label='GitHub'
                                    onClick={() =>
                                        track({
                                            event: 'social_click',
                                            network: 'GitHub',
                                        })
                                    }
                                >
                                    <i
                                        className='fab fa-github-square'
                                        aria-hidden='true'
                                    />
                                </a>
                            </li>
                            <li>
                                <a
                                    href={
                                        siteConfig.personal.socialMedia.facebook
                                    }
                                    aria-label='Facebook'
                                    onClick={() =>
                                        track({
                                            event: 'social_click',
                                            network: 'Facebook',
                                        })
                                    }
                                >
                                    <i
                                        className='fab fa-facebook-f'
                                        aria-hidden='true'
                                    />
                                </a>
                            </li>
                            <li>
                                <a
                                    href={
                                        siteConfig.personal.socialMedia
                                            .instagram
                                    }
                                    aria-label='Instagram'
                                    onClick={() =>
                                        track({
                                            event: 'social_click',
                                            network: 'Instagram',
                                        })
                                    }
                                >
                                    <i
                                        className='fab fa-instagram'
                                        aria-hidden='true'
                                    />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='column large-7 medium-6 w-1000-stack ss-copyright'>
                        <span>
                            &copy; {new Date().getFullYear()} Matthew Renfer |
                            All rights reserved
                        </span>
                    </div>
                </div>
                <div className={`ss-go-top${showGoTop ? ' link-is-visible' : ''}`}>
                    <a
                        className='smoothscroll'
                        title='Back to Top'
                        aria-label='Back to top'
                        href='#top'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            aria-hidden='true'
                        >
                            <path d='M6 4h12v2H6zm5 10v6h2v-6h5l-6-6-6 6z' />
                        </svg>
                    </a>
                </div>{' '}
            </footer>
        </React.Fragment>
    );
};

export default Footer;
