import { GetStaticPaths, GetStaticProps } from "next";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Date from "../../components/Sys/date";
import styles from "./midasi.module.scss";
import { buildClient, IPostFields } from "../../libs/contentful";
import { EntryCollection } from "contentful";

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

const client = buildClient();

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

const getPostEntries = async () => {
  const { items }: EntryCollection<IPostFields> = await client.getEntries({
    content_type: "blog",
  });
  return items;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const items = await getPostEntries();
  const paths = items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async () => {
  const items = await getPostEntries();
  return {
    props: {
      posts: items,
    },
  };
};

export default Id;
