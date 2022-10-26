import { AppProps } from "next/dist/shared/lib/router/router";
import "../styles/globals.css";
import "prismjs/themes/prism.css";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return <Component {...pageProps} />;
};

export default MyApp;
