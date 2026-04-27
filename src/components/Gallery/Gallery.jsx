import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import poster from '../../assets/durai_poster.jpeg';
import workshop1 from '../../assets/workshop1.jpeg';
import workshop2 from '../../assets/workshop2.jpeg';
import workshop3 from '../../assets/workshop3.jpeg';
import service1 from '../../assets/service1.jpeg';
import service2 from '../../assets/service2.jpeg';
import service3 from '../../assets/service3.jpeg';
import service4 from '../../assets/service4.jpeg';
import service5 from '../../assets/service5.jpeg';
import service6 from '../../assets/service6.jpeg';
import service7 from '../../assets/service7.jpeg';
import solutions1 from '../../assets/solutions1.jpeg';
import solutions2 from '../../assets/solutions2.jpeg';

const categories = ['All', 'Workshop', 'Machines', 'Service', 'Solutions'];

const galleryImages = [
  { src: solutions2, category: 'Solutions', label: 'Workshop & Fabrication' },
  { src: workshop1, category: 'Machines', label: 'Aluminium Rolling Machine' },
  { src: workshop2, category: 'Workshop', label: 'Service & Maintenance' },
  { src: workshop3, category: 'Workshop', label: 'Industrial Solutions' },
  { src: service1, category: 'Service', label: 'Industrial Solutions' },
  { src: service2, category: 'Service', label: 'New & Used Machines' },
  { src: service3, category: 'Service', label: 'On-site Support' },
  { src: service4, category: 'Machines', label: 'Complete Support' },
  { src: service5, category: 'Machines', label: 'Build Quality' },
  { src: service6, category: 'Service', label: 'Precision Engineering' },
  { src: service7, category: 'Workshop', label: 'Customer Satisfaction' },
  { src: solutions1, category: 'Solutions', label: 'Industrial Solutions' },
];

const Gallery = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (index) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);
  const prevImg = () => setLightbox((lightbox - 1 + filtered.length) % filtered.length);
  const nextImg = () => setLightbox((lightbox + 1) % filtered.length);

  return (
    <section id="gallery" ref={ref} className="section-padding" style={{ background: 'linear-gradient(180deg, #f8faff 0%, #ffffff 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe' }}>
            Our Gallery
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 section-title mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Our <span className="gold-text">Work</span> Gallery
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            A snapshot of our workshop work, machines, and service support.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={`flex flex-wrap justify-center gap-3 mb-10 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
              style={activeCategory === cat
                ? { background: 'linear-gradient(135deg, #1d4ed8, #1e40af)', color: 'white', boxShadow: '0 4px 15px rgba(29,78,216,0.3)' }
                : { background: 'white', color: '#6b7280', border: '1px solid #e5e7eb' }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {filtered.map((img, i) => (
            <div
              key={i}
              className="gallery-img relative rounded-2xl overflow-hidden cursor-pointer group shadow-md"
              style={{ aspectRatio: '4/3' }}
              onClick={() => openLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
                style={{ background: 'linear-gradient(180deg, transparent, rgba(10,22,40,0.8))' }}>
                <span className="text-white font-medium text-sm p-3">{img.label}</span>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs px-2 py-1 rounded-full text-white font-medium"
                  style={{ background: 'rgba(29,78,216,0.8)' }}>{img.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.95)' }}
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition-colors z-10"
            onClick={closeLightbox}
          >
            <FaTimes />
          </button>
          <button
            className="absolute left-4 text-white text-4xl hover:text-gray-300 transition-colors z-10 p-2"
            onClick={(e) => { e.stopPropagation(); prevImg(); }}
          >
            <FaChevronLeft />
          </button>
          <img
            src={filtered[lightbox].src}
            alt={filtered[lightbox].label}
            className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10 p-2"
            onClick={(e) => { e.stopPropagation(); nextImg(); }}
          >
            <FaChevronRight />
          </button>
          <div className="absolute bottom-4 text-white text-sm font-medium">
            {filtered[lightbox].label} · {lightbox + 1} / {filtered.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
