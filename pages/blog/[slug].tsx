import { GetStaticPaths, GetStaticProps } from "next";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Date from "../../components/Sys/date";
import styles from "./midasi.module.scss";
import client from "../../libs/contentful";

type Content = {
  slug: string;
  body: string;
  blog: {
    fields: {
      slug: string;
      date: string;
      title: string;
      body: string;
    };
  };
};

type ContentId = {
  slug: string;
};

const Id: React.FC<Content> = ({ blog }) => {
  return (
    <div>
      <main className="textLeft margin50p">
        <div className={styles.Time2}>
          <Date dateString={blog.fields.date} />
        </div>
        <h1 className={styles.h1}>{blog.fields.title}</h1>
        <div className="triangle-bottom" />
        <div>{documentToReactComponents}</div>
        <div dangerouslySetInnerHTML={{ __html: blog.fields.body }} />
      </main>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.getEntries<ContentId>({
    content_type: "blog",
    limit: 500,
  });

  const paths = data.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const slug = params.slug;

  if (typeof slug !== "string") {
    return {
      notFound: true,
    };
  }

  const { items } = await client.getEntries({
    content_type: "blog",
    "fields.slug": params.slug,
  });

  return {
    props: { blog: items[0] },
    revalidate: 1,
  };
};

export default Id;
