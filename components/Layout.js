import Head from "next/head";
import Navapp from "./Navbar";
import Footer from "./Footer"
const Layout = ({children}) => {
  return (
    <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
      <Navapp />
      {children}
    <Footer />
    </>
 )

};

export default Layout;