import React from 'react';
import Hero from './components/hero/hero';
import About from './components/about/about';
import Resume from './components/resume/resume';
import Specialties from './components/specialties/specialties';
import Portfolio from './components/portfolio/portfolio';
import Footer from './components/footer/footer';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import siteConfig from './siteConfig';

function App() {
    return (
        <div className='App'>
            {siteConfig.features.scrollProgress && <ScrollProgress />}
            <Hero siteConfig={siteConfig} />
            <About siteConfig={siteConfig} />
            <Specialties siteConfig={siteConfig} />
            <Portfolio siteConfig={siteConfig} />
            <Resume siteConfig={siteConfig} />
            <Footer siteConfig={siteConfig} />
        </div>
    );
}

export default App;
