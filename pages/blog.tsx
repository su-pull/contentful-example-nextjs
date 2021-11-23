import { GetStaticProps } from "next";
import Date from "../components/Sys/date";
import Link from "next/link";
import client from "../libs/contentful";

type Map = {
  blog: {
    map: StringConstructor;
  };
};

type Content = {
  sys: {
    slug: string;
  };
  fields: {
    slug: string;
    title: string;
    date: string;
  };
};

const Blog = ({ blog }: Map) => {
  return (
    <div>
      {blog.map((props: Content) => (
        <dl key={props.sys.slug}>
          <dt>
            <Date dateString={props.fields.date} />
          </dt>
          <Link href={`/blog/${props.sys.slug}`}>
            <a>{props.fields.title}</a>
          </Link>
        </dl>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await client.getEntries({ content_type: "blog" });
  return {
    props: {
      blog: res.items,
    },
  };
};

export default Blog;
