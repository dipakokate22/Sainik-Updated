import { Layout } from "./layout";
import ScrollHandler from "@/Components/ScrollHandler";
import SainikPointsSection from "@/Pages/Homepage/SainikPointsSection";
import Testimonials from "@/Pages/Homepage/Testimonials";
import TrustedBySection from "@/Pages/Homepage/TrustedBySection";
import VoicesAndViews from "@/Pages/Homepage/VoicesAndViews";
import WhyJoinSainikSchool from "@/Pages/Homepage/WhyJoinSainikSchool";
import StateMap from "@/Pages/Homepage/StateMap";
import SchoolCard from "@/Pages/Homepage/SchoolCard";
import Hero from "@/Pages/Homepage/Hero";

export default function Home() {
  return (
    <Layout>
      <ScrollHandler>
        <Hero />
        <SchoolCard />
        <StateMap />
        <SainikPointsSection />
        <WhyJoinSainikSchool />
        <VoicesAndViews />
        <TrustedBySection />
        <Testimonials />
      </ScrollHandler>
    </Layout>
  );
}
