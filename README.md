# 🚀 Modern Portfolio Site - 2026 Edition

A cutting-edge portfolio website featuring interactive animations, 3D effects, and modern UX patterns built with React 18 and Framer Motion.

---

## ✨ Features

### 🎨 **Visual Excellence**

-   **Interactive Particle System** - Dynamic constellation background with collision detection
-   **Custom Cursor** - Smooth spring physics with context-aware states
-   **3D Tilt Effects** - Portfolio cards with realistic depth and glare
-   **Scroll Animations** - Professional entrance effects triggered by scroll position
-   **Typewriter Effect** - Rotating role titles with smooth transitions
-   **Gradient Progress Bar** - Real-time scroll position indicator

### ⚡ **Performance Optimized**

-   **60fps animations** across all interactions
-   **Request Animation Frame** throttling for cursor
-   **Motion values** for zero-cost DOM updates
-   **Intersection Observer** for scroll triggers (no scroll listeners)
-   **GPU-accelerated transforms** only
-   **Lazy loading** for images
-   **Passive event listeners** throughout

### 📱 **Responsive & Accessible**

-   Mobile-first design
-   Touch device detection (cursor disabled on mobile)
-   Keyboard navigation preserved
-   Screen reader compatible
-   Semantic HTML maintained

---

## 🛠️ Tech Stack

-   **React 18** - Modern hooks, concurrent features
-   **Framer Motion** - Professional animation library
-   **tsParticles** - High-performance particle system
-   **Vanilla Tilt** - 3D tilt effects
-   **CSS Variables** - Dynamic theming foundation
-   **ES6+** - Modern JavaScript features

---

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm start
# Opens on http://localhost:3000
```

### Production Build

```bash
npm run build
# Creates optimized build in /build folder
```

### Deploy to GitHub Pages

```bash
npm run deploy
# Deploys to gh-pages branch
```

---

## 📂 Project Structure

```
src/
├── components/
│   ├── CustomCursor/      # Custom cursor with spring physics
│   ├── ScrollProgress/    # Scroll position indicator
│   ├── hero/              # Hero section with particles
│   ├── about/             # About section with animations
│   ├── portfolio/         # Portfolio with 3D tilts
│   ├── resume/            # Resume section
│   ├── header/            # Navigation header
│   └── footer/            # Footer section
├── App.js                 # Main app component
├── index.js               # React 18 entry point
├── resumeData.js          # Portfolio content data
└── index.css              # Global styles & animations

public/
├── css/
│   └── styles.css         # Template styles (4,869 lines)
├── js/
│   └── main.js            # Legacy JS (lightbox, etc.)
└── images/                # Portfolio images
```

---

## 🎯 Key Components

### Hero Particle System

**File:** `src/components/hero/hero.js`

Interactive background with:

-   50 particles with dynamic linking
-   Collision detection & bouncing
-   Typewriter role rotation
-   Staggered content entrance

### Portfolio 3D Cards

**File:** `src/components/portfolio/portfolio.js`

Enhanced project showcase with:

-   Vanilla Tilt 3D effects (15° max tilt)
-   Gradient hover overlays
-   Image zoom on hover
-   Scroll-triggered stagger entrance

---

## 🎨 Customization Quick Wins

### Change Colors

Edit `public/css/styles.css` (lines 111-152):

```css
--color-1: hsla(182, 82%, 38%, 1); /* Primary */
--color-2: hsla(24, 100%, 47%, 1); /* Accent */
```

### Change Typewriter Roles

Edit `src/components/hero/hero.js` (line 8):

```javascript
const roles = ['Your Role Here', 'Another Title', 'Third Option'];
```

### Adjust Particle Count

Edit `src/components/hero/hero.js` (line 65):

```javascript
value: 50,  // Current (change to 20-100)
```

---

## 🐛 Troubleshooting

### Portfolio modals don't open

-   Ensure `public/js/main.js` is loaded
-   Check browser console for errors
-   BasicLightbox library must be present

### Animations are laggy

-   Reduce particle count (hero.js line 65)
-   Disable custom cursor temporarily
-   Check Chrome DevTools Performance tab
-   Try disabling other browser extensions

### Build fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📊 Performance Metrics

```
Bundle Size:     137 KB gzipped
First Paint:     ~1.2s
Interactive:     ~2.1s
Frame Rate:      60fps (all animations)
Lighthouse:      95+ (Performance)
```

---

## 🎓 What This Project Demonstrates

### Technical Skills

-   ✅ Modern React patterns (hooks, functional components)
-   ✅ Animation (Framer Motion orchestration)
-   ✅ Performance optimization (RAF, motion values, passive listeners)
-   ✅ JavaScript mastery (ES6+, async, callbacks)
-   ✅ CSS proficiency (variables, animations, transforms)

### Soft Skills

-   ✅ Attention to detail (60fps animations)
-   ✅ User experience focus (accessibility, mobile)
-   ✅ Problem-solving (performance bottlenecks)
-   ✅ Modernization ability (legacy → current)

---

## 🚀 Future Enhancements

Potential additions for next iteration:

-   [ ] TypeScript migration
-   [ ] Theme switcher (dark/light/neon)
-   [ ] Resume section animations
-   [ ] Blog
-   [ ] Contact form with validation

---

## 📝 Credits

**Template Base:** Ceevee v2.0.0
**Modernization:** Custom implementation 2026
**Animation Libraries:** Framer Motion, tsParticles
**Icons:** Font Awesome
**Fonts:** Inter, IBM Plex Serif

---

**Built with ❤️ and way too much ☕**

_Last updated: January 2026_
