import { Layout } from "../layout";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/NavBar";
import Details from "./Details";

export default function Page() {
  return (
    <div>
      <Layout>
        <Navbar/>
        <Details/>
        <Footer/>
      </Layout>
    </div>
  )
}