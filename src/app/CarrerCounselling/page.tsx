import { Layout } from "../layout";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/NavBar";
import Career from "./Career";

export default function Page() {
  return (
    <div>
      <Layout>
        <Navbar/>
        <Career/>
        <Footer/>
      </Layout>
    </div>
  )
}