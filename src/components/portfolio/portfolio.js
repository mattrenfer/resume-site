import React, { useEffect, useRef } from 'react';
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
    // Reinitialize BasicLightbox after component mounts
    useEffect(() => {
        // Wait for DOM to be ready
        const timer = setTimeout(() => {
            const folioLinks = document.querySelectorAll('.folio-item a');
            const modals = [];

            // Check if BasicLightbox is available
            if (typeof window.basicLightbox === 'undefined') {
                console.warn('BasicLightbox not loaded');
                return;
            }

            folioLinks.forEach(link => {
                const modalbox = link.getAttribute('href');
                const modalElement = document.querySelector(modalbox);

                if (modalElement) {
                    const instance = window.basicLightbox.create(modalElement, {
                        onShow: function (instance) {
                            document.addEventListener(
                                'keydown',
                                function (evt) {
                                    evt = evt || window.event;
                                    if (evt.keyCode === 27) {
                                        instance.close();
                                    }
                                },
                            );
                        },
                    });
                    modals.push(instance);
                }
            });

            folioLinks.forEach((link, index) => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (modals[index]) {
                        modals[index].show();
                    }
                });
            });
        }, 500); // Small delay to ensure DOM is ready

        return () => clearTimeout(timer);
    }, [siteConfig.portfolio]);

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

            {siteConfig.portfolio &&
                siteConfig.portfolio.map(item => {
                    return (
                        <div id={'modal-0' + item.id} key={item.id} hidden>
                            <div className='modal-popup'>
                                <img src={item.thumbnail} alt={item.name} />
                                <div className='modal-popup__desc'>
                                    <h5>
                                        {item.name} -{' '}
                                        <em>{item.companyName}</em>
                                    </h5>
                                    <p>{item.description}</p>
                                    {item.listTitle && (
                                        <div>
                                            {item.listTitle}
                                            <ul>
                                                {item.listItems &&
                                                    item.listItems.map(
                                                        listItem => {
                                                            return (
                                                                <li
                                                                    key={
                                                                        listItem.id
                                                                    }
                                                                >
                                                                    {
                                                                        listItem.text
                                                                    }
                                                                </li>
                                                            );
                                                        },
                                                    )}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                {item.link && (
                                    <a
                                        href={item.link}
                                        className='modal-popup__details'
                                        target='_blank'
                                        rel='noreferrer'
                                    >
                                        {item.linkText}
                                    </a>
                                )}
                            </div>
                        </div>
                    );
                })}
        </section>
    );
};

export default Portfolio;
