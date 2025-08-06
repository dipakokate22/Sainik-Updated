import { Layout } from "../layout";
import Footer from "@/Components/Footer"; 
import Navbar from "@/Components/NavBar";
import AllSchools from "./AllSchools";

export default function Page() {
  return (
    <div>
      <Layout>
        <Navbar/>
        <AllSchools /> 
      </Layout>
    </div>
  )
}