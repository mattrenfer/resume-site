import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback((e) => {
    e.preventDefault();
    setMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    if (window.matchMedia('(max-width: 800px)').matches) {
      setMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-is-open');
    } else {
      document.body.classList.remove('menu-is-open');
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia('(min-width: 801px)').matches) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="s-header">
      <div className="row s-header__nav-wrap">
        <nav className="s-header__nav">
          <ul>
            <li>
              <a className="smoothscroll" href="#about" onClick={closeMenu}>
                about me
              </a>
            </li>
            <li>
              <a className="smoothscroll" href="#resume" onClick={closeMenu}>
                experience
              </a>
            </li>
            <li>
              <a className="smoothscroll" href="#portfolio" onClick={closeMenu}>
                my work
              </a>
            </li>
            <li className="header-cta-item">
              <motion.a
                className="smoothscroll header-cta"
                href="#work-with-me"
                onClick={closeMenu}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                let&apos;s connect
              </motion.a>
            </li>
          </ul>
        </nav>
      </div>
      <a
        className={`s-header__menu-toggle${menuOpen ? ' is-clicked' : ''}`}
        href="#0"
        title="Menu"
        onClick={toggleMenu}
      >
        <span className="s-header__menu-icon" />
      </a>
    </header>
  );
}
