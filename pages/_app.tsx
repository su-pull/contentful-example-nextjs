import { AppProps } from "next/dist/shared/lib/router/router";
import "../styles/globals.css";
import "prismjs/themes/prism.css";
import Layout from "components/Layout/layout";

interface AppExtends extends AppProps {
  blog: {
    map: StringConstructor;
  };
}

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
