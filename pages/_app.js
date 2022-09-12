import Layout from '../components/shared/Layout'
import '../styles/globals.css'
import CustomHead from "../components/shared/CustomHead";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <CustomHead title={`Rubrica | ${pageProps.title}`} />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp
