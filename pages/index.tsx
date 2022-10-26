import Head from "next/head";
import Link from "next/link";

const Index = (): JSX.Element => {
  return (
    <div>
      <Head>
        <title>Index - example Contentful</title>
        <meta name="description" content="example Contentful" />
      </Head>
      <main className="textLeft margin50p inblo">
        <h1>Hello Contentful!!</h1>
        <Link href="/1">
          <a>Next ...Dynamic routes</a>
        </Link>
        <h2>
          your set .env.local of CONTENTFUL_DELIVERY_TOKEN and
          CONTENTFUL_SPACE_ID
        </h2>
        <p>going contentful blog life enjoy!</p>
      </main>
    </div>
  );
};

export default Index;
