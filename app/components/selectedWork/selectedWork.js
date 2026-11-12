'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { track } from '@/lib/analytics/events';
import styles from './selectedWork.module.scss';

// "Selected work": three projects right after the hero, so the work comes first.
// The first is the large card. The rest of the work follows in the grid at #portfolio.

const isExternal = href => /^https?:\/\//.test(href);

const toWebp = src => src.replace(/\.jpe?g$/i, '.webp');

function Card({ project, card, lead }) {
    const external = isExternal(project.link);
    const image = card.image || {
        src: project.thumbnail,
        width: 1205,
        height: 903,
    };

    return (
        <motion.a
            href={project.link}
            className={lead ? `${styles.card} ${styles.lead}` : styles.card}
            {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
            onClick={() =>
                track({ event: 'selected_work_click', project: project.name })
            }
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        >
            <div className={styles.media}>
                <picture>
                    {!image.src.endsWith('.webp') && (
                        <source srcSet={`/${toWebp(image.src)}`} type='image/webp' />
                    )}
                    <img
                        src={`/${image.src}`}
                        width={image.width}
                        height={image.height}
                        alt={project.alt}
                        loading='lazy'
                        decoding='async'
                    />
                </picture>
            </div>
            <div className={styles.body}>
                <p className={styles.meta}>{project.companyName}</p>
                <h3 className={styles.title}>{project.name}</h3>
                <p className={styles.text}>{card.summary}</p>
                <span className={styles.go}>
                    {card.linkText}
                    {external ? ' ↗' : ' →'}
                    {external && (
                        <span className={styles.srOnly}> (opens in a new tab)</span>
                    )}
                </span>
            </div>
        </motion.a>
    );
}

const SelectedWork = ({ siteConfig }) => {
    const cards = siteConfig.selectedWork
        .map(card => ({
            card,
            project: siteConfig.portfolio.find(p => p.id === card.id),
        }))
        .filter(({ project }) => project);

    if (!cards.length) return null;
    const [first, ...rest] = cards;

    return (
        <section id='work' className={styles.work} aria-labelledby='selected-work'>
            <div className={styles.wrap}>
                <div className={styles.head}>
                    <h2 id='selected-work' className={styles.heading}>
                        Selected work
                    </h2>
                    <a href='#portfolio' className={styles.all}>
                        More work ↓
                    </a>
                </div>

                <Card project={first.project} card={first.card} lead />

                <div className={styles.pair}>
                    {rest.map(({ project, card }) => (
                        <Card key={project.id} project={project} card={card} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SelectedWork;
