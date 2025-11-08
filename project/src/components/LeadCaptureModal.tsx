import { useState } from 'react';
import { X, ChevronRight, CheckCircle, ChevronLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LeadCaptureModalProps {
  onClose: () => void;
  preSelectedService?: string;
}

export default function LeadCaptureModal({ onClose, preSelectedService }: LeadCaptureModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    interest: preSelectedService || '',
    timeline: '',
    currentCoverage: '',
    budget: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const getQuestionsForService = (service: string) => {
    switch (service) {
      case 'Life Insurance':
        return {
          step2: {
            title: 'What type of life insurance are you interested in?',
            options: ['Whole Life', 'Universal Life', 'Term Life', 'Guaranteed Insurance', 'Not Sure Yet'],
            field: 'timeline',
          },
          step3: {
            title: 'Do you currently have life insurance coverage?',
            options: ['Yes, through employer', 'Yes, personal policy', 'No coverage', 'Not sure'],
            field: 'currentCoverage',
          },
          step4: {
            title: 'What coverage amount are you considering?',
            options: ['$100K-$250K', '$250K-$500K', '$500K-$1M', 'Over $1M', 'Not sure yet'],
            field: 'budget',
          },
        };
      case 'Investment Solutions':
        return {
          step2: {
            title: 'Which investment product interests you most?',
            options: ['TFSA', 'RRSP', 'RESP', 'Segregated Funds', 'Multiple products'],
            field: 'timeline',
          },
          step3: {
            title: 'What is your primary investment goal?',
            options: ['Retirement savings', 'Education savings', 'Tax-free growth', 'Wealth protection'],
            field: 'currentCoverage',
          },
          step4: {
            title: 'How much are you looking to invest monthly?',
            options: ['$100-$250', '$250-$500', '$500-$1,000', 'Over $1,000', 'Lump sum investment'],
            field: 'budget',
          },
        };
      case 'Credit Repair':
        return {
          step2: {
            title: 'What is your current credit score range?',
            options: ['Below 500', '500-599', '600-649', '650-699', 'Not sure'],
            field: 'timeline',
          },
          step3: {
            title: 'What credit issues are you experiencing?',
            options: ['Collections/charge-offs', 'Late payments', 'High credit utilization', 'Bankruptcy/consumer proposal', 'Multiple issues'],
            field: 'currentCoverage',
          },
          step4: {
            title: 'When do you need to improve your credit score?',
            options: ['ASAP (within 3 months)', '3-6 months', '6-12 months', 'No rush'],
            field: 'budget',
          },
        };
      default:
        return {
          step2: {
            title: 'When are you looking to get started?',
            options: ['Immediately', 'Within 1-3 months', 'Within 6 months', 'Just exploring options'],
            field: 'timeline',
          },
          step3: {
            title: 'Do you currently have any coverage?',
            options: ['Yes, through my employer', 'Yes, personal policy', 'No coverage', 'Not sure'],
            field: 'currentCoverage',
          },
          step4: {
            title: "What's your approximate monthly budget?",
            options: ['Under $100/month', '$100-$250/month', '$250-$500/month', 'Over $500/month', 'Flexible based on value'],
            field: 'budget',
          },
        };
    }
  };

  const questions = getQuestionsForService(formData.interest);

  const handleOptionSelect = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setTimeout(() => {
      setStep(step + 1);
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('leads').insert([
        {
          interest: formData.interest,
          timeline: formData.timeline,
          current_coverage: formData.currentCoverage,
          budget: formData.budget,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
      ]);

      if (error) throw error;

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-12 max-w-md w-full text-center animate-scale-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h3>
          <p className="text-gray-600">
            We've received your information and one of our advisors will contact you within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col animate-slide-up">
        <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">Free Financial Assessment</h2>
            <p className="text-sm text-gray-500 mt-1">Step {step} of {preSelectedService ? 4 : 5}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 ml-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="h-2 bg-gray-100 flex-shrink-0">
          <div
            className="h-full bg-gradient-to-r from-gray-700 to-green-600 transition-all duration-500"
            style={{ width: `${(step / (preSelectedService ? 4 : 5)) * 100}%` }}
          />
        </div>

        <div className="p-4 sm:p-8 overflow-y-auto flex-1">
          {step === 1 && !preSelectedService && (
            <div className="animate-fade-in">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                What are you most interested in?
              </h3>
              <div className="space-y-3">
                {[
                  'Life Insurance',
                  'Investment Solutions',
                  'Credit Repair',
                  'Insurance & Investments',
                  'Multiple Services',
                  'Not Sure Yet',
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect('interest', option)}
                    className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-green-600 hover:bg-green-50 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 group-hover:text-green-600 font-medium">
                        {option}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transform group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {((step === 2 && !preSelectedService) || (step === 1 && preSelectedService)) && (
            <div className="animate-fade-in">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                {questions.step2.title}
              </h3>
              <div className="space-y-3">
                {questions.step2.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(questions.step2.field, option)}
                    className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-green-600 hover:bg-green-50 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 group-hover:text-green-600 font-medium">
                        {option}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transform group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {((step === 3 && !preSelectedService) || (step === 2 && preSelectedService)) && (
            <div className="animate-fade-in">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                {questions.step3.title}
              </h3>
              <div className="space-y-3">
                {questions.step3.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(questions.step3.field, option)}
                    className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-green-600 hover:bg-green-50 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 group-hover:text-green-600 font-medium">
                        {option}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transform group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {((step === 4 && !preSelectedService) || (step === 3 && preSelectedService)) && (
            <div className="animate-fade-in">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                {questions.step4.title}
              </h3>
              <div className="space-y-3">
                {questions.step4.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(questions.step4.field, option)}
                    className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-green-600 hover:bg-green-50 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 group-hover:text-green-600 font-medium">
                        {option}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transform group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {((step === 5 && !preSelectedService) || (step === 4 && preSelectedService)) && (
            <form onSubmit={handleSubmit} className="animate-fade-in">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                Great! Let's connect you with an advisor
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all resize-none"
                    placeholder="Any specific questions or concerns?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-gray-700 to-green-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? 'Submitting...' : 'Complete Assessment'}
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                By submitting, you agree to be contacted by a Safety Financial advisor
              </p>
            </form>
          )}
        </div>

        {step > 1 && (
          <div className="p-4 sm:p-6 border-t border-gray-200 flex-shrink-0">
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors font-medium"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
