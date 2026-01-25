import { useEffect, useRef, useCallback } from 'react';

// Section IDs in order (matching the component layout in App.js)
const SECTIONS = ['hero', 'specialties', 'testimonials', 'portfolio', 'resume'];

// Configuration
const CONFIG = {
    animationDuration: 600,
    debounceTime: 600,
    touchThreshold: 50,
    wheelThreshold: 50,
    // How much of section must be scrolled before allowing next section
    sectionScrollThreshold: 0.85,
};

const FullPageNav = () => {
    const currentIndexRef = useRef(0);
    const isAnimatingRef = useRef(false);
    const touchStartYRef = useRef(0);
    const lastScrollTimeRef = useRef(0);

    // Check if a section is taller than the viewport
    const isSectionTall = useCallback((sectionId) => {
        const section = document.getElementById(sectionId);
        if (!section) return false;
        return section.offsetHeight > window.innerHeight * 1.1;
    }, []);

    // Check if we're at the bottom of a tall section
    const isAtSectionBottom = useCallback((sectionId) => {
        const section = document.getElementById(sectionId);
        if (!section) return true;

        const rect = section.getBoundingClientRect();
        const sectionBottom = rect.bottom;
        const threshold = window.innerHeight * 0.15;

        return sectionBottom <= window.innerHeight + threshold;
    }, []);

    // Check if we're at the top of a tall section
    const isAtSectionTop = useCallback((sectionId) => {
        const section = document.getElementById(sectionId);
        if (!section) return true;

        const rect = section.getBoundingClientRect();
        const threshold = window.innerHeight * 0.15;

        return rect.top >= -threshold;
    }, []);

    // Smooth scroll to a section
    const scrollToSection = useCallback((index) => {
        const sectionId = SECTIONS[index];
        const section = document.getElementById(sectionId);

        if (!section) return;

        isAnimatingRef.current = true;
        currentIndexRef.current = index;

        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });

        setTimeout(() => {
            isAnimatingRef.current = false;
        }, CONFIG.animationDuration);
    }, []);

    // Navigate to adjacent section
    const navigateSection = useCallback((direction) => {
        if (isAnimatingRef.current) return false;

        const now = Date.now();
        if (now - lastScrollTimeRef.current < CONFIG.debounceTime) return false;

        const currentSection = SECTIONS[currentIndexRef.current];
        const isTall = isSectionTall(currentSection);

        // For tall sections, check if we should allow normal scroll
        if (isTall) {
            if (direction > 0 && !isAtSectionBottom(currentSection)) {
                return false; // Allow normal scroll down within section
            }
            if (direction < 0 && !isAtSectionTop(currentSection)) {
                return false; // Allow normal scroll up within section
            }
        }

        const newIndex = currentIndexRef.current + direction;

        if (newIndex < 0 || newIndex >= SECTIONS.length) return false;

        lastScrollTimeRef.current = now;
        scrollToSection(newIndex);
        return true;
    }, [scrollToSection, isSectionTall, isAtSectionBottom, isAtSectionTop]);

    // Wheel event handler
    useEffect(() => {
        const handleWheel = (e) => {
            if (isAnimatingRef.current) {
                e.preventDefault();
                return;
            }

            const delta = e.deltaY;
            if (Math.abs(delta) < CONFIG.wheelThreshold) return;

            const direction = delta > 0 ? 1 : -1;
            const handled = navigateSection(direction);

            if (handled) {
                e.preventDefault();
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [navigateSection]);

    // Touch event handlers
    useEffect(() => {
        const handleTouchStart = (e) => {
            touchStartYRef.current = e.touches[0].clientY;
        };

        const handleTouchEnd = (e) => {
            if (isAnimatingRef.current) return;

            const touchEndY = e.changedTouches[0].clientY;
            const deltaY = touchStartYRef.current - touchEndY;

            if (Math.abs(deltaY) < CONFIG.touchThreshold) return;

            const direction = deltaY > 0 ? 1 : -1;
            navigateSection(direction);
        };

        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [navigateSection]);

    // IntersectionObserver to track current section
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-30% 0px -30% 0px',
            threshold: 0,
        };

        const handleIntersect = (entries) => {
            if (isAnimatingRef.current) return;

            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    const index = SECTIONS.indexOf(sectionId);
                    if (index !== -1) {
                        currentIndexRef.current = index;
                    }
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);

        SECTIONS.forEach((sectionId) => {
            const section = document.getElementById(sectionId);
            if (section) {
                observer.observe(section);
            }
        });

        return () => observer.disconnect();
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isAnimatingRef.current) return;

            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                const handled = navigateSection(1);
                if (handled) e.preventDefault();
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                const handled = navigateSection(-1);
                if (handled) e.preventDefault();
            } else if (e.key === 'Home') {
                e.preventDefault();
                scrollToSection(0);
            } else if (e.key === 'End') {
                e.preventDefault();
                scrollToSection(SECTIONS.length - 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigateSection, scrollToSection]);

    return null;
};

export default FullPageNav;
