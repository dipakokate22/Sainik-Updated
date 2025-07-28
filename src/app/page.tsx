// pages/index.js
import Footer from "@/Components/Footer";
import Navbar from "@/Components/NavBar";
import SainikPointsSection from "@/Pages/Homepage/SainikPointsSection";
import Testimonials from "@/Pages/Homepage/Testimonials";
import TrustedBySection from "@/Pages/Homepage/TrustedBySection";
import VoicesAndViews from "@/Pages/Homepage/VoicesAndViews";
import WhyJoinSainikSchool from "@/Pages/Homepage/WhyJoinSainikSchool";
import StateMap from "@/Pages/Homepage/StateMap";
import Card from "@/Pages/Homepage/Card";
import Hero from "@/Pages/Homepage/Hero";

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