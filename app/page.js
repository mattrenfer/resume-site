import Hero from './components/hero/hero';
import About from './components/about/about';
import Specialties from './components/specialties/specialties';
import Portfolio from './components/portfolio/portfolio';
import Resume from './components/resume/resume';
import Footer from './components/footer/footer';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import siteConfig from './siteConfig';

export default function Home() {
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
