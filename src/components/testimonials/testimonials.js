import React from 'react';

const Testimonials = ({ siteConfig }) => {
    return (
        <section id='testimonials' className='s-testimonials target-section'>
            <div className='row'>
                <div className='column large-12 tab-12'>
                    <h2>Testimonials</h2>
                    <div className='testimonial-slider'>
                        <div className='testimonial-slider__slide'>
                            <p>
                                &quot;{siteConfig.testimonials[0].testimonial}
                                &quot;
                            </p>
                            <div className='testimonial-slider__author'>
                                <img
                                    src={siteConfig.testimonials[0].avatar}
                                    alt={siteConfig.testimonials[0].name}
                                />
                                <span>{siteConfig.testimonials[0].name}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
