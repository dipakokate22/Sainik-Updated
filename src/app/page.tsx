// pages/index.js
import Footer from "@/Components/Footer";
import Navbar from "@/Components/NavBar";
import SainikPointsSection from "@/pages/Homepage/SainikPointsSection";
import Testimonials from "@/pages/Homepage/Testimonials";
import TrustedBySection from "@/pages/Homepage/TrustedBySection";
import VoicesAndViews from "@/pages/Homepage/VoicesAndViews";
import WhyJoinSainikSchool from "@/pages/Homepage/WhyJoinSainikSchool";
import StateMap from "@/pages/Homepage/StateMap";
import Card from "@/pages/Homepage/Card";
import Hero from "@/pages/Homepage/Hero";

export default function Home() {
  return (
    <div className="bg-[#F7F1EE] w-full">
      {/* Navbar: always full width */}
      <div className="w-full">
        <Navbar />
      </div>
      {/* Main content: centered on desktop, padded on mobile/tablet */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <Card />
        <StateMap />
        <SainikPointsSection />
        <WhyJoinSainikSchool />
        <VoicesAndViews />
        <TrustedBySection />
        <Testimonials />
      </div>
      {/* Footer: always full width */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}