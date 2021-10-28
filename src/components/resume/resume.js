import React, { Component } from "react";
export default class Resume extends Component {
  render() {
    let resumeData = this.props.resumeData;
    return (
      <React.Fragment>
        <section id="resume" className="s-resume target-section">
          <div className="row s-resume__section">
            <div className="column large-3 tab-12">
              <h3 className="section-header-allcaps">Career</h3>
            </div>
            <div className="column large-9 tab-12">
              {resumeData.work &&
                resumeData.work.map((item) => {
                  return (
                    <div className="resume-block" key={item.id}>
                      <div className="resume-block__header">
                        <h4 className="h3">{item.CompanyName}</h4>
                        <p className="resume-block__header-meta">
                          <span> {item.specialization}</span>

                          <span className="resume-block__header-date">
                            {" "}
                            <em className="date">
                              {item.MonthOfJoining} {item.YearOfJoining} -{" "}
                              {item.MonthOfLeaving} {item.YearOfLeaving}
                            </em>
                          </span>
                        </p>
                      </div>
                      <p>{item.Achievements}</p>
                    </div>
                  );
                })}
            </div>
          </div>{" "}
          <div className="row s-resume__section">
            <div className="column large-3 tab-12">
              <h3 className="section-header-allcaps">Education</h3>
            </div>
            <div className="column large-9 tab-12">
              {resumeData.education &&
                resumeData.education.map((item) => {
                  return (
                    <div className="resume-block" key={item.id}>
                      <div className="resume-block__header">
                        <h4 className="h3">{item.InstitutionName}</h4>

                        <p className="resume-block__header-meta">
                          <span>
                            {" "}
                            {item.specialization}
                            {item.certificates &&
                              item.certificates.map((item) => {
                                return (
                                  <p key={item.id}>
                                    &bull; {item.name} (
                                    <a
                                      className="cert-view"
                                      href={item.url}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      View
                                    </a>
                                    )
                                  </p>
                                );
                              })}
                          </span>

                          {typeof item.MonthOfEarning !== "undefined" &&
                          typeof item.YearOfEarning !== "undefined" ? (
                            <span className="resume-block__header-date">
                              {" "}
                              <em className="date">
                                {item.MonthOfEarning} {item.YearOfEarning}
                              </em>
                            </span>
                          ) : (
                            <span></span>
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>{" "}
          {/* s-resume__section */}
          <div className="row s-resume__section">
            <div className="column large-3 tab-12">
              <h3 className="section-header-allcaps">Skills</h3>
            </div>
            <div className="column large-9 tab-12">
              <div className="resume-block">
                <ul className="skill-bars-fat">
                  <li>
                    <div className="progress percent100" />
                    <strong>Proficient</strong>
                    <em>HTML5, CSS3, JavaScript</em>
                  </li>
                  <li>
                    <div className="progress percent85" />
                    <strong>Strong</strong>
                    <em>React, WordPress, Bootcamp, AWS</em>
                  </li>
                  <li>
                    <div className="progress percent70" />
                    <strong>Familiar</strong>
                    <em>PHP, Python, C#</em>
                  </li>
                </ul>
              </div>{" "}
              {/* end resume-block */}
            </div>
          </div>{" "}
          {/* s-resume__section */}
        </section>{" "}
        {/* end s-resume */}
      </React.Fragment>
    );
  }
}
