import React, { Component } from "react";
export default class Portfolio extends Component {
  render() {
    let resumeData = this.props.resumeData;
    return (
      <React.Fragment>
        <section id="portfolio" className="s-portfolio target-section">
          <div className="row s-portfolio__header">
            <div className="column large-12">
              <h3>Portfolio</h3>
            </div>
          </div>
          <div className="row collapse block-large-1-4 block-medium-1-3 block-tab-1-2 block-500-stack folio-list">
            {resumeData.portfolio && 
              resumeData.portfolio.map((item) => {
                return (
                  <div className="column folio-item" key={item.id}>
                    <a href={"#modal-0"+item.id} className="folio-item__thumb">
                      <img
                        src={item.thumbnail}
                        srcSet={item.thumbnail}
                        alt={item.name}
                      />
                    </a>
                  </div>
                );
            })}
          </div>
          {resumeData.portfolio && resumeData.portfolio.map((item) => {
            return (
              <div id={"modal-0"+item.id} key={item.id} hidden>
                <div className="modal-popup">
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                  />
                  <div className="modal-popup__desc">
                    <h5>
                      {item.name} - <em>{item.companyName}</em>
                    </h5>
                    <p>
                      {item.description}
                    </p>
                      {item.listTitle && (
                        <p>
                          {item.listTitle}
                          <ul>
                            {item.listItems && item.listItems.map((listItem) => { 
                              return (
                                <li key={listItem.id}>{listItem.text}</li>
                              );  
                            })}
                          </ul>
                        </p>
                     )}
                  </div>
                  {item.link && (
                    <a
                      href={item.link}
                      className="modal-popup__details"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.linkText}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      </React.Fragment>
    );
  }
}
