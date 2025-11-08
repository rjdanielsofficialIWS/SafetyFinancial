import { ArrowRight, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeroProps {
  onOpenLeadCapture: () => void;
}

export default function Hero({ onOpenLeadCapture }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="home"
      className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
            }`}
          >
            <div className="inline-block mb-4">
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                Trusted Canadian Financial Services
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Secure Your{' '}
              <span className="bg-gradient-to-r from-gray-700 to-green-600 bg-clip-text text-transparent">
                Financial Future
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Comprehensive life insurance, investment solutions, and credit repair services tailored for Canadians.
              Protect what matters most, build lasting wealth, and transform your credit score.
            </p>

            <div className="space-y-3 mb-10">
              {[
                'Personalized Financial Planning',
                'Expert Canadian Advisors',
                'Comprehensive Coverage Options',
                'Professional Credit Repair Services',
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${0.2 + index * 0.1}s both`,
                  }}
                >
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onOpenLeadCapture}
                className="bg-gradient-to-r from-gray-700 to-green-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group"
              >
                <span>Start Your Free Assessment</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const element = document.getElementById('services');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold hover:border-green-600 hover:text-green-600 transition-all duration-300"
              >
                Explore Services
              </button>
            </div>
          </div>

          <div
            className={`relative transform transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl transform rotate-3 opacity-20"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-bold text-gray-900 mb-2">$2M+</div>
                    <div className="text-gray-600">Coverage Secured</div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-bold text-gray-900 mb-2">1,500+</div>
                    <div className="text-gray-600">Satisfied Clients</div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-bold text-gray-900 mb-2">15+ Years</div>
                    <div className="text-gray-600">Industry Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
