import React from 'react';
import Specialties from '../specialties/specialties';
import styles from './resume.module.scss';

// The résumé on the page: Specialties, Career, Education. A light surface,
// label on the left, entries on the right, thin olive rules between rows.
const dates = (...parts) => parts.filter(Boolean).join(' ');

const Resume = ({ siteConfig }) => (
    <section
        id='resume'
        className={`${styles.resume} target-section`}
        data-surface='light'
        aria-labelledby='resume-heading'
    >
        <div className={styles.wrap}>
            <h2 id='resume-heading' className={styles.srOnly}>
                Experience
            </h2>

            <Specialties siteConfig={siteConfig} />

            <div className={styles.row}>
                <h3 className={styles.label}>Career</h3>
                <div className={styles.entries}>
                    {(siteConfig.career || []).map(item => (
                        <article key={item.id} className={styles.entry}>
                            <h4 className={styles.entryTitle}>{item.companyName}</h4>
                            <p className={styles.entryMeta}>
                                <span>{item.specialization}</span>
                                <span className={styles.dates}>
                                    {dates(item.monthOfJoining, item.yearOfJoining)} –{' '}
                                    {dates(item.monthOfLeaving, item.yearOfLeaving)}
                                </span>
                            </p>
                            <p className={styles.entryText}>{item.description}</p>
                        </article>
                    ))}
                </div>
            </div>

            <div className={styles.row}>
                <h3 className={styles.label}>Education</h3>
                <div className={styles.entries}>
                    {(siteConfig.education || []).map(item => (
                        <article key={item.id} className={styles.entry}>
                            <h4 className={styles.entryTitle}>{item.institutionName}</h4>
                            {(item.specialization || item.yearOfEarning) && (
                                <p className={styles.entryMeta}>
                                    {item.specialization && <span>{item.specialization}</span>}
                                    {item.yearOfEarning && (
                                        <span className={styles.dates}>
                                            {dates(item.monthOfEarning, item.yearOfEarning)}
                                        </span>
                                    )}
                                </p>
                            )}
                            {item.certificates && (
                                <ul className={styles.certs}>
                                    {item.certificates.map(cert => (
                                        <li key={cert.id}>
                                            <span>{cert.name}</span>{' '}
                                            <a
                                                className={styles.certLink}
                                                href={cert.url}
                                                target='_blank'
                                                rel='noreferrer'
                                            >
                                                View
                                                <span className={styles.srOnly}>
                                                    {' '}
                                                    {cert.name} certificate (opens in a new tab)
                                                </span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </article>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

export default Resume;
