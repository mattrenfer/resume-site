'use client';

// The scroll motion for /portfolio/handful. The page is server-rendered and
// reads fine without this: the motion only starts when JavaScript runs and the
// visitor hasn't asked for reduced motion. Elements are found by data-m="..."
// so the CSS module's hashed class names stay out of the script.

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CHAR = '#282828';
const PAPER = '#ece7dc';

export default function HandfulMotion({ className, motionClass, children }) {
    const root = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const el = root.current;
        const one = name => el.querySelector(`[data-m="${name}"]`);
        const all = name => gsap.utils.toArray(el.querySelectorAll(`[data-m="${name}"]`));
        const bg = one('bg');

        // The page color behind everything scrubs between charcoal and paper.
        const fadeBg = (trigger, start, end, from, to) =>
            gsap.fromTo(
                bg,
                { backgroundColor: from },
                {
                    backgroundColor: to,
                    ease: 'none',
                    immediateRender: false,
                    scrollTrigger: { trigger, start, end, scrub: true },
                },
            );

        const mm = gsap.matchMedia();
        mm.add(
            {
                motion: '(prefers-reduced-motion: no-preference)',
                wide: '(min-width: 861px)',
            },
            context => {
                const { motion, wide } = context.conditions;
                if (!motion) return undefined;
                el.classList.add(motionClass);

                // Past the header: it lifts and fades, and the page turns from charcoal to paper.
                const shotSec = one('shot-section');
                gsap.to(one('hero'), {
                    yPercent: -22,
                    opacity: 0,
                    ease: 'none',
                    scrollTrigger: { trigger: shotSec, start: 40, end: 'top 8%', scrub: true },
                });
                fadeBg(shotSec, 40, 'top 2%', CHAR, PAPER);

                // The dashboard grows to the edges of the window. The badge rides on it and rolls.
                gsap.fromTo(
                    one('shot'),
                    { scale: wide ? 0.72 : 0.9 },
                    {
                        scale: 1,
                        ease: 'none',
                        scrollTrigger: { trigger: shotSec, start: 0, end: 'top 6%', scrub: 0.4 },
                    },
                );
                gsap.to(one('spin'), {
                    rotate: 28,
                    ease: 'none',
                    scrollTrigger: { trigger: shotSec, start: 0, end: 'bottom 20%', scrub: 0.6 },
                });

                // The big sentence lights up word by word, then the story rises in.
                gsap.to(all('word'), {
                    opacity: 1,
                    ease: 'none',
                    stagger: 0.5,
                    scrollTrigger: { trigger: one('words'), start: 'top 82%', end: 'bottom 48%', scrub: 0.5 },
                });
                // Beside the story, the three workflow lines slide in from opposite sides.
                const side = i => (i % 2 ? 1 : -1);
                gsap.fromTo(
                    all('flow-line'),
                    { xPercent: i => side(i) * 40, opacity: 0 },
                    {
                        xPercent: 0,
                        opacity: 1,
                        ease: 'power2.out',
                        stagger: 0.15,
                        scrollTrigger: { trigger: one('flow-lines'), start: 'top 95%', end: 'top 35%', scrub: 0.6 },
                    },
                );
                gsap.from(one('story'), {
                    y: 48,
                    opacity: 0,
                    filter: 'blur(8px)',
                    duration: 1,
                    ease: 'power4.out',
                    clearProps: 'filter',
                    scrollTrigger: { trigger: one('story'), start: 'top 86%', toggleActions: 'play none none reverse' },
                });

                // Into What it does: the idea fades out first, so no text sits on a half-changed color.
                const feat = one('feat');
                gsap.to(one('idea').children, {
                    opacity: 0,
                    ease: 'none',
                    scrollTrigger: { trigger: feat, start: 'top 62%', end: 'top 38%', scrub: true },
                });
                fadeBg(feat, 'top 48%', 'top 8%', PAPER, CHAR);

                // What it does rotates on its own (see Features.js), so nothing here moves it.
                // How it was built follows on the same charcoal and doesn't move either.

                // The closing wordmark rises from the bottom edge.
                gsap.from(one('wordmark'), {
                    yPercent: 62,
                    ease: 'none',
                    scrollTrigger: { trigger: one('close'), start: 'top 95%', end: 'bottom bottom', scrub: 0.5 },
                });

                return () => el.classList.remove(motionClass);
            },
            el,
        );

        // Fonts and late images change the page's height, so measure again once they're in.
        const refresh = () => ScrollTrigger.refresh();
        if (document.readyState !== 'complete') window.addEventListener('load', refresh);
        if (document.fonts?.ready) document.fonts.ready.then(refresh);

        // So does anything that changes the page's height after load, like What it does
        // switching from its plain list to the rotating layout. Otherwise everything
        // below it would start and finish in the wrong place.
        let lastHeight = el.offsetHeight;
        let pending = 0;
        const resized = new ResizeObserver(() => {
            if (el.offsetHeight === lastHeight) return;
            lastHeight = el.offsetHeight;
            clearTimeout(pending);
            pending = setTimeout(refresh, 150);
        });
        resized.observe(el);

        return () => {
            resized.disconnect();
            clearTimeout(pending);
            window.removeEventListener('load', refresh);
            mm.revert();
        };
    }, [motionClass]);

    // The scroll cue: shown near the top of the page, hidden once you scroll.
    // This runs with or without reduced motion, since everyone needs to know to scroll.
    useEffect(() => {
        const el = root.current;
        const cue = el.querySelector('[data-m="cue"]');
        const update = () => {
            el.dataset.cue = window.scrollY < 60 ? 'on' : 'off';
        };
        const next = () => {
            const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.scrollBy({ top: window.innerHeight * 0.85, behavior: reduce ? 'auto' : 'smooth' });
        };
        update();
        window.addEventListener('scroll', update, { passive: true });
        cue.addEventListener('click', next);
        return () => {
            window.removeEventListener('scroll', update);
            cue.removeEventListener('click', next);
            delete el.dataset.cue;
        };
    }, []);

    return (
        <main ref={root} className={className}>
            {children}
        </main>
    );
}
