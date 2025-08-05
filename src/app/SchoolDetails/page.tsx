import { Layout } from "../layout";
import Navbar from "@/Components/NavBar";
import Details from "./Details";

export default function Page() {
  return (
    <div>
      <Layout>
        <Navbar/>
        <Details/>
      </Layout>
    </div>
  )
}