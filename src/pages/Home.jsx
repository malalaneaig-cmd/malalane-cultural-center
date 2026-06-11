import React from 'react';
import { LanguageProvider } from '../components/mcc/LanguageContext';
import Navbar from '../components/mcc/Navbar';
import HeroSection from '../components/mcc/HeroSection';
import WhoWeAre from '../components/mcc/WhoWeAre';
import MissionSection from '../components/mcc/MissionSection';
import VisionSection from '../components/mcc/VisionSection';
import WhatWeDo from '../components/mcc/WhatWeDo';
import DonateSection from '../components/mcc/DonateSection';
import MediaSection from '../components/mcc/MediaSection';
import GetInvolved from '../components/mcc/GetInvolved';
import Footer from '../components/mcc/Footer';

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#FDF8F0]" style={{ fontFamily: "'Inter', sans-serif" }}>
        <Navbar />
        <HeroSection />
        <WhoWeAre />
        <MissionSection />
        <VisionSection />
        <WhatWeDo />
        <DonateSection />
        <MediaSection />
        <GetInvolved />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
