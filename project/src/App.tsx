import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import LeadCaptureModal from './components/LeadCaptureModal';
import CreditRepairService from './components/CreditRepairService';
import CreditRepairLeadModal from './components/CreditRepairLeadModal';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [showCreditRepairModal, setShowCreditRepairModal] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const openLeadCaptureWithService = (service?: string) => {
    setSelectedService(service);
    setShowLeadCapture(true);
  };

  const closeLeadCapture = () => {
    setShowLeadCapture(false);
    setSelectedService(undefined);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'credit-repair', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <Navigation currentSection={currentSection} onOpenLeadCapture={() => openLeadCaptureWithService()} />
      <Hero onOpenLeadCapture={() => openLeadCaptureWithService()} />
      <Services onOpenLeadCapture={openLeadCaptureWithService} />
      <CreditRepairService onOpenLeadCapture={() => setShowCreditRepairModal(true)} />
      <About />
      <Contact />
      <Footer />
      {showLeadCapture && <LeadCaptureModal onClose={closeLeadCapture} preSelectedService={selectedService} />}
      {showCreditRepairModal && <CreditRepairLeadModal onClose={() => setShowCreditRepairModal(false)} />}
    </div>
  );
}

export default App;
