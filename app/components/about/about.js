import React from 'react';
import Link from 'next/link';
import styles from './about.module.scss';

// About me: the lead paragraph in larger Lora, then the rest. Matthew's words.
const About = () => (
    <section
        id='about'
        className={`${styles.about} target-section`}
        data-surface='dark'
        aria-labelledby='about-heading'
    >
        <div className={styles.wrap}>
            <h2 id='about-heading' className={styles.label}>
                About me
            </h2>

            <p className={styles.lead}>
                I&rsquo;ve been building for the web for 15+ years, and in that
                time the work has come in every form, from detailed specs to
                hallway conversations. I&rsquo;m comfortable with both. When the
                requirements are clear, I build to them. When they aren&rsquo;t,
                I help clarify them, then deliver.
            </p>

            <p className={styles.text}>
                I learned to work both ways at a university, where requests came
                in from every department, from quick page updates to
                database-driven applications. Agency work later had me moving
                between tech stacks and industries to meet each client&rsquo;s
                requirements. On in-house teams, it&rsquo;s often meant taking a
                loosely defined need, digging into the codebase to work out what
                it actually involves, and pushing it through to production.
            </p>

            <p className={styles.text}>
                I also build personal projects. The most recent is{' '}
                <Link href='/portfolio/handful/' className={styles.link}>
                    Handful
                </Link>
                , a simple client tracker that puts people first. Before
                development, I worked in professional writing and journalism, and
                it still informs how I work: asking thoughtful questions and
                saying things clearly.
            </p>
        </div>
    </section>
);

export default About;
