import { Layout } from "../layout";
import Footer from "@/Components/Footer"; 
import Navbar from "@/Components/NavBar";
import AllSchools from "./AllSchools";
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <Layout>
        <Navbar/>
        <Suspense fallback={<div>Loading...</div>}>
          <AllSchools /> 
        </Suspense>
      </Layout>
    </div>
  )
}