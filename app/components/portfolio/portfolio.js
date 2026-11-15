'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { track } from '@/lib/analytics/events';
import styles from './portfolio.module.scss';

// "More work": every project not already in Selected work, as a grid. Each
// card opens a popup with the description and a link to the live site or
// case study. Escape, the overlay or the close button dismiss it, and focus
// returns to the card that opened it.

const toWebp = src => src.replace(/\.jpe?g$/i, '.webp');

function Popup({ item, onClose }) {
    const closeRef = useRef(null);
    const internal = item.link && item.link.startsWith('/');

    useEffect(() => {
        closeRef.current?.focus();
        const onKey = e => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden'; // lock background scroll
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.dialog}
                role='dialog'
                aria-modal='true'
                aria-labelledby='project-title'
                data-surface='dark'
                onClick={e => e.stopPropagation()}
            >
                <button
                    ref={closeRef}
                    type='button'
                    className={styles.close}
                    aria-label='Close'
                    onClick={onClose}
                >
                    &times;
                </button>
                <picture className={styles.dialogMedia}>
                    <source srcSet={toWebp(item.thumbnail)} type='image/webp' />
                    <img src={item.thumbnail} alt={item.alt || item.name} />
                </picture>
                <div className={styles.dialogBody}>
                    <p className={styles.dialogMeta}>{item.companyName}</p>
                    <h3 id='project-title' className={styles.dialogTitle}>
                        {item.name}
                    </h3>
                    <p className={styles.dialogText}>{item.description}</p>
                    {item.link && (
                        <a
                            href={item.link}
                            className={styles.dialogLink}
                            {...(internal ? {} : { target: '_blank', rel: 'noreferrer' })}
                            onClick={() =>
                                track({
                                    event: 'outbound_click',
                                    url: item.link,
                                    label: item.linkText,
                                })
                            }
                        >
                            {internal ? (
                                'Read the case study →'
                            ) : (
                                <>
                                    Visit the live site ↗
                                    <span className={styles.srOnly}> (opens in a new tab)</span>
                                </>
                            )}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

const Portfolio = ({ siteConfig }) => {
    const [active, setActive] = useState(null);
    const openerRef = useRef(null);

    // The projects in Selected work are already shown above, so leave them out.
    const moreWork = useMemo(() => {
        const selected = new Set((siteConfig.selectedWork || []).map(card => card.id));
        return (siteConfig.portfolio || []).filter(item => !selected.has(item.id));
    }, [siteConfig.portfolio, siteConfig.selectedWork]);

    const open = (item, button) => {
        openerRef.current = button;
        setActive(item);
        track({ event: 'portfolio_open', item: item.name, company: item.companyName });
    };

    const close = React.useCallback(() => {
        setActive(null);
        openerRef.current?.focus();
    }, []);

    return (
        <section
            id='portfolio'
            className={`${styles.portfolio} target-section`}
            data-surface='dark'
            aria-labelledby='more-work'
        >
            <div className={styles.wrap}>
                <h2 id='more-work' className={styles.heading}>
                    More work
                </h2>

                <ul className={styles.grid}>
                    {moreWork.map(item => (
                        <li key={item.id}>
                            <button
                                type='button'
                                className={styles.card}
                                aria-haspopup='dialog'
                                onClick={e => open(item, e.currentTarget)}
                            >
                                <span className={styles.media}>
                                    <picture>
                                        <source srcSet={toWebp(item.thumbnail)} type='image/webp' />
                                        <img
                                            src={item.thumbnail}
                                            alt={item.alt || item.name}
                                            width={775}
                                            height={581}
                                            loading='lazy'
                                            decoding='async'
                                        />
                                    </picture>
                                </span>
                                <span className={styles.name}>{item.name}</span>
                                <span className={styles.company}>{item.companyName}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {active && <Popup item={active} onClose={close} />}
        </section>
    );
};

export default Portfolio;
