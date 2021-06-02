import React, { Component } from "react";
export default class Portfolio extends Component {
  render() {
    return (
      <React.Fragment>
        {/*generated code*/}
        <section id="portfolio" className="s-portfolio target-section">
          <div className="row s-portfolio__header">
            <div className="column large-12">
              <h3>Snapshots of my work</h3>
            </div>
          </div>
          <div className="row collapse block-large-1-4 block-medium-1-3 block-tab-1-2 block-500-stack folio-list">
            <div className="column folio-item">
              <a href="#modal-01" className="folio-item__thumb">
                <img
                  src="images/portfolio/webbstock.jpg"
                  srcSet="images/portfolio/webbstock.jpg, 
                                 images/portfolio/webbstock.jpg"
                  alt=""
                />
              </a>
            </div>{" "}
            {/* end folio-item */}
            <div className="column folio-item">
              <a href="#modal-02" className="folio-item__thumb">
                <img
                  src="images/portfolio/program-landing-pages.jpg"
                  srcSet="images/portfolio/program-landing-pages.jpg, 
                                 images/portfolio/program-landing-pages.jpg"
                  alt=""
                />
              </a>
            </div>{" "}
            {/* end folio-item */}
            <div className="column folio-item">
              <a href="#modal-03" className="folio-item__thumb">
                <img
                  src="images/portfolio/senior-show.jpg"
                  srcSet="images/portfolio/senior-show.jpg, 
                                 images/portfolio/senior-show.jpg"
                  alt=""
                />
              </a>
            </div>{" "}
            {/* end folio-item */}
          </div>{" "}
          {/* end folio-list */}
          {/* Modal Templates Popup
        =========================================================== */}
          <div id="modal-01" hidden>
            <div className="modal-popup">
              <img src="images/portfolio/gallery/webbstock.jpg" alt="" />
              <div className="modal-popup__desc">
                <h5>
                  Webbstock Landing Page - <em>Gardner-Webb University</em>
                </h5>
                <p>
                  Gardner-Webb University Gardner-Webb University was in need of
                  a landing page that showcased a partnered music festival with
                  the town of Boiling Springs.
                </p>
                Web functionality shown:
                <ul>
                  <li>
                    Responsive two-column layout (guitar &amp; countdown + copy)
                  </li>
                  <li>Ticking countdown to the event date &amp;time</li>
                  <li>Hidden rollover and accordion content</li>
                </ul>
                <ul className="modal-popup__cat">
                  <li>Branding</li>
                  <li>Product Design</li>
                </ul>
              </div>
              <a
                href="https://matthewrenfer.com/portfolio/webbstock.html"
                className="modal-popup__details"
              >
                Live Preview
              </a>
            </div>
          </div>{" "}
          {/* end modal */}
          <div id="modal-02" hidden>
            <div className="modal-popup">
              <img
                src="images/portfolio/gallery/program-landing-pages.jpg"
                alt=""
              />
              <div className="modal-popup__desc">
                <h5>
                  Program Landing Pages - <em>Gardner-Webb University</em>
                </h5>

                <p>
                  University marketing requested 50+ landing pages for a number
                  of programs—each with a call to action form providing more
                  information to the user. Built a simple &amp; clean reusable
                  theme for all landing pages with drop-ins for unique program
                  images, copy and contact form.
                </p>
                <ul className="modal-popup__cat">
                  <li>Branding</li>
                </ul>
              </div>
              <a
                href="https://matthewrenfer.com/portfolio/rn-to-bsn.html"
                className="modal-popup__details"
              >
                Live Preview
              </a>
            </div>
          </div>{" "}
          {/* end modal */}
          <div id="modal-03" hidden>
            <div className="modal-popup">
              <img src="images/portfolio/gallery/senior-show.jpg" alt="" />
              <div className="modal-popup__desc">
                <h5>
                  Annual Senior Show - <em>Gardner-Webb University</em>
                </h5>
                <p>
                  The university's art department was in need of a digital home
                  to showcase 16 students' final projects due to COVID-19. The
                  showcase needed an initial entry point per student. Once
                  there, each students' project page includes a profile, a
                  gallery of their work, and a video of their artist's
                  statement.
                </p>
                <ul className="modal-popup__cat">
                  <li>Product Design</li>
                </ul>
              </div>
            </div>
          </div>{" "}
          {/* end modal */}
        </section>{" "}
      </React.Fragment>
    );
  }
}
