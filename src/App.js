import React from "react";
import Header from "./components/header/header";
import Hero from "./components/hero/hero";
import About from "./components/about/about";
import Resume from "./components/resume/resume";
import Portfolio from "./components/portfolio/portfolio";
import Footer from "./components/footer/footer";
import ScrollProgress from "./components/ScrollProgress/ScrollProgress";
import siteConfig from "./siteConfig";

function App() {
  return (
    <div className="App">
      {siteConfig.features.scrollProgress && <ScrollProgress />}
      <Header />
      <Hero resumeData={siteConfig} />
      <About resumeData={siteConfig} />
      <Resume resumeData={siteConfig} />
      <Portfolio resumeData={siteConfig} />
      <Footer resumeData={siteConfig} />
    </div>
  );
}

export default App;
