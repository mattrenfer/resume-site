import React from 'react';
import styles from './hero.module.scss';

// The first screen: name, what I do, one way to the work, and the photo.
// PNW Professional: warm light surface, Lora name, a thin warm rule, no
// shadows. No animation here; the page's one flourish lives elsewhere.
//
// It's a server component on purpose: everything renders in the HTML, so the
// name and photo paint without waiting for JavaScript.

// Turns "{em:word}" in the lead into <em>word</em>.
function Lead({ text }) {
    return text.split(/(\{em:.*?\})/).map((part, i) => {
        const match = part.match(/^\{em:(.*)\}$/);
        return match ? <em key={i}>{match[1]}</em> : part;
    });
}

const Hero = ({ siteConfig }) => {
    const { personal, hero } = siteConfig;
    const { photo } = hero;
    const resumeUrl = `${siteConfig.system.publicUrl}/${personal.resume.fileName}${personal.resume.version}`;
    // Display name without the middle name, as on the résumé and LinkedIn.
    const name = personal.name.replace(/\s+Russell\s+/, ' ');

    return (
        <section
            id='hero'
            className={`${styles.hero} target-section`}
            data-surface='light'
            aria-labelledby='hero-name'
        >
            <picture className={styles.photo}>
                <source
                    type='image/webp'
                    srcSet={`${photo.src}-900.webp 900w, ${photo.src}-1600.webp 1600w`}
                    sizes='(max-width: 860px) 100vw, 42vw'
                />
                <img
                    src={`${photo.src}-1600.jpg`}
                    srcSet={`${photo.src}-900.jpg 900w, ${photo.src}-1600.jpg 1600w`}
                    sizes='(max-width: 860px) 100vw, 42vw'
                    width={photo.width}
                    height={photo.height}
                    alt={photo.alt}
                    fetchPriority='high'
                    decoding='async'
                />
            </picture>

            <div className={styles.inner}>
                <div className={styles.text}>
                    <p className={styles.kicker}>{personal.role}</p>
                    <h1 id='hero-name' className={styles.name}>
                        {name}
                    </h1>
                    <p className={styles.lead}>
                        <Lead text={hero.lead} />
                    </p>

                    <div className={styles.actions}>
                        <a
                            href='#work'
                            className={styles.button}
                            data-track='cta_click'
                            data-track-label='See my work'
                            data-track-location='hero'
                        >
                            See my work
                        </a>
                        <a
                            href={resumeUrl}
                            className={styles.textLink}
                            target='_blank'
                            rel='noreferrer'
                            data-track='resume_download'
                            data-track-file={personal.resume.fileName}
                            data-track-location='hero'
                        >
                            Résumé <span aria-hidden='true'>→</span>
                            <span className={styles.srOnly}> (PDF, opens in a new tab)</span>
                        </a>
                    </div>

                    <ul className={styles.meta}>
                        <li>{hero.location}</li>
                        <li>
                            <a
                                href={personal.socialMedia.linkedin}
                                target='_blank'
                                rel='noreferrer'
                                data-track='social_click'
                                data-track-network='LinkedIn'
                                data-track-location='hero'
                            >
                                LinkedIn
                            </a>
                        </li>
                        <li>
                            <a
                                href={personal.socialMedia.github}
                                target='_blank'
                                rel='noreferrer'
                                data-track='social_click'
                                data-track-network='GitHub'
                                data-track-location='hero'
                            >
                                GitHub
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Hero;
