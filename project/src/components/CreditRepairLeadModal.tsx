import { useState } from 'react';
import { X, ChevronRight, CheckCircle, ChevronLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface CreditRepairLeadModalProps {
  onClose: () => void;
}

export default function CreditRepairLeadModal({ onClose }: CreditRepairLeadModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    creditScore: '',
    creditConcerns: [] as string[],
    financialGoals: [] as string[],
    timeline: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleOptionSelect = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setTimeout(() => {
      setStep(step + 1);
    }, 300);
  };

  const handleMultiSelect = (field: 'creditConcerns' | 'financialGoals', value: string) => {
    const currentValues = formData[field];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    setFormData({ ...formData, [field]: newValues });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('credit_repair_leads').insert([
        {
          current_credit_score: formData.creditScore,
          credit_concerns: formData.creditConcerns,
          financial_goals: formData.financialGoals,
          timeline: formData.timeline,
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
            A credit repair specialist will contact you within 24 hours to discuss your free
            credit analysis and personalized repair strategy.
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
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">Free Credit Repair Assessment</h2>
            <p className="text-sm text-gray-500 mt-1">Step {step} of 5</p>
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
            className="h-full bg-gradient-to-r from-green-600 to-blue-600 transition-all duration-500"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        <div className="p-4 sm:p-8 overflow-y-auto flex-1">
          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                What's your current credit score range?
              </h3>
              <p className="text-sm text-gray-500 mb-4 sm:mb-6">
                Don't worry - no judgment here. We've helped people in every situation.
              </p>
              <div className="space-y-3">
                {[
                  'Below 500 (Poor)',
                  '500-579 (Poor)',
                  '580-619 (Fair)',
                  '620-679 (Fair)',
                  '680-739 (Good)',
                  '740+ (Very Good/Excellent)',
                  "I don't know",
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect('creditScore', option)}
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

          {step === 2 && (
            <div className="animate-fade-in">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                What credit issues are affecting your score?
              </h3>
              <p className="text-sm text-gray-500 mb-4 sm:mb-6">Select all that apply</p>
              <div className="space-y-3 mb-4 sm:mb-6">
                {[
                  'Late Payments',
                  'Collections',
                  'Charge-Offs',
                  'Bankruptcies',
                  'Foreclosures',
                  'Repossessions',
                  'High Credit Utilization',
                  'Credit Report Errors',
                  'Identity Theft',
                  'Judgments or Liens',
                  'Not Sure',
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleMultiSelect('creditConcerns', option)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                      formData.creditConcerns.includes(option)
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-green-600 hover:bg-green-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-medium ${
                          formData.creditConcerns.includes(option)
                            ? 'text-green-600'
                            : 'text-gray-700'
                        }`}
                      >
                        {option}
                      </span>
                      {formData.creditConcerns.includes(option) && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(step + 1)}
                disabled={formData.creditConcerns.length === 0}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Continue ({formData.creditConcerns.length} selected)
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                What are your financial goals?
              </h3>
              <p className="text-sm text-gray-500 mb-4 sm:mb-6">Select all that apply</p>
              <div className="space-y-3 mb-4 sm:mb-6">
                {[
                  'Buy a Home',
                  'Refinance Mortgage',
                  'Get a Car Loan',
                  'Lower Interest Rates',
                  'Qualify for Credit Cards',
                  'Start a Business',
                  'Rent an Apartment',
                  'Lower Insurance Premiums',
                  'General Credit Improvement',
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleMultiSelect('financialGoals', option)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                      formData.financialGoals.includes(option)
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-green-600 hover:bg-green-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-medium ${
                          formData.financialGoals.includes(option)
                            ? 'text-green-600'
                            : 'text-gray-700'
                        }`}
                      >
                        {option}
                      </span>
                      {formData.financialGoals.includes(option) && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(step + 1)}
                disabled={formData.financialGoals.length === 0}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Continue ({formData.financialGoals.length} selected)
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                When do you need to see results?
              </h3>
              <p className="text-sm text-gray-500 mb-4 sm:mb-6">
                This helps us create the right strategy for your timeline
              </p>
              <div className="space-y-3">
                {[
                  'As soon as possible (30-60 days)',
                  'Within 3-6 months',
                  'Within 6-12 months',
                  'Over 12 months',
                  'No specific timeline',
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect('timeline', option)}
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

          {step === 5 && (
            <form onSubmit={handleSubmit} className="animate-fade-in">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                Almost done! Let's schedule your free consultation
              </h3>
              <p className="text-sm text-gray-500 mb-4 sm:mb-6">
                A credit repair specialist will reach out within 24 hours
              </p>

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
                    Additional Information (Optional)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all resize-none"
                    placeholder="Any specific questions or concerns about your credit situation?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? 'Submitting...' : 'Get My Free Credit Analysis'}
                </button>
              </div>

              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-xs text-gray-600 text-center">
                  Your information is 100% confidential. By submitting, you agree to be contacted
                  by a Safety Financial credit repair specialist. No obligation consultation.
                </p>
              </div>
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
