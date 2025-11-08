import { useEffect, useState } from 'react';
import {
  TrendingUp,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Award,
  FileText,
  Users,
  ArrowRight,
} from 'lucide-react';

interface CreditRepairServiceProps {
  onOpenLeadCapture: () => void;
}

export default function CreditRepairService({ onOpenLeadCapture }: CreditRepairServiceProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === 'credit-repair') {
              setIsVisible(true);
            }
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            if (!isNaN(index)) {
              setVisibleCards((prev) => [...new Set([...prev, index])]);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('credit-repair');
    if (section) observer.observe(section);

    const cards = document.querySelectorAll('.credit-problem-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const creditProblems = [
    { icon: XCircle, problem: 'Late Payments', solution: 'Dispute & removal strategies' },
    { icon: XCircle, problem: 'Collections', solution: 'Negotiate & validate debts' },
    { icon: XCircle, problem: 'Charge-Offs', solution: 'Legal dispute process' },
    { icon: XCircle, problem: 'Bankruptcies', solution: 'Rebuild credit profile' },
    { icon: XCircle, problem: 'High Utilization', solution: 'Optimization strategies' },
    { icon: XCircle, problem: 'Credit Report Errors', solution: 'Bureau dispute system' },
  ];

  const benefits = [
    'Free credit report analysis',
    'Personalized repair strategy',
    'Direct bureau disputes',
    'Creditor negotiations',
    'Legal compliance guarantee',
    '24/7 client portal access',
  ];

  const statistics = [
    { number: '150+', label: 'Average Point Increase' },
    { number: '6-12', label: 'Months Average Timeline' },
    { number: '98%', label: 'Success Rate' },
    { number: '5,000+', label: 'Clients Helped' },
  ];

  return (
    <section
      id="credit-repair"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <div className="inline-block mb-4">
            <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium border border-green-500/30">
              Transform Your Financial Future
            </span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Professional{' '}
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Credit Repair
            </span>{' '}
            Solutions
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            No matter how damaged your credit is, we can help. Our proven process has helped
            thousands of Canadians rebuild their credit and unlock financial opportunities.
          </p>
        </div>

        <div
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transform transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          {statistics.map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-4xl font-bold text-green-400 mb-2">{stat.number}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div
            className={`transform transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
            }`}
          >
            <h3 className="text-3xl font-bold mb-6 flex items-center">
              <Shield className="w-8 h-8 text-green-400 mr-3" />
              Why Choose Our Credit Repair Service?
            </h3>
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h4 className="text-xl font-semibold text-green-400 mb-3">
                  No Credit Too Damaged
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  Whether you've faced bankruptcy, foreclosure, collections, or identity theft,
                  we've successfully helped clients in your exact situation. We specialize in the
                  most challenging cases.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h4 className="text-xl font-semibold text-green-400 mb-3">Proven Results</h4>
                <p className="text-gray-300 leading-relaxed">
                  Our clients see an average credit score increase of 150+ points. We use advanced
                  dispute strategies, legal compliance, and proven negotiation tactics to deliver
                  real results.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h4 className="text-xl font-semibold text-green-400 mb-3">
                  Complete Transparency
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  No hidden fees, no false promises. We provide a detailed action plan upfront and
                  keep you updated every step of the way through your personal client portal.
                </p>
              </div>
            </div>
          </div>

          <div
            className={`transform transition-all duration-1000 delay-400 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
            }`}
          >
            <h3 className="text-3xl font-bold mb-6 flex items-center">
              <FileText className="w-8 h-8 text-green-400 mr-3" />
              Credit Problems We Fix
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {creditProblems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    data-index={index}
                    className={`credit-problem-card bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all duration-300 transform ${
                      visibleCards.includes(index)
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-12 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Icon className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-semibold text-white mb-1">{item.problem}</div>
                          <div className="text-sm text-gray-400">{item.solution}</div>
                        </div>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className={`bg-gradient-to-br from-green-600 to-blue-600 rounded-3xl p-8 lg:p-12 mb-16 transform transition-all duration-1000 delay-500 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h3 className="text-3xl font-bold mb-4 flex items-center">
                <Clock className="w-8 h-8 mr-3" />
                Our 4-Step Credit Repair Process
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <div className="font-semibold">Free Credit Analysis</div>
                    <div className="text-white/80 text-sm">
                      We review your complete credit report and identify all negative items
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <div className="font-semibold">Personalized Strategy</div>
                    <div className="text-white/80 text-sm">
                      Custom action plan targeting your specific credit issues
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <div className="font-semibold">Active Disputes & Negotiations</div>
                    <div className="text-white/80 text-sm">
                      We handle all communication with bureaus and creditors
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    4
                  </div>
                  <div>
                    <div className="font-semibold">Credit Rebuilding</div>
                    <div className="text-white/80 text-sm">
                      Strategies to maintain and continue improving your score
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Award className="w-12 h-12 text-yellow-400 mb-4" />
              <h4 className="text-2xl font-bold mb-3">100% Money-Back Guarantee</h4>
              <p className="text-white/90 mb-6">
                If we don't remove at least one negative item from your credit report, you get a
                full refund. No questions asked.
              </p>
              <button
                onClick={onOpenLeadCapture}
                className="w-full bg-white text-slate-900 px-6 py-3 rounded-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Get Started Free
              </button>
            </div>
          </div>
        </div>

        <div
          className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-12 transform transition-all duration-1000 delay-600 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6 flex items-center">
                <TrendingUp className="w-8 h-8 text-green-400 mr-3" />
                What's Included
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
                <div className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-green-400 mb-2">
                      Limited Time: Free Credit Consultation
                    </div>
                    <p className="text-gray-300 text-sm">
                      Get a comprehensive credit analysis (worth $199) absolutely free. Discover
                      exactly what's holding your score back and how we can fix it.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20">
              <h4 className="text-2xl font-bold mb-6 text-center">
                Transform Your Credit Score Today
              </h4>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                  <span className="text-gray-400">Current Average Credit:</span>
                  <span className="text-2xl font-bold text-red-400">580</span>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="w-8 h-8 text-green-400" />
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                  <span className="text-gray-400">After Credit Repair:</span>
                  <span className="text-2xl font-bold text-green-400">730+</span>
                </div>
              </div>
              <button
                onClick={onOpenLeadCapture}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group"
              >
                <span>Start Your Free Assessment</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-center text-xs text-gray-400 mt-4">
                No credit card required • Takes only 2 minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
