import React from 'react';
import { useInView } from 'react-intersection-observer';
import { FaCogs, FaIndustry, FaExchangeAlt, FaWrench, FaArrowRight } from 'react-icons/fa';

const services = [
  {
    icon: <FaIndustry className="text-3xl" />,
    title: 'Aluminium Rolling Machine',
    subtitle: 'Manufacturing & Service',
    desc: 'Build, service, and support for aluminium rolling machines with production-focused engineering.',
    bullets: ['Machine manufacturing', 'Commissioning support', 'Spares & consumables', 'Retrofit guidance'],
    color: '#f59e0b',
    bg: '#fffbeb',
  },
  {
    icon: <FaExchangeAlt className="text-3xl" />,
    title: 'New & Used Machines',
    subtitle: 'Buy / Sale',
    desc: 'Sourcing support and trusted options for buying or selling new and used machines.',
    bullets: ['Requirement assessment', 'Used machine evaluation', 'Delivery coordination', 'Service readiness'],
    color: '#10b981',
    bg: '#f0fdf4',
  },
  {
    icon: <FaWrench className="text-3xl" />,
    title: 'Service & Maintenance',
    subtitle: 'Preventive + Breakdown',
    desc: 'On-site troubleshooting, periodic maintenance, and fast service to reduce downtime.',
    bullets: ['Preventive maintenance', 'Breakdown support', 'Alignment checks', 'Operator guidance'],
    color: '#3b82f6',
    bg: '#eff6ff',
  },
  {
    icon: <FaCogs className="text-3xl" />,
    title: 'Industrial Solutions',
    subtitle: 'Complete Support',
    desc: 'End-to-end assistance for industrial requirements—right from planning to execution.',
    bullets: ['Solution design', 'Fabrication support', 'Spare planning', 'Long-term service'],
    color: '#8b5cf6',
    bg: '#f5f3ff',
  },
];

const Services = ({ onOpenInquiry }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="services" ref={ref} className="section-padding" style={{ background: '#0a1628' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)' }}
          >
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Services & <span className="gold-text">Solutions</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Premium engineering support for aluminium rolling machines—from manufacturing to maintenance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`rounded-3xl overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{
                transitionDelay: `${0.15 + i * 0.1}s`,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div className="p-7">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${s.color}22`, color: s.color }}>
                      {s.icon}
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest" style={{ color: s.color }}>
                        {s.subtitle}
                      </div>
                      <h3 className="text-2xl font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {s.title}
                      </h3>
                    </div>
                  </div>
                  <div className="hidden sm:block text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: `${s.color}1a`, color: s.color, border: `1px solid ${s.color}33` }}>
                    Premium
                  </div>
                </div>

                <p className="text-gray-300/80 text-sm leading-relaxed mb-5">{s.desc}</p>

                <div className="grid sm:grid-cols-2 gap-3">
                  {s.bullets.map((b) => (
                    <div key={b} className="rounded-2xl px-4 py-3 text-sm text-gray-200" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      {b}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => (onOpenInquiry ? onOpenInquiry() : document.querySelector('#inquiry')?.scrollIntoView({ behavior: 'smooth' }))}
                  className="mt-6 w-full py-3.5 rounded-2xl font-bold text-white flex items-center justify-center gap-2 transition-all hover:gap-4"
                  style={{ background: 'linear-gradient(135deg, #1d4ed8, #f59e0b)' }}
                >
                  Get Quote <FaArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
