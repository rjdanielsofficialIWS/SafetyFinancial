import { useEffect, useState } from 'react';
import { Award, Users, Target, Shield } from 'lucide-react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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

    const section = document.getElementById('about');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const values = [
    {
      icon: Shield,
      title: 'Protection First',
      description:
        'Your family\'s security is our top priority. We help you build comprehensive protection plans.',
    },
    {
      icon: Users,
      title: 'Client-Centered',
      description:
        'Personalized solutions tailored to your unique needs and financial goals.',
    },
    {
      icon: Target,
      title: 'Goal Focused',
      description:
        'Strategic planning to help you achieve your short-term and long-term financial objectives.',
    },
    {
      icon: Award,
      title: 'Expert Guidance',
      description:
        'Licensed advisors with deep knowledge of Canadian financial regulations and products.',
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            About{' '}
            <span className="bg-gradient-to-r from-gray-700 to-green-600 bg-clip-text text-transparent">
              Safety Financial
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted Canadian advisors helping families and individuals secure their financial future
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
            }`}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Your Partner in Financial Security
            </h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                At Safety Financial, we understand that financial planning is about more than just
                numbers—it's about protecting your loved ones and achieving your dreams. For over 15
                years, we've been helping Canadian families navigate the complex world of insurance
                and investments.
              </p>
              <p>
                Our team of licensed advisors specializes in creating comprehensive financial
                strategies that provide peace of mind today and security for tomorrow. We take the
                time to understand your unique situation, goals, and concerns to develop personalized
                solutions that truly fit your needs.
              </p>
              <p>
                Whether you're looking to protect your family with life insurance, save for
                retirement, or build wealth through smart investments, we're here to guide you every
                step of the way.
              </p>
            </div>
          </div>

          <div
            className={`grid grid-cols-2 gap-4 transform transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
            }`}
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">15+</div>
              <div className="text-gray-700">Years Experience</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg mt-8">
              <div className="text-4xl font-bold text-green-600 mb-2">1,500+</div>
              <div className="text-gray-700">Happy Clients</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">$2M+</div>
              <div className="text-gray-700">Coverage Secured</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg mt-8">
              <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-700">Client Satisfaction</div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-green-600 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
