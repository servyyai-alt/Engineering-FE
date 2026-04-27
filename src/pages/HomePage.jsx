import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import AboutUs from '../components/About/About';
import Services from '../components/Services/Services';
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs';
import Gallery from '../components/Gallery/Gallery';
import NewsSection from '../components/common/NewsSection';
import Testimonials from '../components/common/Testimonials';
import InquiryForm from '../components/Inquiry/InquiryForm';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import WhatsAppFloat from '../components/common/WhatsAppFloat';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <AboutUs />
      <Services />
      <WhyChooseUs />
      <Gallery />
      <NewsSection />
      <Testimonials />
      <InquiryForm />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default HomePage;
