import React, { useEffect, useState } from 'react';
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
import Modal from '../components/common/Modal';

const HomePage = () => {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  useEffect(() => {
    setInquiryOpen(true);
  }, []);

  const openInquiry = () => setInquiryOpen(true);
  const closeInquiry = () => setInquiryOpen(false);

  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar onOpenInquiry={openInquiry} />
      <Hero onOpenInquiry={openInquiry} />
      <AboutUs />
      <Services onOpenInquiry={openInquiry} />
      <WhyChooseUs />
      <Gallery />
      <NewsSection />
      <Testimonials />
      <InquiryForm />
      <Contact />
      <Footer onOpenInquiry={openInquiry} />
      <WhatsAppFloat />

      {inquiryOpen && (
        <Modal title="Request a Quote / Inquiry" onClose={closeInquiry}>
          <InquiryForm variant="modal" />
        </Modal>
      )}
    </div>
  );
};

export default HomePage;
