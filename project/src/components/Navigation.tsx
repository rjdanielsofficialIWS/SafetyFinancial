import { useState, useEffect } from 'react';
import { Menu, X, Shield, ChevronDown } from 'lucide-react';

interface NavigationProps {
  currentSection: string;
  onOpenLeadCapture: () => void;
}

export default function Navigation({ currentSection, onOpenLeadCapture }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
      setIsServicesDropdownOpen(false);
    }
  };

  const serviceLinks = [
    { id: 'services', label: 'All Services' },
    { id: 'life-insurance', label: 'Life Insurance' },
    { id: 'investments', label: 'Investment Solutions' },
    { id: 'credit-repair', label: 'Credit Repair' },
  ];

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <div className="bg-gradient-to-br from-gray-700 to-green-600 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-green-700 bg-clip-text text-transparent">
              Safety Financial
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.id === 'services' ? (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setIsServicesDropdownOpen(true)}
                  onMouseLeave={() => setIsServicesDropdownOpen(false)}
                >
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`text-sm font-medium transition-colors relative group flex items-center space-x-1 ${
                      currentSection === item.id ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-green-600 transform origin-left transition-transform duration-300 ${
                        currentSection === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </button>
                  {isServicesDropdownOpen && (
                    <div className="absolute top-full left-0 pt-2 w-56">
                      <div className="bg-white border border-gray-200 rounded-xl shadow-lg py-2 animate-fade-in">
                        {serviceLinks.map((service) => (
                          <button
                            key={service.id}
                            onClick={() => scrollToSection(service.id)}
                            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                          >
                            {service.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors relative group ${
                    currentSection === item.id ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-green-600 transform origin-left transition-transform duration-300 ${
                      currentSection === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </button>
              )
            ))}
            <button
              onClick={onOpenLeadCapture}
              className="bg-gradient-to-r from-gray-700 to-green-600 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Free Assessment
            </button>
          </div>

          <button
            className="md:hidden text-gray-600 hover:text-green-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              item.id === 'services' ? (
                <div key={item.id}>
                  <button
                    onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                    className={`flex items-center justify-between w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      currentSection === item.id
                        ? 'bg-green-50 text-green-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isServicesDropdownOpen && (
                    <div className="mt-2 ml-4 space-y-2">
                      {serviceLinks.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => scrollToSection(service.id)}
                          className="block w-full text-left px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                        >
                          {service.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    currentSection === item.id
                      ? 'bg-green-50 text-green-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              )
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenLeadCapture();
              }}
              className="w-full bg-gradient-to-r from-gray-700 to-green-600 text-white px-6 py-3 rounded-full font-medium"
            >
              Free Assessment
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
}
