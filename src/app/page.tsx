import { Layout } from "./layout";
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
    <Layout>
      <Hero />
      <Card />
      <StateMap />
      <SainikPointsSection />
      <WhyJoinSainikSchool />
      <VoicesAndViews />
      <TrustedBySection />
      <Testimonials />
    </Layout>
  );
}