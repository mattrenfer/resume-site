import React from "react";
import Hero from "./components/hero/hero";
import Specialties from "./components/specialties/specialties";
import Testimonials from "./components/testimonials/testimonials";
import Portfolio from "./components/portfolio/portfolio";
import Resume from "./components/resume/resume";
import Footer from "./components/footer/footer";
import ScrollProgress from "./components/ScrollProgress/ScrollProgress";
import FullPageNav from "./components/FullPageNav/FullPageNav";
import siteConfig from "./siteConfig";

function App() {
  return (
    <div className="App">
      {siteConfig.features.scrollProgress && <ScrollProgress />}
      <FullPageNav />
      <Hero resumeData={siteConfig} />
      <Specialties resumeData={siteConfig} />
      <Testimonials resumeData={siteConfig} />
      <Portfolio resumeData={siteConfig} />
      <Resume resumeData={siteConfig} />
      <Footer resumeData={siteConfig} />
    </div>
  );
}

export default App;
