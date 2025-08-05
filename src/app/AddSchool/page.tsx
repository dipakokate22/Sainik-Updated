import { Layout } from "../layout";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/NavBar";
import Add from "./Add";

export default function Page() {
  return (
    <div>
      <Layout>
        <Navbar/>
        <Add/>
        <Footer/>
      </Layout>
    </div>
  )
}