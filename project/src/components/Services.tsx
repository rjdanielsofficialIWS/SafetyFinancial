import { useEffect, useState } from 'react';
import {
  Shield,
  Heart,
  Umbrella,
  Activity,
  TrendingUp,
  PiggyBank,
  GraduationCap,
  Lock,
  CreditCard,
} from 'lucide-react';

interface ServicesProps {
  onOpenLeadCapture: (service?: string) => void;
}

export default function Services({ onOpenLeadCapture }: ServicesProps) {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const insuranceServices = [
    {
      icon: Shield,
      title: 'Whole Life Insurance',
      description:
        'Permanent coverage with guaranteed cash value growth and lifelong protection for your loved ones.',
      color: 'from-gray-600 to-gray-700',
    },
    {
      icon: TrendingUp,
      title: 'Universal Life',
      description:
        'Flexible premium payments with investment growth potential and adjustable coverage amounts.',
      color: 'from-green-600 to-green-700',
    },
    {
      icon: Umbrella,
      title: 'Term Insurance',
      description:
        'Affordable temporary coverage for specific periods, perfect for families and mortgage protection.',
      color: 'from-gray-500 to-green-600',
    },
    {
      icon: Lock,
      title: 'Guaranteed Insurance',
      description:
        'No medical exam required. Simplified approval process for peace of mind coverage.',
      color: 'from-green-700 to-gray-600',
    },
    {
      icon: Heart,
      title: 'Critical Illness',
      description:
        'Lump-sum payment upon diagnosis of covered critical illnesses to focus on recovery.',
      color: 'from-gray-600 to-green-600',
    },
    {
      icon: Activity,
      title: 'Disability Insurance',
      description:
        'Income replacement if injury or illness prevents you from working. Protect your earning power.',
      color: 'from-green-600 to-gray-700',
    },
  ];

  const investmentServices = [
    {
      icon: PiggyBank,
      title: 'TFSA',
      description:
        'Tax-Free Savings Account for flexible, tax-free growth and withdrawals for any goal.',
      color: 'from-green-700 to-green-600',
    },
    {
      icon: TrendingUp,
      title: 'RRSP',
      description:
        'Registered Retirement Savings Plan with tax-deferred growth to build your retirement nest egg.',
      color: 'from-gray-600 to-green-700',
    },
    {
      icon: GraduationCap,
      title: 'RESP',
      description:
        'Registered Education Savings Plan with government grants to fund your child\'s education.',
      color: 'from-green-600 to-gray-600',
    },
    {
      icon: Shield,
      title: 'Segregated Funds',
      description:
        'Investment protection with insurance benefits, creditor protection, and estate planning advantages.',
      color: 'from-gray-700 to-green-600',
    },
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-gray-700 to-green-600 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive financial solutions designed to protect your family and grow your wealth
          </p>
        </div>

        <div id="life-insurance" className="mb-20 scroll-mt-24">
          <div className="flex items-center mb-8">
            <Shield className="w-8 h-8 text-green-600 mr-3" />
            <h3 className="text-3xl font-bold text-gray-900">Life Insurance Solutions</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insuranceServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  data-index={index}
                  className={`service-card group bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-500 cursor-pointer transform ${
                    visibleCards.includes(index)
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-12 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onClick={() => onOpenLeadCapture('Life Insurance')}
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  <div className="mt-4 text-green-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn More →
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div id="investments" className="mb-20 scroll-mt-24">
          <div className="flex items-center mb-8">
            <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
            <h3 className="text-3xl font-bold text-gray-900">Investment Solutions</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {investmentServices.map((service, index) => {
              const Icon = service.icon;
              const cardIndex = insuranceServices.length + index;
              return (
                <div
                  key={index}
                  data-index={cardIndex}
                  className={`service-card group bg-gradient-to-br from-green-50 to-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-500 cursor-pointer transform ${
                    visibleCards.includes(cardIndex)
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-12 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onClick={() => onOpenLeadCapture('Investment Solutions')}
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  <div className="mt-4 text-green-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn More →
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center mb-8">
            <CreditCard className="w-8 h-8 text-green-600 mr-3" />
            <h3 className="text-3xl font-bold text-gray-900">Credit Repair Services</h3>
          </div>

          <div className="grid md:grid-cols-1 gap-6 mb-12">
            <div
              data-index={insuranceServices.length + investmentServices.length}
              className={`service-card group bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-green-500/20 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 cursor-pointer transform ${
                visibleCards.includes(insuranceServices.length + investmentServices.length)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-12 opacity-0'
              }`}
              onClick={() => {
                const element = document.getElementById('credit-repair');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex items-start space-x-6 flex-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-semibold text-white mb-3 group-hover:text-green-400 transition-colors">
                      Professional Credit Repair
                    </h4>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Transform your credit score and unlock financial opportunities. Our proven process has helped thousands of Canadians remove negative items, dispute errors, and rebuild their credit—no matter how damaged. Average improvement: 150+ points.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm border border-green-500/30">
                        98% Success Rate
                      </span>
                      <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm border border-blue-500/30">
                        Money-Back Guarantee
                      </span>
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm border border-green-500/30">
                        Free Analysis
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-center lg:text-right">
                  <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                    <div className="text-sm text-gray-400 mb-2">Average Improvement</div>
                    <div className="text-4xl font-bold text-green-400 mb-1">+150</div>
                    <div className="text-gray-400">Credit Points</div>
                  </div>
                  <div className="mt-4 text-green-400 font-medium group-hover:translate-x-2 transition-transform inline-block">
                    View Credit Repair →
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-700 to-green-600 rounded-3xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Secure Your Financial Future?</h3>
          <p className="text-xl mb-8 opacity-90">
            Get a personalized assessment from our expert advisors
          </p>
          <button
            onClick={() => onOpenLeadCapture()}
            className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Schedule Your Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
