import React from 'react';

const Resume = ({ siteConfig }) => {
    return (
        <section id='resume' className='s-resume target-section'>
            <div className='row s-resume__section'>
                <div className='column large-3 tab-12'>
                    <h3 className='section-header-allcaps'>
                        <i
                            className='fas fa-briefcase'
                            style={{ marginRight: '10px' }}
                        ></i>
                        Career
                    </h3>
                </div>
                <div className='column large-9 tab-12'>
                    {siteConfig.career &&
                        siteConfig.career.map(item => {
                            return (
                                <div className='resume-block' key={item.id}>
                                    <div className='resume-block__header'>
                                        <h4 className='h3'>
                                            {item.companyName}
                                        </h4>
                                        <p className='resume-block__header-meta'>
                                            <span> {item.specialization}</span>{' '}
                                            <span className='resume-block__header-date'>
                                                {' '}
                                                <em className='date'>
                                                    {item.monthOfJoining}{' '}
                                                    {item.yearOfJoining} -{' '}
                                                    {item.monthOfLeaving}{' '}
                                                    {item.yearOfLeaving}
                                                </em>
                                            </span>
                                        </p>
                                    </div>
                                    <p>{item.description}</p>
                                </div>
                            );
                        })}
                </div>
            </div>{' '}
            <div className='row s-resume__section'>
                <div className='column large-3 tab-12'>
                    <h3 className='section-header-allcaps'>
                        <i
                            className='fas fa-graduation-cap'
                            style={{ marginRight: '10px' }}
                        ></i>
                        Education
                    </h3>
                </div>
                <div className='column large-9 tab-12'>
                    {siteConfig.education &&
                        siteConfig.education.map(item => {
                            return (
                                <div className='resume-block' key={item.id}>
                                    <div className='resume-block__header'>
                                        <h4 className='h3'>
                                            {item.institutionName}
                                        </h4>
                                        <div className='resume-block__header-meta'>
                                            <span>
                                                {' '}
                                                {item.specialization}
                                                {item.certificates &&
                                                    item.certificates.map(
                                                        item => {
                                                            return (
                                                                <p
                                                                    key={
                                                                        item.id
                                                                    }
                                                                >
                                                                    &bull;{' '}
                                                                    {item.name}{' '}
                                                                    (
                                                                    <a
                                                                        className='cert-view'
                                                                        href={
                                                                            item.url
                                                                        }
                                                                        target='_blank'
                                                                        rel='noreferrer'
                                                                    >
                                                                        View
                                                                    </a>
                                                                    )
                                                                </p>
                                                            );
                                                        },
                                                    )}
                                            </span>

                                            {typeof item.monthOfEarning !==
                                                'undefined' &&
                                            typeof item.yearOfEarning !==
                                                'undefined' ? (
                                                <span className='resume-block__header-date'>
                                                    {' '}
                                                    <em className='date'>
                                                        {item.monthOfEarning}{' '}
                                                        {item.yearOfEarning}
                                                    </em>
                                                </span>
                                            ) : (
                                                <span></span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>{' '}
        </section>
    );
};

export default Resume;
