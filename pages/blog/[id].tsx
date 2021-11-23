import { GetStaticPaths, GetStaticProps } from "next";
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Date from "../../components/Sys/date";
import styles from "./midasi.module.scss";

type ContentId = {
  id: string;
};
documentToReactComponents: string;
type Content = {
  blog: {
    fields: {
      date: string;
      title: string;
    };
  };
};

// type Content = {
//   fields: {
//     id: string;
//   };
// };

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
      </main>
    </div>
  );
};

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "blog",
  });

  const paths = res.items.map((item: any) => {
    return {
      params: { id: item.fields.id },
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

  const id = params.id;

  if (typeof id !== "string") {
    return {
      notFound: true,
    };
  }

  const { items } = await client.getEntries({
    content_type: "blog",
    "fields.id": params.id,
  });

  return {
    props: { blog: items[0] },
  };
};

export default Id;
