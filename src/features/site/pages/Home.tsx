import { useState } from 'react';
import AnnouncementBar from '../components/AnnouncementBar';
import AnnouncementModal from '../components/AnnouncementModal';
import Header from '../components/Header';
import Hero from '../components/Hero';
import QuickBenefits from '../components/QuickBenefits';
import CityPlansSelector from '../components/CityPlansSelector';
// import CoverageChecker from '../components/CoverageChecker';
import WhyOrigemDigital from '../components/WhyOrigemDigital';
// import AboutRebrand from '../components/AboutRebrand';
// import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckCoverage = (_cep: string) => {
    // Scroll para a seção de verificação de cobertura
    const coverageSection = document.getElementById('cobertura');
    if (coverageSection) {
      coverageSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar onLearnMoreClick={() => setIsModalOpen(true)} />
      <Header />
      
      <main>
        <Hero onCheckCoverage={handleCheckCoverage} />
        <QuickBenefits />
        <CityPlansSelector />
        {/* <div id="cobertura">
          <CoverageChecker />
        </div> */}
        <WhyOrigemDigital />
        {/* <AboutRebrand onLearnMoreClick={() => setIsModalOpen(true)} /> */}
        {/* <FAQ /> */}
        <FinalCTA />
      </main>

      <Footer />

      <AnnouncementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <ScrollToTop />
    </div>
  );
};

export default Home;

