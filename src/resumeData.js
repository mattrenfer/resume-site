let resumeData = {
    publicUrl: process.env.PUBLIC_URL,
    imageBaseUrl: '/',
    resumeVersion: '?v=4',
    name: 'Matthew Russell Renfer',
    role: 'Digital Solutions Engineer',
    email: 'renferdigitalsolutions [at] gmail.com',
    companyName: 'Renfer Digital Solutions LLC',
    facebook: 'https://www.facebook.com/matt.renfer',
    linkedin: 'https://www.linkedin.com/in/mattrenfer/',
    instagram: 'https://www.instagram.com/mattrenfer/',
    github: 'https://github.com/mattrenfer',
    facebookMessenger: 'http://m.me/matt.renfer',

    aboutMe:
        "I have always been a problem-solver who thinks in logical, systematic ways and who thoroughly enjoys exploring the best way to build something. I've been making websites since the early dawn of the internet. A lot has changed since then, which is why I am always eager to learn newer technologies and expand my web development toolkit, keeping companies and organizations ahead of the curve.",

    career: [
        {
            id: 1,
            companyName: 'Renfer Digital Solutions LLC',
            specialization: 'Owner/Digital Solutions Engineer',
            monthOfJoining: 'June',
            yearOfJoining: '2025',
            monthOfLeaving: 'Present',
            description:
                'I operate under Renfer Digital Solutions LLC, partnering with clients from project kickoff through post-launch support to define and implement cohesive digital presences.',
        },
        {
            id: 2,
            companyName: 'Soltech',
            specialization: 'Interface Engineer',
            monthOfJoining: 'July',
            yearOfJoining: '2021',
            monthOfLeaving: 'June',
            yearOfLeaving: '2025',
            description:
                "As an Interface Engineer, I was responsible for creating polished & intuitive user interfaces for websites and applications that met both the client's requirements and quality standards. I leveraged technologies such as WordPress, React & Vue, along with their supported plugins/libraries, to accomplish these goals to the best of my ability.",
        },
        {
            id: 3,
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
            id: 4,
            companyName: 'Gardner-Webb University',
            specialization: 'Senior Web Developer',
            monthOfJoining: 'November',
            yearOfJoining: '2010',
            monthOfLeaving: 'October',
            uearOfLeaving: '2020',
            description:
                'My accomplishments as the Senior Web Developer for Gardner-Webb University were both expansive and impactful. The position fielded inquiries from every department and included satisfying requests from faculty, staff and students alike. They ranged from more simple updates (using HTML/CSS), to launching newly designed sections and landing pages (using CSS/Bootcamp), to creating database-driven web applications (using JavaScript/ASP.NET). Additionally, the position was responsible for developing university marketing campaigns on the web to promote student enrollment.',
        },
    ],

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
            ],
        },
    ],

    technicalSkills: [
        {
            id: 1,
            title: 'Proficient',
            description:
                'HTML, CSS, JavaScript, WordPress, Elementor, WP Rocket, Responsive Design',
            skill: 100,
        },
        {
            id: 2,
            title: 'Strong',
            description: 'React, Next.js, Vue, Node.js, Express.JS, PHP',
            skill: 85,
        },
        {
            id: 3,
            title: 'Familiar',
            description: 'Nest.js, React Native, Ionic',
            skill: 75,
        },
    ],

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
            description: `I am the unofficially designated developer for Soltech's website, which runs on WP Engine/WordPress. Updates to the site range from regular system/plugin version upgrades to adding new blog features to implementing site-wide functionality, such as a revamped top navigation.`,
            thumbnail: 'images/portfolio/soltech.jpg',
            link: 'https://soltech.net',
            linkText: 'Live Site',
        },
        {
            id: 4,
            name: 'Covenant Member Guide',
            companyName: 'Tactic Edge Solutions',
            description: `Our client requested a redesign of their member guide site,
      which was much too cluttered. We simplified the design and
      added pagination functionality to flip through the content
      like a published document.`,
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
            description: `Our organization needed a redesigned back-end experience for
      our users that looked modern and cleanly displayed the
      information. The following photo is the chosen design,
      centering the experience and improving the design as well as
      information visibility.`,
            thumbnail: 'images/portfolio/member-portal-ui.jpg',
            link: '/portfolio/member-portal-mock-ups.pdf',
            linkText: 'View Mock-Ups',
        },
        {
            id: 6,
            name: 'Tactic Edge Website',
            companyName: 'Tactic Edge Solutions',
            description: `The Tactic Edge website was in need of a more descriptive
      website that also cleaned up the look and allowed the user to
      scroll through more content per page. The resulting redesign
      summarized what we offered on the homepage and categorized
      most of the content into two main buckets: services and
      solutions. It also clarified the call to action of requesting
      a quote and/or contacting us for more information.`,
            thumbnail: 'images/portfolio/tactic-edge.jpg',
        },
        {
            id: 7,
            name: 'Webbstock Landing Page',
            companyName: 'Gardner-Webb University',
            description: `Gardner-Webb University Gardner-Webb University was in need of
      a landing page that showcased a partnered music festival with
      the town of Boiling Springs.`,
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
            description: `University marketing requested 50+ landing pages for a number
      of programs—each with a call to action form providing more
      information to the user. Built a simple & clean reusable
      theme for all landing pages with drop-ins for unique program
      images, copy and contact form.`,
            thumbnail: 'images/portfolio/program-landing-pages.jpg',
            link: '/portfolio/rn-to-bsn.html',
            linkText: 'Live Preview',
        },
        {
            id: 9,
            name: 'Annual Senior Show ',
            companyName: 'Gardner-Webb University',
            description: `The university's art department was in need of a digital
      home to showcase 16 students' final projects due to
      COVID-19. The showcase needed an initial entry point per
      student. Once there, each students' project page includes
      a profile, a gallery of their work, and a video of their
      artist's statement.`,
            thumbnail: 'images/portfolio/senior-show.jpg',
        },
    ],
};

export default resumeData;
