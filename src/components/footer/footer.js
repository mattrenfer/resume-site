import React, { Component } from 'react';
import siteConfig from '../../siteConfig';
export default class Footer extends Component {
    render() {
        return (
            <React.Fragment>
                <footer className='s-footer'>
                    <div className='row'>
                        <div className='column large-4 medium-6 w-1000-stack s-footer__social-block'>
                            <ul className='s-footer__social'>
                                <li>
                                    <a
                                        href={
                                            siteConfig.personal.socialMedia
                                                .linkedin
                                        }
                                    >
                                        <i
                                            className='fab fa-linkedin-in'
                                            aria-hidden='true'
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={
                                            siteConfig.personal.socialMedia
                                                .github
                                        }
                                        target='_blank'
                                        rel='noreferrer'
                                    >
                                        <i
                                            className='fab fa-github-square'
                                            aria-hidden='true'
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={
                                            siteConfig.personal.socialMedia
                                                .facebook
                                        }
                                    >
                                        <i
                                            className='fab fa-facebook-f'
                                            aria-hidden='true'
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={
                                            siteConfig.personal.socialMedia
                                                .instagram
                                        }
                                    >
                                        <i
                                            className='fab fa-instagram'
                                            aria-hidden='true'
                                        />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className='column large-7 medium-6 w-1000-stack ss-copyright'>
                            <span>
                                &copy; {new Date().getFullYear()}{' '}
                                {siteConfig.personal.companyName} | All rights
                                reserved
                            </span>
                        </div>
                    </div>
                    <div className='ss-go-top'>
                        <a
                            className='smoothscroll'
                            title='Back to Top'
                            href='#top'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                            >
                                <path d='M6 4h12v2H6zm5 10v6h2v-6h5l-6-6-6 6z' />
                            </svg>
                        </a>
                    </div>{' '}
                </footer>
            </React.Fragment>
        );
    }
}
