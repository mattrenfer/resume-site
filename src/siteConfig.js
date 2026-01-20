/**
 * ============================================================================
 * SITE CONFIGURATION
 * ============================================================================
 *
 * Single source of truth for ALL customizable aspects of the portfolio site.
 *
 * SECTIONS:
 * 1. FEATURE TOGGLES - Enable/disable site features
 * 2. THEME & COLORS - Visual styling configuration
 * 3. ANIMATIONS - Animation timing and physics
 * 4. HERO SECTION - Landing page content and settings
 * 5. PARTICLES - Background particle system
 * 6. PERSONAL INFO - Contact and social media
 * 7. CONTENT - Career, education, skills, portfolio
 *
 * ============================================================================
 */

const siteConfig = {
    // ============================================================================
    // 1. FEATURE TOGGLES
    // ============================================================================
    features: {
        scrollProgress: true, // Show scroll progress bar at top
        particleBackground: true, // Enable particle system in hero
        portfolioTilt: true, // Enable 3D tilt on portfolio cards
        soundEffects: false, // Enable sound effects on interactions
        analytics: false, // Enable analytics tracking
        floatingWidget: true, // Show floating contact widget
    },

    // ============================================================================
    // 2. THEME & COLORS
    // ============================================================================
    theme: {
        // Primary brand colors (used throughout site)
        colors: {
            primary: '#11ABB0', // Teal - main accent color
            secondary: '#F06000', // Orange - secondary accent
            // Alternative color schemes (uncomment to use):
            // primary: '#FF00FF',       // Neon Purple
            // secondary: '#FF1493',     // Hot Pink
        },

        // Particle colors (matches theme.colors by default)
        particleColors: ['#11ABB0', '#F06000'],

        // Animation mode
        reducedMotion: false, // Respect prefers-reduced-motion (future)
    },

    // ============================================================================
    // 3. ANIMATIONS - Global animation settings
    // ============================================================================
    animations: {
        // Spring physics (affects all spring-based animations)
        springPhysics: {
            stiffness: 100, // Higher = snappier (50-400)
            damping: 12, // Higher = less bounce (10-30)
        },

        // Scroll-triggered animations
        scrollAnimations: {
            staggerDelay: 0.2, // Delay between child animations (seconds)
            delayChildren: 0.3, // Initial delay before children animate
            triggerAmount: 0.2, // How much of element visible to trigger (0-1)
        },

        // Hover animations
        hoverAnimations: {
            scale: 1.05, // Scale multiplier on hover (1.0-1.2)
            duration: 0.3, // Hover transition duration (seconds)
        },

        // Scroll progress bar
        scrollProgress: {
            springConfig: {
                stiffness: 100,
                damping: 30,
                restDelta: 0.001,
            },
        },
    },

    // ============================================================================
    // 4. HERO SECTION - Landing page configuration
    // ============================================================================
    hero: {
        // Typewriter effect - roles that cycle through
        roles: [
            'Creative Problem Solver',
            'Code Composer',
            'User Experience Strategist',
            'Bug Squasher',
        ],

        // Typewriter settings
        typewriter: {
            typingSpeed: 100, // Milliseconds per character (50-200)
            pauseDuration: 2000, // Pause before switching roles (milliseconds)
        },

        // Tagline/description with highlighted words
        // Use {highlight:word} syntax to mark words for highlighting
        tagline:
            '{highlight:Collaborative} Software Engineer & UX Strategist with 15+ years industry experience building performant, {highlight:scalable} digital solutions.',

        // Scroll indicator animation
        scrollIndicator: {
            bounceHeight: 10, // Pixels to bounce up/down
            bounceDuration: 2, // Seconds for full bounce cycle
            fadeInDelay: 1.5, // Seconds before appearing
        },
    },

    // ============================================================================
    // 5. PARTICLES - Background particle system configuration
    // ============================================================================
    particles: {
        enabled: true, // Master toggle for particles

        number: 50, // Particle count (20-100)
        // Performance: 20-30 = minimal, 50 = balanced, 80-100 = dense

        density: {
            enable: true,
            area: 1000, // Particles per pixel area
        },

        // Particle appearance
        shapes: ['circle', 'triangle'], // Options: circle, triangle, square, polygon, star
        sizeMin: 1,
        sizeMax: 3,
        opacity: 0.5,

        // Particle movement
        speed: 1, // Movement speed (0.5-3)
        // Performance: Lower = better performance
        direction: 'none', // Options: none, top, bottom, left, right

        // Particle connections
        links: {
            enable: true,
            distance: 150, // Max distance to draw connections
            color: '#11ABB0', // Link color (matches theme.colors.primary)
            opacity: 0.3,
            width: 1,
        },

        // Animation settings
        opacityAnimation: {
            enable: true,
            speed: 1,
            minimumValue: 0.1,
        },

        collisions: {
            enable: false, // Particle collisions (performance cost)
        },

        // Interactivity settings - controls how particles react to user interaction
        interactivity: {
            enabled: true, // Master toggle for all interactions

            // Mouse hover behavior
            hover: {
                enable: true, // Enable hover effects
                mode: 'grab', // Options: 'grab', 'repulse', 'bubble', 'connect', or disable
                speed: 0.3, // Transition speed when particles move (0.1-1.0, lower = smoother)
                // 'grab' draws connections to nearby particles
                // 'repulse' pushes particles away from cursor
                // 'bubble' makes particles grow near cursor
            },

            // Grab effect settings (when hover.mode = 'grab')
            grab: {
                distance: 140, // Distance to connect particles to cursor (pixels)
                duration: 0.4, // Time it takes for connections to appear/disappear (seconds)
                lineLinked: {
                    opacity: 0.5, // Opacity of grab lines (0-1)
                },
            },

            // Repulse effect settings (when hover.mode = 'repulse')
            repulse: {
                distance: 200, // Distance particles move away from cursor
                duration: 0.4, // Time for particles to move away/return (seconds)
                speed: 1, // Speed of repulsion (0.1-3.0)
            },

            // Click behavior - scramble effect on user click
            click: {
                enable: true, // Enable click effects
                mode: 'repulse', // Options: 'push' (add particles), 'remove', 'repulse'
                // 'repulse' creates the scramble effect you want
            },
        },

        fpsLimit: 60, // Frame rate cap
    },

    // ============================================================================
    // 6. PORTFOLIO CARDS - 3D tilt effect settings
    // ============================================================================
    portfolioTilt: {
        enabled: true, // Master toggle
        maxTilt: 15, // Max tilt angle in degrees (0-25)
        scale: 1.05, // Scale on hover (1.0-1.2)
        speed: 300, // Transition speed (milliseconds)
        glare: true, // Enable glare effect
        maxGlare: 0.3, // Glare opacity (0-1)
    },

    // ============================================================================
    // 7. PERSONAL INFO - Your information
    // ============================================================================
    personal: {
        name: 'Matthew Russell Renfer',
        role: 'Software Engineer', // Default role (not used in typewriter)
        email: 'mr.renfer [at] gmail.com',
        companyName: 'Renfer Digital Solutions LLC',

        // Social media links
        socialMedia: {
            linkedin: 'https://www.linkedin.com/in/mattrenfer/',
            github: 'https://github.com/mattrenfer',
            facebook: 'https://www.facebook.com/matt.renfer',
            instagram: 'https://www.instagram.com/mattrenfer/',
            facebookMessenger: 'http://m.me/matt.renfer',
        },

        // Resume/CV
        resume: {
            fileName: 'Software Engineer - Matthew Renfer - 2025.pdf',
            version: '?v=7', // Cache-busting query param
        },
    },

    // ============================================================================
    // 9. ABOUT SECTION
    // ============================================================================
    about: {
        profileImage: 'images/matt-profile.jpg',

        // Bio paragraphs
        bio: [
            'I have always been a problem-solver who thinks in logical, systematic ways—engaging the creative process along the way. A big part of what I love in my career is birthing ideas into practical, impactful solutions.',

            "I've been making websites since the early dawn of the internet. A lot has changed since then, which is why I am always eager to learn newer technologies and expand my web development toolkit, keeping clients ahead of the curve.",

            'Creating intuitive user experiences is important to me. The journey a user takes to get where they need to go should be easy to follow and even enjoyable.',

            "Collaboration and positivity are central to how I work. Great results come from great teams, and I value environments where efficiency meets balance. After all, it's not just about the work we do, but how we do it.",
        ],
    },

    // ============================================================================
    // 10. CAREER HISTORY
    // ============================================================================
    career: [
        // {
        //     id: 1,
        //     companyName: 'Renfer Digital Solutions LLC',
        //     specialization: 'Owner/Digital Solutions Engineer',
        //     monthOfJoining: 'June',
        //     yearOfJoining: '2025',
        //     monthOfLeaving: 'Present',
        //     description:
        //         'I operate under Renfer Digital Solutions LLC, partnering with clients from project kickoff through post-launch support to define and implement cohesive digital presences.',
        // },
        {
            id: 1,
            companyName: 'Soltech',
            specialization: 'Interface Engineer',
            monthOfJoining: 'July',
            yearOfJoining: '2021',
            monthOfLeaving: 'June',
            yearOfLeaving: '2025',
            description:
                'As an Interface Engineer at Soltech, I designed and developed responsive, user-centered websites and applications using a variety of tech stacks. I maintained high-profile sites like soltech.net on WP Engine, collaborated across teams to translate project goals into polished front-end solutions, integrated third-party tools, and contributed to scalable, maintainable codebases across a variety of client projects and industries.',
        },
        {
            id: 2,
            companyName: 'Tactic Edge Solutions',
            specialization: 'Senior Web Developer',
            monthOfJoining: 'October',
            yearOfJoining: '2020',
            monthOfLeaving: 'May',
            yearOfLeaving: '2021',
            description:
                'The position was an opportunity to expand web knowledge and toolkit. It involved launching and maintaining multiple WordPress sites, as well as assisting in the development of features in customer-facing web applications. It also involved creating mock-ups and implementing improvements to the user experiences and interfaces of web applications.',
        },
        {
            id: 3,
            companyName: 'Gardner-Webb University',
            specialization: 'Senior Web Developer',
            monthOfJoining: 'November',
            yearOfJoining: '2010',
            monthOfLeaving: 'October',
            yearOfLeaving: '2020',
            description:
                'My accomplishments as the Senior Web Developer for Gardner-Webb University were both expansive and impactful. The position fielded inquiries from every department and included satisfying requests from faculty, staff and students alike. They ranged from more simple updates (using HTML/CSS), to launching newly designed sections and landing pages (using CSS/Bootstrap), to creating database-driven web applications (using JavaScript/ASP.NET). Additionally, the position was responsible for developing university marketing campaigns on the web to promote student enrollment.',
        },
    ],

    // ============================================================================
    // 11. EDUCATION & CERTIFICATIONS
    // ============================================================================
    education: [
        {
            id: 1,
            institutionName: 'Western Connecticut State University',
            specialization: 'BA in English: Professional Writing',
            monthOfEarning: 'May',
            yearOfEarning: '2008',
        },
        {
            id: 2,
            institutionName: 'Certifications',
            certificates: [
                {
                    id: 1,
                    name: 'The Modern React Bootcamp (Hooks, Context, NextJS, Router)',
                    url: '/images/certificate-react.jpg',
                },
                {
                    id: 2,
                    name: 'The Web Development Bootcamp',
                    url: '/images/certificate-web-dev-bootcamp.jpg',
                },
                {
                    id: 3,
                    name: 'Become a WordPress Developer: Unlocking Power With Code',
                    url: '/images/certificate-wordpress.jpg',
                },
                {
                    id: 4,
                    name: 'User Experience Design Essentials – Adobe XD UI UX Design',
                    url: '/images/certificate-UI.jpg',
                },
                {
                    id: 5,
                    name: 'Structured Vibe Coding with AI Coding Agents',
                    url: '/images/certificate-vibe-coding.pdf',
                },
            ],
        },
    ],

    // ============================================================================
    // 12. TECHNICAL SKILLS
    // ============================================================================
    technicalSkills: [
        {
            id: 1,
            title: 'Technical Skills',
            description:
                'JavaScript (ES6+), TypeScript, React, Next.js, Node.js (Express/Nest.js), PHP, WordPress, Laravel, REST/GraphQL APIs, Docker, CI/CD (GitHub Actions), MySQL, PostgreSQL, MongoDB, AWS',
            skill: 100,
            icon: 'fas fa-code',
        },
        {
            id: 2,
            title: 'System Design & Architecture',
            description:
                'API Integration, Headless CMS, Scalable Front-End Systems, Database Design, Responsive Design, Performance Optimization',
            skill: 85,
            icon: 'fas fa-sitemap',
        },
        {
            id: 3,
            title: 'Soft Skills & Collaboration',
            description:
                'Cross-Functional Collaboration, Agile Workflows, Communication & Problem Solving, Project Ownership, Adaptability, Continuous Learning, Client relations',
            skill: 75,
            icon: 'fas fa-users',
        },
    ],

    // Legacy skills (kept for compatibility)
    skills: [
        {
            id: 1,
            title: 'Proficient',
            description:
                'HTML, CSS, JavaScript, WordPress, Elementor, WP Rocket',
            skill: 100,
        },
        {
            id: 2,
            title: 'Strong',
            description: 'React, Vue, PHP',
            skill: 85,
        },
        {
            id: 3,
            title: 'Familiar',
            description: 'React Native, Ionic, NextJS, Redux',
            skill: 75,
        },
    ],

    // ============================================================================
    // 13. PORTFOLIO PROJECTS
    // ============================================================================
    portfolio: [
        {
            id: 1,
            name: 'Blog Expansion & Redesign',
            companyName: 'SnapCare Blog',
            description: `In an effort to increase product visibility, SnapCare sought to expand and redesign their site's blog. This included building a unique section theme, as well as adding custom functionality such as: linked author bios, related articles, category/tags, and improved search. These features were built by customizing WordPress and designing in Elementor.`,
            thumbnail: 'images/portfolio/snapcare-blog.jpg',
            link: 'https://snapcare.com/blog',
            linkText: 'Live Site',
        },
        {
            id: 2,
            name: 'Website Redesign',
            companyName: 'SnapCare',
            description: `SnapNurse rebranded their company to SnapCare, which included a wholesale redesign of their website. The new site is sleeker, more intuitive and runs on a WPEngine/WordPress/Elementor tech stack. I was the sole web developer on the project working in collaboration with marketing efforts to finish the project from scratch within a tight deadline.`,
            thumbnail: 'images/portfolio/snapcare.jpg',
            link: 'https://snapcare.com',
            linkText: 'Live Site',
        },
        {
            id: 3,
            name: 'Soltech.net',
            companyName: 'Soltech',
            description: `Maintained and enhanced Soltech's flagship site, which runs on WP Engine/WordPress. Updates to the site range from regular system/plugin version upgrades to adding new blog features to implementing site-wide functionality, such as a revamped top navigation.`,
            thumbnail: 'images/portfolio/soltech.jpg',
            link: 'https://soltech.net',
            linkText: 'Live Site',
        },
        {
            id: 4,
            name: 'Covenant Member Guide',
            companyName: 'Tactic Edge Solutions',
            description: `Our client requested a redesign of their member guide site, which was much too cluttered. We simplified the design and added pagination functionality to flip through the content like a published document.`,
            thumbnail: 'images/portfolio/covenant-member-guide.jpg',
            link: 'https://memberguide.covenantshare.org/',
            linkText: 'Live Site',
            listTitle: 'Web Functionality Shown',
            listItems: [
                {
                    id: 1,
                    text: 'Pagination',
                },
                { id: 2, text: 'Table of Contents' },
            ],
        },
        {
            id: 5,
            name: 'Member Portal UI',
            companyName: 'Tactic Edge Solutions',
            description: `Our organization needed a redesigned back-end experience for our users that looked modern and cleanly displayed the information. The following photo is the chosen design, centering the experience and improving the design as well as information visibility.`,
            thumbnail: 'images/portfolio/member-portal-ui.jpg',
            link: '/portfolio/member-portal-mock-ups.pdf',
            linkText: 'View Mock-Ups',
        },
        {
            id: 6,
            name: 'Tactic Edge Website',
            companyName: 'Tactic Edge Solutions',
            description: `The Tactic Edge website was in need of a more descriptive website that also cleaned up the look and allowed the user to scroll through more content per page. The resulting redesign summarized what we offered on the homepage and categorized most of the content into two main buckets: services and solutions. It also clarified the call to action of requesting a quote and/or contacting us for more information.`,
            thumbnail: 'images/portfolio/tactic-edge.jpg',
        },
        {
            id: 7,
            name: 'Webbstock Landing Page',
            companyName: 'Gardner-Webb University',
            description: `Gardner-Webb University Gardner-Webb University was in need of a landing page that showcased a partnered music festival with the town of Boiling Springs.`,
            thumbnail: 'images/portfolio/webbstock.jpg',
            link: 'portfolio/webbstock.html',
            linkText: 'Live Preview',
            listTitle: 'Web Functionality Shown',
            listItems: [
                {
                    id: 1,
                    text: 'Ticking countdown to the event date & time',
                },
                { id: 2, text: 'Hidden rollover and accordion content' },
            ],
        },
        {
            id: 8,
            name: 'Program Landing Pages',
            companyName: 'Gardner-Webb University',
            description: `University marketing requested 50+ landing pages for a number of programs—each with a call to action form providing more information to the user. Built a simple & clean reusable theme for all landing pages with drop-ins for unique program images, copy and contact form.`,
            thumbnail: 'images/portfolio/program-landing-pages.jpg',
            link: '/portfolio/rn-to-bsn.html',
            linkText: 'Live Preview',
        },
        {
            id: 9,
            name: 'Annual Senior Show ',
            companyName: 'Gardner-Webb University',
            description: `The university's art department was in need of a digital home to showcase 16 students' final projects due to COVID-19. The showcase needed an initial entry point per student. Once there, each students' project page includes a profile, a gallery of their work, and a video of their artist's statement.`,
            thumbnail: 'images/portfolio/senior-show.jpg',
        },
    ],

    // ============================================================================
    // 14. SYSTEM SETTINGS (Don't usually need to change these)
    // ============================================================================
    system: {
        publicUrl: process.env.PUBLIC_URL,
        imageBaseUrl: '/',
    },
};

export default siteConfig;
