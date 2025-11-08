import { useEffect, useState } from 'react';
import { Star, TrendingUp, Quote } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Testimonial {
  id: string;
  client_name: string;
  starting_score: number;
  ending_score: number;
  timeframe_months: number;
  testimonial_text: string;
  location: string;
  is_featured: boolean;
}

export default function CreditRepairTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('credit_repair_testimonials')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;
        if (data) setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('testimonials');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const featuredTestimonials = testimonials.filter((t) => t.is_featured);
  const regularTestimonials = testimonials.filter((t) => !t.is_featured);

  if (loading || testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-12 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Real Results from{' '}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Real People
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how we've helped thousands of Canadians transform their credit and change their
            lives
          </p>
        </div>

        {featuredTestimonials.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl p-8 transform transition-all duration-1000 hover:scale-105 hover:shadow-2xl ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <Quote className="w-10 h-10 text-green-600 opacity-50" />
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Starting Score</div>
                      <div className="text-3xl font-bold text-red-600">
                        {testimonial.starting_score}
                      </div>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Ending Score</div>
                      <div className="text-3xl font-bold text-green-600">
                        {testimonial.ending_score}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg px-3 py-2 text-center">
                    <span className="text-sm font-semibold text-gray-700">
                      +{testimonial.ending_score - testimonial.starting_score} points in{' '}
                      {testimonial.timeframe_months} months
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.testimonial_text}"
                </p>

                <div className="border-t border-gray-200 pt-4">
                  <div className="font-semibold text-gray-900">{testimonial.client_name}</div>
                  {testimonial.location && (
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {regularTestimonials.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`bg-gray-50 border border-gray-200 rounded-xl p-6 transform transition-all duration-1000 hover:shadow-lg ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: `${(featuredTestimonials.length + index) * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <div className="text-sm font-semibold text-green-600">
                    +{testimonial.ending_score - testimonial.starting_score} pts
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4 bg-white rounded-lg p-3">
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-1">Before</div>
                    <div className="text-xl font-bold text-red-600">
                      {testimonial.starting_score}
                    </div>
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-1">After</div>
                    <div className="text-xl font-bold text-green-600">
                      {testimonial.ending_score}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-1">Time</div>
                    <div className="text-xl font-bold text-gray-700">
                      {testimonial.timeframe_months}m
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  "{testimonial.testimonial_text}"
                </p>

                <div className="border-t border-gray-200 pt-3">
                  <div className="font-semibold text-gray-900 text-sm">
                    {testimonial.client_name}
                  </div>
                  {testimonial.location && (
                    <div className="text-xs text-gray-600">{testimonial.location}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          className={`mt-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-8 text-center text-white transform transition-all duration-1000 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          <h3 className="text-2xl font-bold mb-3">Ready to Write Your Success Story?</h3>
          <p className="text-lg mb-2 opacity-90">
            Join thousands of Canadians who have transformed their credit with Safety Financial
          </p>
          <p className="text-sm mb-6 opacity-80">
            Average improvement: 150+ points • 98% success rate • Money-back guarantee
          </p>
          <a
            href="#credit-repair"
            className="inline-block bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Start Your Free Assessment
          </a>
        </div>
      </div>
    </section>
  );
}
