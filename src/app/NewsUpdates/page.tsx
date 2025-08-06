import { Layout } from "../layout";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/NavBar";
import News from "./News";

export default function Page() {
  return (
    <div>
      <Layout>
        <Navbar/>
        <News/>
      </Layout>
    </div>
  )
}