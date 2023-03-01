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
              {resumeData.career &&
                resumeData.career.map((item) => {
                  return (
                    <div className="resume-block" key={item.id}>
                      <div className="resume-block__header">
                        <h4 className="h3">{item.companyName}</h4>
                        <p className="resume-block__header-meta">
                          <span> {item.specialization}</span>
                            {" "}
                          <span className="resume-block__header-date">
                            {" "}
                            <em className="date">
                              {item.monthOfJoining} {item.yearOfJoining} -{" "}
                              {item.monthOfLeaving} {item.yearOfLeaving}
                            </em>
                          </span>
                        </p>
                      </div>
                      <p>{item.description}</p>
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
                        <h4 className="h3">{item.institutionName}</h4>
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

                          {typeof item.monthOfEarning !== "undefined" &&
                          typeof item.yearOfEarning !== "undefined" ? (
                            <span className="resume-block__header-date">
                              {" "}
                              <em className="date">
                                {item.monthOfEarning} {item.yearOfEarning}
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
          <div className="row s-resume__section">
            <div className="column large-3 tab-12">
              <h3 className="section-header-allcaps">Skills</h3>
            </div>
            <div className="column large-9 tab-12">
              <div className="resume-block">
                <ul className="skill-bars-fat">
                  {resumeData.skills && 
                    resumeData.skills.map((item) => {
                    return (
                      <li key={(item.key)}>
                        <div className={"progress percent"+item.skill} />
                        <strong>{item.title}</strong>
                        <em>{item.description}</em>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
