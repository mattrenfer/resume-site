'use client';

// "What it does": on a wide screen, the features take turns. The active heading
// lights up and its screen wipes in; a thin line under the heading fills while it
// shows, then the next one takes over. Clicking a heading jumps to it and stops the
// rotation, which is how a visitor stops it. Rotation also waits while keyboard
// focus is in the section, or while the section is off screen.
//
// On a phone, with reduced motion, or before JavaScript runs, it's a plain list:
// each feature's name and note, with its screen. Reduced motion on a wide screen
// keeps the clickable headings but never rotates on its own.

import { useEffect, useRef, useState } from 'react';
import styles from './handful.module.scss';

const join = (...names) => names.filter(Boolean).join(' ');

function Shot({ imagePath, shot }) {
    return (
        <img
            src={`${imagePath}/${shot.src}`}
            width={shot.width}
            height={shot.height}
            alt={shot.alt}
            loading='lazy'
            decoding='async'
        />
    );
}

export default function Features({ features, imagePath }) {
    const root = useRef(null);
    const [wide, setWide] = useState(false);
    const [reduce, setReduce] = useState(false);
    const [inView, setInView] = useState(false);
    const [holding, setHolding] = useState(false); // keyboard focus inside
    const [stopped, setStopped] = useState(false); // the visitor picked one
    const [active, setActive] = useState(0);
    const [previous, setPrevious] = useState(null);

    useEffect(() => {
        const wideQuery = window.matchMedia('(min-width: 861px)');
        const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const sync = () => {
            setWide(wideQuery.matches);
            setReduce(reduceQuery.matches);
        };
        sync();
        wideQuery.addEventListener('change', sync);
        reduceQuery.addEventListener('change', sync);
        const watch = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
            threshold: 0.4,
        });
        watch.observe(root.current);
        return () => {
            wideQuery.removeEventListener('change', sync);
            reduceQuery.removeEventListener('change', sync);
            watch.disconnect();
        };
    }, []);

    const tabs = wide; // the rotating layout, only on a wide screen with JavaScript
    const rotates = tabs && !reduce && !stopped;
    const running = rotates && inView && !holding;

    const show = index => {
        if (index === active) return;
        setPrevious(active);
        setActive(index);
    };
    const pick = index => {
        show(index);
        setStopped(true);
    };

    return (
        <section
            ref={root}
            data-m='feat'
            className={join(styles.features, tabs && styles.tabs)}
            aria-labelledby='what-it-does'
            // Keyboard focus inside waits. The section fills the screen, so a resting
            // mouse doesn't, or it would almost never move on.
            onFocus={e => {
                if (e.target.matches(':focus-visible')) setHolding(true);
            }}
            onBlur={e => {
                if (!e.currentTarget.contains(e.relatedTarget)) setHolding(false);
            }}
        >
            <div className={styles.featureLayout}>
                <div className={styles.featureList}>
                    <h2 id='what-it-does' className={styles.kicker}>
                        What it does
                    </h2>
                    <ol className={styles.featureItems}>
                        {features.map((feature, i) => (
                            <li
                                key={feature.title}
                                className={tabs && i === active ? styles.isActive : undefined}
                            >
                                <h3 className={styles.featureName}>
                                    {tabs ? (
                                        <button
                                            type='button'
                                            className={styles.featureButton}
                                            aria-controls='feature-stage'
                                            aria-current={i === active ? 'true' : undefined}
                                            onClick={() => pick(i)}
                                        >
                                            {feature.title}
                                        </button>
                                    ) : (
                                        feature.title
                                    )}
                                    {rotates && i === active && (
                                        // Its animation ending is what moves to the next feature.
                                        <span
                                            key={active}
                                            className={styles.progress}
                                            style={{ animationPlayState: running ? 'running' : 'paused' }}
                                            onAnimationEnd={() => show((active + 1) % features.length)}
                                            aria-hidden='true'
                                        />
                                    )}
                                </h3>
                                <p
                                    className={styles.featureNote}
                                    aria-hidden={tabs && i !== active ? 'true' : undefined}
                                >
                                    {feature.text}
                                </p>
                                <div className={styles.phoneShot}>
                                    <Shot imagePath={imagePath} shot={feature.phone} />
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

                <div id='feature-stage' className={styles.stage}>
                    {features.map((feature, i) => (
                        <figure
                            key={feature.title}
                            className={join(
                                styles.panel,
                                feature.dark && styles.panelDark,
                                tabs && i === active && styles.panelActive,
                                tabs && i === previous && styles.panelPrevious,
                            )}
                            aria-hidden={tabs && i !== active ? 'true' : undefined}
                        >
                            <Shot imagePath={imagePath} shot={feature.desktop} />
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}
