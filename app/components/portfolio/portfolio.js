'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import VanillaTilt from 'vanilla-tilt';

const TiltCard = ({ children }) => {
    const tiltRef = useRef(null);

    useEffect(() => {
        if (tiltRef.current) {
            VanillaTilt.init(tiltRef.current, {
                max: 15,
                scale: 1.05,
                speed: 300,
                glare: true,
                'max-glare': 0.3,
            });
        }

        return () => {
            if (tiltRef.current && tiltRef.current.vanillaTilt) {
                tiltRef.current.vanillaTilt.destroy();
            }
        };
    }, []);

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
                    <h3>Portfolio</h3>
                </div>
            </motion.div>

            <motion.div
                className='row collapse block-large-1-4 block-medium-1-3 block-tab-1-2 block-500-stack folio-list'
                variants={containerVariants}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.1 }}
            >
                {siteConfig.portfolio &&
                    siteConfig.portfolio.map(item => {
                        return (
                            <motion.div
                                className='column folio-item'
                                key={item.id}
                                variants={itemVariants}
                            >
                                <TiltCard>
                                    <a
                                        href={'#modal-0' + item.id}
                                        className='folio-item__thumb'
                                        onClick={e => {
                                            e.preventDefault();
                                            setActiveItem(item);
                                        }}
                                    >
                                        <div className='folio-overlay'>
                                            <div className='folio-overlay-content'>
                                                <h4>{item.name}</h4>
                                                <p>{item.companyName}</p>
                                            </div>
                                        </div>
                                        <img
                                            src={item.thumbnail}
                                            srcSet={item.thumbnail}
                                            alt={item.name}
                                            loading='lazy'
                                        />
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
                            <img
                                src={activeItem.thumbnail}
                                alt={activeItem.name}
                            />
                            <div className='modal-popup__desc'>
                                <h5>
                                    {activeItem.name} -{' '}
                                    <em>{activeItem.companyName}</em>
                                </h5>
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
                            </div>
                            {activeItem.link && (
                                <a
                                    href={activeItem.link}
                                    className='modal-popup__details'
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    {activeItem.linkText}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Portfolio;
