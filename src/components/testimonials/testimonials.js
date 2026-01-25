import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Testimonials = ({ resumeData }) => {
    const swiperRef = useRef(null);
    const swiperInstanceRef = useRef(null);

    useEffect(() => {
        // Initialize Swiper after component mounts
        const initSwiper = () => {
            if (typeof window.Swiper === 'undefined') {
                // Retry if Swiper not loaded yet
                setTimeout(initSwiper, 100);
                return;
            }

            if (swiperRef.current && !swiperInstanceRef.current) {
                swiperInstanceRef.current = new window.Swiper(swiperRef.current, {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    loop: true,
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    breakpoints: {
                        801: {
                            slidesPerView: 2,
                            spaceBetween: 48,
                        },
                    },
                });
            }
        };

        const timer = setTimeout(initSwiper, 300);

        return () => {
            clearTimeout(timer);
            if (swiperInstanceRef.current) {
                swiperInstanceRef.current.destroy(true, true);
                swiperInstanceRef.current = null;
            }
        };
    }, []);

    const headerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
            },
        },
    };

    return (
        <section id="testimonials" className="s-testimonials target-section">
            <div className="s-testimonials__bg"></div>

            <motion.div
                className="row s-testimonials__header"
                variants={headerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <div className="column large-12">
                    <h3>What People Say</h3>
                </div>
            </motion.div>

            <div className="row s-testimonials__content">
                <div className="column large-12">
                    <div className="swiper-container" ref={swiperRef}>
                        <div className="swiper-wrapper">
                            {resumeData.testimonials &&
                                resumeData.testimonials.map(testimonial => (
                                    <div
                                        className="swiper-slide testimonial-slider__slide"
                                        key={testimonial.id}
                                    >
                                        <div className="testimonial-slider">
                                            <p>&ldquo;{testimonial.quote}&rdquo;</p>
                                            <div className="testimonial-slider__author">
                                                {testimonial.avatar && (
                                                    <img
                                                        src={testimonial.avatar}
                                                        alt={testimonial.name}
                                                        className="testimonial-slider__avatar"
                                                    />
                                                )}
                                                <cite className="testimonial-slider__cite">
                                                    <strong>{testimonial.name}</strong>
                                                    <span>
                                                        {testimonial.title}
                                                        {testimonial.company && `, ${testimonial.company}`}
                                                    </span>
                                                </cite>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className="swiper-pagination"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
