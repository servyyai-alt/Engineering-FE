import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Plant Manager',
    role: 'Rolling Unit, Chennai',
    text: 'Quick response and practical service support. The maintenance guidance helped us reduce downtime significantly.',
    rating: 5,
    avatar: 'PM',
    color: '#1d4ed8',
  },
  {
    name: 'Procurement Lead',
    role: 'Industrial Buyer',
    text: 'Transparent communication and reliable machine options. The buy/sale support and service readiness were smooth.',
    rating: 5,
    avatar: 'PL',
    color: '#10b981',
  },
  {
    name: 'Maintenance Supervisor',
    role: 'Aluminium Plant',
    text: 'Good workmanship and dependable after-service. The team understands production constraints and works accordingly.',
    rating: 5,
    avatar: 'MS',
    color: '#f59e0b',
  },
  {
    name: 'Workshop Owner',
    role: 'Machine Service',
    text: 'Strong technical support and spares planning. Helpful for keeping machines stable and consistent.',
    rating: 5,
    avatar: 'WO',
    color: '#8b5cf6',
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-padding" style={{ background: 'linear-gradient(135deg, #0a1628, #112240)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)' }}>
            What Clients Say
          </span>
          <h2 className="text-4xl font-black text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Trusted for <span className="gold-text">Industrial</span> Support
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="relative">
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`testimonial-card rounded-2xl p-6 transition-all duration-500 ${i === current || i === (current + 1) % testimonials.length ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`}
                style={{ background: 'rgba(255,255,255,0.05)', borderLeft: `4px solid ${t.color}`, border: `1px solid rgba(255,255,255,0.08)`, borderLeftColor: t.color }}
              >
                <FaQuoteLeft className="text-2xl mb-3" style={{ color: t.color, opacity: 0.6 }} />
                <p className="text-gray-300 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                    style={{ background: t.color }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.role}</div>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(t.rating)].map((_, j) => <FaStar key={j} className="text-yellow-400 text-xs" />)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? '24px' : '8px',
                  height: '8px',
                  background: i === current ? '#f59e0b' : 'rgba(255,255,255,0.3)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
