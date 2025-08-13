import { Layout } from "../layout";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/NavBar";
import Compare from "./Compare";

export default function Page() {
  return (
    <div>
      <Layout>
        <Navbar/>
        <Compare/>
      </Layout>
    </div>
  )
}