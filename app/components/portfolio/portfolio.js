'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import VanillaTilt from 'vanilla-tilt';
import { track } from '@/lib/analytics/events';

const TiltCard = ({ children, enabled = true, options }) => {
    const tiltRef = useRef(null);

    useEffect(() => {
        if (!enabled || !tiltRef.current) return;

        const node = tiltRef.current;
        VanillaTilt.init(node, options);

        return () => {
            if (node.vanillaTilt) node.vanillaTilt.destroy();
        };
    }, [enabled, options]);

    return (
        <div ref={tiltRef} style={{ height: '100%' }}>
            {children}
        </div>
    );
};

const Portfolio = ({ siteConfig }) => {
    // React-managed lightbox. Replaces the Ceevee main.js ssLightbox() +
    // the old window.basicLightbox dependency: clicking a thumbnail opens a
    // modal for that item; Escape / overlay click / close button dismiss it.
    const [activeItem, setActiveItem] = useState(null);

    // 3D tilt: gated by the feature toggle, parameters read from siteConfig
    // so app/siteConfig.js actually controls the effect.
    const tiltEnabled = siteConfig.features.portfolioTilt;
    const tiltOptions = useMemo(
        () => ({
            max: siteConfig.portfolioTilt.maxTilt,
            scale: siteConfig.portfolioTilt.scale,
            speed: siteConfig.portfolioTilt.speed,
            glare: siteConfig.portfolioTilt.glare,
            'max-glare': siteConfig.portfolioTilt.maxGlare,
        }),
        [siteConfig.portfolioTilt],
    );

    // The projects in Selected work are already shown above, so leave them out.
    const moreWork = useMemo(() => {
        const selected = new Set(
            (siteConfig.selectedWork || []).map(card => card.id),
        );
        return (siteConfig.portfolio || []).filter(
            item => !selected.has(item.id),
        );
    }, [siteConfig.portfolio, siteConfig.selectedWork]);

    useEffect(() => {
        if (!activeItem) return;

        const onKey = e => {
            if (e.key === 'Escape') setActiveItem(null);
        };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden'; // lock background scroll

        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [activeItem]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
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

    return (
        <section id='portfolio' className='s-portfolio target-section'>
            <motion.div
                className='row s-portfolio__header'
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
            >
                <div className='column large-12'>
                    <h3>More work</h3>
                </div>
            </motion.div>

            <motion.div
                className='row collapse block-large-1-4 block-medium-1-3 block-tab-1-2 block-500-stack folio-list'
                variants={containerVariants}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.1 }}
            >
                {moreWork.map(item => {
                        return (
                            <motion.div
                                className='column folio-item'
                                key={item.id}
                                variants={itemVariants}
                            >
                                <TiltCard
                                    enabled={tiltEnabled}
                                    options={tiltOptions}
                                >
                                    <a
                                        href={'#modal-0' + item.id}
                                        className='folio-item__thumb'
                                        onClick={e => {
                                            e.preventDefault();
                                            setActiveItem(item);
                                            track({
                                                event: 'portfolio_open',
                                                item: item.name,
                                                company: item.companyName,
                                            });
                                        }}
                                    >
                                        <picture>
                                            <source
                                                srcSet={item.thumbnail.replace(
                                                    /\.jpe?g$/i,
                                                    '.webp',
                                                )}
                                                type='image/webp'
                                            />
                                            <img
                                                src={item.thumbnail}
                                                alt={item.alt || item.name}
                                                width={775}
                                                height={581}
                                                loading='lazy'
                                                decoding='async'
                                            />
                                        </picture>
                                        <div className='folio-caption'>
                                            <h4>{item.name}</h4>
                                            <p>{item.companyName}</p>
                                        </div>
                                    </a>
                                </TiltCard>
                            </motion.div>
                        );
                    })}
            </motion.div>

            {activeItem && (
                <div
                    className='folio-modal-overlay'
                    onClick={() => setActiveItem(null)}
                    role='dialog'
                    aria-modal='true'
                >
                    <div
                        className='folio-modal'
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            type='button'
                            className='folio-modal__close'
                            aria-label='Close'
                            onClick={() => setActiveItem(null)}
                        >
                            &times;
                        </button>
                        <div className='modal-popup'>
                            <picture>
                                <source
                                    srcSet={activeItem.thumbnail.replace(
                                        /\.jpe?g$/i,
                                        '.webp',
                                    )}
                                    type='image/webp'
                                />
                                <img
                                    src={activeItem.thumbnail}
                                    alt={activeItem.alt || activeItem.name}
                                />
                            </picture>
                            <div className='modal-popup__desc'>
                                <p className='folio-modal__meta'>
                                    {activeItem.companyName}
                                </p>
                                <h4 className='folio-modal__title'>
                                    {activeItem.name}
                                </h4>
                                <p>{activeItem.description}</p>
                                {activeItem.listTitle && (
                                    <div>
                                        {activeItem.listTitle}
                                        <ul>
                                            {activeItem.listItems &&
                                                activeItem.listItems.map(
                                                    listItem => (
                                                        <li key={listItem.id}>
                                                            {listItem.text}
                                                        </li>
                                                    ),
                                                )}
                                        </ul>
                                    </div>
                                )}
                                {activeItem.link && (
                                    // Under the description, so it doesn't sit on the screenshot.
                                    // Pages on this site (like /portfolio/handful/) open in the same tab.
                                    <a
                                        href={activeItem.link}
                                        className='folio-modal__link'
                                        target={activeItem.link.startsWith('/') ? undefined : '_blank'}
                                        rel={activeItem.link.startsWith('/') ? undefined : 'noreferrer'}
                                        onClick={() =>
                                            track({
                                                event: 'outbound_click',
                                                url: activeItem.link,
                                                label: activeItem.linkText,
                                            })
                                        }
                                    >
                                        {activeItem.link.startsWith('/') ? (
                                            'Read the case study →'
                                        ) : (
                                            <>
                                                Visit the live site ↗
                                                <span className='visually-hidden'>
                                                    {' '}
                                                    (opens in a new tab)
                                                </span>
                                            </>
                                        )}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Portfolio;
