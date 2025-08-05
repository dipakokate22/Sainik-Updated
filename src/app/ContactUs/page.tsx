import { Layout } from "../layout";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/NavBar";
import Contact from "./Contact"

export default function Page() {
  return (
    <div>
      <Layout>
        <Navbar/>
        <Contact/>
        <Footer/>
      </Layout>
    </div>
  )
}