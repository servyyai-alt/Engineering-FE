import React from 'react';
import { useInView } from 'react-intersection-observer';
import {
  FaChalkboardTeacher, FaShieldAlt, FaFlask, FaRunning,
  FaUserCheck, FaTrophy, FaBook, FaBus
} from 'react-icons/fa';

const features = [
  {
    icon: <FaChalkboardTeacher />,
    title: 'Highly Qualified Teachers',
    desc: 'Our faculty comprises experienced educators with advanced degrees and a passion for inspiring young minds to excel.',
    color: '#1d4ed8',
    bg: '#eff6ff',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Discipline & Values',
    desc: 'We instill strong moral values, respect, and discipline that prepare students for life beyond the classroom.',
    color: '#10b981',
    bg: '#f0fdf4',
  },
  {
    icon: <FaFlask />,
    title: 'Science & Computer Labs',
    desc: 'State-of-the-art science laboratories and computer labs equipped with modern technology for hands-on learning.',
    color: '#8b5cf6',
    bg: '#f5f3ff',
  },
  {
    icon: <FaRunning />,
    title: 'Sports & Activities',
    desc: 'Comprehensive sports facilities and extracurricular programs that nurture physical fitness and team spirit.',
    color: '#ef4444',
    bg: '#fef2f2',
  },
  {
    icon: <FaUserCheck />,
    title: 'Individual Student Care',
    desc: 'Personalized attention to each student\'s unique needs, ensuring no child is left behind in their academic journey.',
    color: '#f59e0b',
    bg: '#fffbeb',
  },
  {
    icon: <FaTrophy />,
    title: 'Excellent Academic Results',
    desc: 'Consistently achieving 100% board exam pass rates with top district and state level ranks year after year.',
    color: '#0891b2',
    bg: '#ecfeff',
  },
  {
    icon: <FaBook />,
    title: 'Smart Classrooms',
    desc: 'Digital smart boards and interactive learning tools that make education engaging, visual, and effective.',
    color: '#6366f1',
    bg: '#eef2ff',
  },
  {
    icon: <FaBus />,
    title: 'Transport Facility',
    desc: 'Safe and reliable transport network covering all nearby areas to ensure hassle-free daily commute for students.',
    color: '#059669',
    bg: '#ecfdf5',
  },
];

const WhyChooseUs = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="why-us" ref={ref} className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe' }}>
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 section-title mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            What Makes Us <span className="blue-text">Special</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover why thousands of parents trust Annai Abirami School for their children's future.
          </p>
        </div>

        {/* Feature Cards */}
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {features.map((f, i) => (
            <div
              key={i}
              className="card-hover rounded-2xl p-6 border border-gray-100 cursor-default group"
              style={{ background: f.bg }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                style={{ background: `${f.color}20`, color: f.color }}
              >
                {f.icon}
              </div>
              <h4 className="font-bold text-gray-900 mb-2 leading-tight">{f.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div
          className={`mt-16 rounded-3xl p-8 transition-all duration-700 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ background: 'linear-gradient(135deg, #0a1628, #1a3a5c)' }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: '2000+', label: 'Students Enrolled' },
              { num: '28+', label: 'Years of Excellence' },
              { num: '50+', label: 'Qualified Faculty' },
              { num: '100%', label: 'Board Results' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="stat-number">{stat.num}</div>
                <div className="text-gray-400 font-medium mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
