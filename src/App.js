import React, { Component } from "react";
import Header from "./components/header/header";
import Hero from "./components/hero/hero";
import About from "./components/about/about";
import Resume from "./components/resume/resume";
import Portfolio from "./components/portfolio/portfolio";
import Footer from "./components/footer/footer";
import resumeData from "./resumeData";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Hero resumeData={resumeData} />
        <About resumeData={resumeData} />
        <Resume resumeData={resumeData} />
        <Portfolio resumeData={resumeData} />
        <Footer resumeData={resumeData} />
      </div>
    );
  }
}
export default App;
