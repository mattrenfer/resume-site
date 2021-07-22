import React, { Component } from "react";
export default class Portfolio extends Component {
  render() {
    return (
      <React.Fragment>
        <section id="portfolio" className="s-portfolio target-section">
          <div className="row s-portfolio__header">
            <div className="column large-12">
              <h3>Portfolio</h3>
            </div>
          </div>
          <div className="row collapse block-large-1-4 block-medium-1-3 block-tab-1-2 block-500-stack folio-list">
            <div className="column folio-item">
              <a href="#modal-01" className="folio-item__thumb">
                <img
                  src="images/portfolio/covenant-member-guide.jpg"
                  srcSet="images/portfolio/covenant-member-guide.jpg, 
                                 images/portfolio/covenant-member-guide.jpg"
                  alt=""
                />
              </a>
            </div>{" "}
            {/* end folio-item */}
            <div className="column folio-item">
              <a href="#modal-02" className="folio-item__thumb">
                <img
                  src="images/portfolio/member-portal-ui.jpg"
                  srcSet="images/portfolio/member-portal-ui.jpg, 
                                 images/portfolio/member-portal-ui.jpg"
                  alt=""
                />
              </a>
            </div>{" "}
            {/* end folio-item */}
            <div className="column folio-item">
              <a href="#modal-03" className="folio-item__thumb">
                <img
                  src="images/portfolio/tactic-edge.jpg"
                  srcSet="images/portfolio/tactic-edge.jpg, 
                                 images/portfolio/tactic-edge.jpg"
                  alt=""
                />
              </a>
            </div>{" "}
          </div>
          {/* end folio-item */}
          <div className="row collapse block-large-1-4 block-medium-1-3 block-tab-1-2 block-500-stack folio-list">
            <div className="column folio-item">
              <a href="#modal-04" className="folio-item__thumb">
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
              <a href="#modal-05" className="folio-item__thumb">
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
              <a href="#modal-06" className="folio-item__thumb">
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
              <img
                src="images/portfolio/gallery/covenant-member-guide.jpg"
                alt=""
              />
              <div className="modal-popup__desc">
                <h5>
                  Covenant Member Guide - <em>Tactic Edge Solutions</em>
                </h5>
                <p>
                  Our client requested a redesign of their member guide site,
                  which was much too cluttered. We simplified the design and
                  added pagination functionality to flip through the content
                  like a published document.
                </p>
                <p>
                  Web functionality shown:
                  <ul>
                    <li>Pagination</li>
                    <li>Table of Contents</li>
                  </ul>
                </p>
              </div>
              <a
                href="https://memberguide.covenantshare.org/"
                className="modal-popup__details"
                target="_blank"
              >
                Live Preview
              </a>
            </div>
          </div>{" "}
          {/* end modal */}
          <div id="modal-02" hidden>
            <div className="modal-popup">
              <img src="images/portfolio/gallery/member-portal-ui.jpg" alt="" />
              <div className="modal-popup__desc">
                <h5>
                  Member Portal UI - <em>Tactic Edge Solutions</em>
                </h5>
                <p>
                  Our organization needed a redesigned back-end experience for
                  our users that looked modern and cleanly displayed the
                  information. The following photo is the chosen design,
                  centering the experience and improving the design as well as
                  information visibility.
                </p>
              </div>
              <a
                href="/portfolio/member-portal-mock-ups.pdf"
                className="modal-popup__details"
                target="_blank"
              >
                View All Mock-Ups
              </a>
            </div>
          </div>{" "}
          {/* end modal */}
          <div id="modal-03" hidden>
            <div className="modal-popup">
              <img src="images/portfolio/gallery/tactic-edge.jpg" alt="" />
              <div className="modal-popup__desc">
                <h5>
                  Tactic Edge Website - <em>Tactic Edge Solutions</em>
                </h5>
                <p>
                  The Tactic Edge website was in need of a more descriptive
                  website that also cleaned up the look and allowed the user to
                  scroll through more content per page. The resulting redesign
                  summarized what we offered on the homepage and categorized
                  most of the content into two main buckets: services and
                  solutions. It also clarified the call to action of requesting
                  a quote and/or contacting us for more information.
                </p>
              </div>
              <a
                href="https://www.tacticedge.com/"
                className="modal-popup__details"
                target="_blank"
              >
                Live Preview
              </a>
            </div>
          </div>{" "}
          {/* end modal */}
          <div id="modal-04" hidden>
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
                <p>
                  Web functionality shown:
                  <ul>
                    <li>Ticking countdown to the event date &amp;time</li>
                    <li>Hidden rollover and accordion content</li>
                  </ul>
                </p>
              </div>
              <a
                href="/portfolio/webbstock.html"
                className="modal-popup__details"
                target="_blank"
              >
                Live Preview
              </a>
            </div>
          </div>{" "}
          {/* end modal */}
          <div id="modal-05" hidden>
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
              </div>
              <a
                href="/portfolio/rn-to-bsn.html"
                className="modal-popup__details"
                target="_blank"
              >
                Live Preview
              </a>
            </div>
          </div>{" "}
          {/* end modal */}
          <div id="modal-06" hidden>
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
              </div>
            </div>
          </div>{" "}
          {/* end modal */}
        </section>{" "}
      </React.Fragment>
    );
  }
}
