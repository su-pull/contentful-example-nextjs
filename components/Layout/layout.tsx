import { ReactNode } from "react";
import Head from "next/head";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div>
      <Head>
        <title>Index - example Contentful</title>
        <meta name="description" content="example Contentful" />
      </Head>
      {children}
    </div>
  );
};

export default Layout;
