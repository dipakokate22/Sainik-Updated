import { Layout } from "../layout";

import Footer from "@/Components/Footer";
import Navbar from "@/Components/NavBar";
import SchoolListing from "./SchoolListing";

export default function Page() {
  return (
    <div>
      <Layout>
        <Navbar/>
        <SchoolListing/>
      </Layout>
    </div>
  )
}