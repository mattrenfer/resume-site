import React from 'react';

// The first row of the résumé section, before Career and Education.
const Specialties = ({ siteConfig }) => {
    return (
        <div id='specialties' className='row s-resume__section'>
                <div className='column large-3 tab-12'>
                    <h3 className='section-header-allcaps'>
                        <i
                            className='fas fa-tools'
                            style={{ marginRight: '10px' }}
                        ></i>
                        Specialties
                    </h3>
                </div>
                <div className='column large-9 tab-12'>
                    <div className='resume-block'>
                        <ul className='specialties'>
                            {siteConfig.technicalSkills &&
                                siteConfig.technicalSkills.map(item => {
                                    return (
                                        <li
                                            key={item.id}
                                            style={{
                                                height: 'auto',
                                            }}
                                        >
                                            <strong>
                                                <i
                                                    className={item.icon}
                                                    style={{
                                                        marginRight: '8px',
                                                    }}
                                                ></i>
                                                {item.title}
                                            </strong>
                                            <em>{item.description}</em>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                </div>
        </div>
    );
};

export default Specialties;
