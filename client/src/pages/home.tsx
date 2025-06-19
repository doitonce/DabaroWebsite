import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import SilverPriceSection from "@/components/SilverPriceSection";
import InventorySection from "@/components/InventorySection";
import Gallery from "@/components/Gallery";
import History from "@/components/History";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    // URL 해시를 확인하고 해당 섹션으로 스크롤 (페이지 로드 후에만)
    const hash = window.location.hash;
    if (hash === '#contact') {
      // sessionStorage를 사용해 상세페이지에서 온 경우에만 스크롤
      const fromDetailPage = sessionStorage.getItem('scrollToContact');
      if (fromDetailPage) {
        setTimeout(() => {
          const contactElement = document.getElementById('contact');
          if (contactElement) {
            contactElement.scrollIntoView({ behavior: 'smooth' });
          }
          // 스크롤 후 플래그 제거
          sessionStorage.removeItem('scrollToContact');
        }, 300);
      }
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <SilverPriceSection />
      <InventorySection />
      <Gallery />
      <History />
      <Contact />
      <Footer />
    </div>
  );
}
