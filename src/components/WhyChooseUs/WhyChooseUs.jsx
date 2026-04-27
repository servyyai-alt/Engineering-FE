import React from 'react';
import { useInView } from 'react-intersection-observer';
import {
  FaUserCheck, FaShieldAlt, FaWrench, FaCogs,
  FaHandshake, FaClock, FaIndustry, FaTools
} from 'react-icons/fa';

const features = [
  {
    icon: <FaWrench />,
    title: 'Expert Service Team',
    desc: 'Practical troubleshooting and maintenance support focused on uptime and safe operation.',
    color: '#1d4ed8',
    bg: '#eff6ff',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Quality & Safety',
    desc: 'Precision workmanship with safe service practices and quality components.',
    color: '#10b981',
    bg: '#f0fdf4',
  },
  {
    icon: <FaCogs />,
    title: 'Manufacturing Capability',
    desc: 'Support for aluminium rolling machine manufacturing, spares, and service readiness.',
    color: '#8b5cf6',
    bg: '#f5f3ff',
  },
  {
    icon: <FaClock />,
    title: 'Quick Response',
    desc: 'Fast coordination for breakdown support, parts planning, and on-site visits.',
    color: '#ef4444',
    bg: '#fef2f2',
  },
  {
    icon: <FaUserCheck />,
    title: 'Requirement-first Approach',
    desc: 'Clear understanding of your requirement before recommending a solution or machine option.',
    color: '#f59e0b',
    bg: '#fffbeb',
  },
  {
    icon: <FaIndustry />,
    title: 'Industrial Solutions',
    desc: 'End-to-end support for industrial needs—from planning to execution and after-service.',
    color: '#0891b2',
    bg: '#ecfeff',
  },
  {
    icon: <FaHandshake />,
    title: 'Transparent Communication',
    desc: 'Straightforward timelines and progress updates—no surprises.',
    color: '#6366f1',
    bg: '#eef2ff',
  },
  {
    icon: <FaTools />,
    title: 'Maintenance Planning',
    desc: 'Preventive schedules and spare planning to keep production stable and predictable.',
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
            Why manufacturers and service teams rely on Durai Eng Works for rolling machine support.
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
              { num: 'Manufacturing', label: 'Machines & Spares' },
              { num: 'Service', label: 'On-site Support' },
              { num: 'Buy / Sale', label: 'New & Used Options' },
              { num: 'Solutions', label: 'Industrial Needs' },
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
