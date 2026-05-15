import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TelmaSection from "@/components/TelmaSection";
import FeaturesSection from "@/components/FeaturesSection";
import AgroSelfSection from "@/components/AgroSelfSection";
import InstallationsSection from "@/components/InstallationsSection";
import PartnersSection from "@/components/PartnersSection";
import ImpactSection from "@/components/ImpactSection";
import AchievementsSection from "@/components/AchievementsSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.slice(1);
      const tryScroll = (attempts = 0) => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else if (attempts < 10) {
          setTimeout(() => tryScroll(attempts + 1), 100);
        }
      };
      setTimeout(() => tryScroll(), 80);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <TelmaSection />
      <FeaturesSection />
      <AgroSelfSection />
      <InstallationsSection />
      <ImpactSection />
      <AchievementsSection />
      <ServicesSection />
      <PartnersSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
