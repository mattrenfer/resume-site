import React, { Component } from 'react';
export default class About extends Component {
    render() {
        let resumeData = this.props.resumeData;
        return (
            <React.Fragment>
                <section id='about' className='s-about target-section'>
                    <div className='row'>
                        <div className='column large-3 tab-12'>
                            <img
                                className='s-about__pic'
                                src='images/matt-profile.jpg'
                                alt=''
                            />
                        </div>
                        <div className='column large-9 tab-12 s-about__content'>
                            <h3>About Me</h3>
                            {/* <p>{resumeData.aboutMe}</p> */}
                            <p>
                                I have always been a problem-solver who thinks
                                in logical, systematic ways&mdash;engaging the
                                creative process along the way. A big part of
                                what I love in my career is birthing ideas into
                                practical, impactful solutions.
                            </p>
                            <p>
                                I&apos;ve been making websites since the early
                                dawn of the internet. A lot has changed since
                                then, which is why I am always eager to learn
                                newer technologies and expand my web development
                                toolkit, keeping clients ahead of the curve.
                            </p>
                            <p>
                                Creating intuitive user experiences is important
                                to me. The journey a user takes to get where
                                they need to go should be easy to follow and
                                even enjoyable.
                            </p>
                            <p>
                                Collaboration and positivity are central to how
                                I work. Great results come from great teams, and
                                I value environments where efficiency meets
                                balance. After all, it&apos;s not just about the
                                work we do, but how we do it.
                            </p>
                            <hr />
                            <div className='row s-about__content-bottom'>
                                <div className='column w-1000-stack'>
                                    <h3>Contact Details</h3>
                                    <p>
                                        {/* <a
                                            href={resumeData.facebookMessenger}
                                            target='_blank'
                                            rel='noreferrer'
                                        >
                                            Message Me on Facebook
                                        </a> */}
                                        <br />
                                        {resumeData.email}
                                    </p>
                                </div>
                                <div className='column w-1000-stack'>
                                    <a
                                        href={`${resumeData.publicUrl}/Interface Engineer - Matthew Renfer.pdf${resumeData.resumeVersion}`}
                                        className='btn btn--download'
                                        target='_blank'
                                        rel='noreferrer'
                                    >
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width={24}
                                            height={24}
                                            viewBox='0 0 24 24'
                                            style={{
                                                fill: 'rgba(0, 0, 0, 1)',
                                                transform: '',
                                                msFilter: '',
                                            }}
                                        >
                                            <path d='M12 16L16 11 13 11 13 4 11 4 11 11 8 11z' />
                                            <path d='M20,18H4v-7H2v7c0,1.103,0.897,2,2,2h16c1.103,0,2-0.897,2-2v-7h-2V18z' />
                                        </svg>
                                        View CV
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>{' '}
                </section>
            </React.Fragment>
        );
    }
}
