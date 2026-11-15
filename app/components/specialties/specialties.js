import React from 'react';
import styles from '../resume/resume.module.scss';

// The first row of the résumé section, before Career and Education.
const Specialties = ({ siteConfig }) => (
    <div id='specialties' className={styles.row}>
        <h3 className={styles.label}>Specialties</h3>
        <ul className={styles.skills}>
            {(siteConfig.technicalSkills || []).map(item => (
                <li key={item.id}>
                    <span className={styles.skillTitle}>{item.title}</span>
                    <span className={styles.skillList}>{item.description}</span>
                </li>
            ))}
        </ul>
    </div>
);

export default Specialties;
