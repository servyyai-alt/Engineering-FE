import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Priya Ramesh',
    role: 'Parent of Class X Student',
    text: 'My daughter has transformed completely since joining Annai Abirami School. The teachers are incredibly dedicated and the smart classroom environment makes learning truly engaging.',
    rating: 5,
    avatar: 'PR',
    color: '#1d4ed8',
  },
  {
    name: 'Karthik Selvam',
    role: 'Parent of Class XII Student',
    text: 'My son scored 98% in board exams and got into his dream medical college. The biology group teachers here are exceptional. We are extremely proud and grateful.',
    rating: 5,
    avatar: 'KS',
    color: '#10b981',
  },
  {
    name: 'Meena Krishnan',
    role: 'Alumni - Class of 2020',
    text: 'I studied from LKG to XII here. This school shaped who I am today. The values and discipline I learned here helped me secure a government job at 22. Forever grateful!',
    rating: 5,
    avatar: 'MK',
    color: '#f59e0b',
  },
  {
    name: 'Suresh Kumar',
    role: 'Parent of Twin Students',
    text: 'Both my children are studying here and I couldn\'t be happier. The individual attention each teacher gives is remarkable. The school genuinely cares about every child.',
    rating: 5,
    avatar: 'SK',
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
            What Parents Say
          </span>
          <h2 className="text-4xl font-black text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Trusted by <span className="gold-text">Thousands</span> of Families
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
