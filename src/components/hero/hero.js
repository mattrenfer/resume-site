import React, { Component } from "react";
export default class Hero extends Component {
  render() {
    let resumeData = this.props.resumeData;
    return (
      <React.Fragment>
        <section id="hero" className="s-hero target-section">
          <div className="s-hero__bg rellax" data-rellax-speed={-7} />
          <div className="row s-hero__content">
            <div className="column">
              <div className="s-hero__content-about">
                <h1>{resumeData.name}</h1>
                <h2>
                  <em>{resumeData.role}</em>
                </h2>
                <br />
                <h3>
                  I&apos;m an {resumeData.city}-based{" "}
                  <span>front-end developer</span> &amp;{" "}
                  <span>UI/UX designer</span> with more than 15 years of
                  experience creating intuitive digital user experiences.
                </h3>
                <div className="s-hero__content-social">
                  <a
                    href={resumeData.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-linkedin" aria-hidden="true" />
                  </a>
                  <a href={resumeData.github} target="_blank" rel="noreferrer">
                    <i className="fab fa-github-square" aria-hidden="true" />
                  </a>
                  <a
                    href={resumeData.facebook}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-facebook-square" aria-hidden="true" />
                  </a>
                  <a
                    href={resumeData.instagram}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-instagram" aria-hidden="true" />
                  </a>
                </div>
              </div>{" "}
            </div>
          </div>{" "}
          <div className="s-hero__scroll">
            <a href="#about" className="s-hero__scroll-link smoothscroll">
              <span className="scroll-arrow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  style={{
                    fill: "rgba(0, 0, 0, 1)",
                    transform: "",
                    msFilter: "",
                  }}
                >
                  <path d="M18.707 12.707L17.293 11.293 13 15.586 13 6 11 6 11 15.586 6.707 11.293 5.293 12.707 12 19.414z" />
                </svg>
              </span>
              <span className="scroll-text">Scroll Down</span>
            </a>
          </div>{" "}
        </section>{" "}
      </React.Fragment>
    );
  }
}
