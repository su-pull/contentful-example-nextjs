import { GetStaticProps } from "next";
import { createClient } from "contentful";
import Date from "../components/Sys/date";
import Link from "next/link";

type Map = {
  blog: {
    map: NumberConstructor;
  };
};

type Content = {
  id: string;
  fields: {
    title: string;
    date: string;
  };
};

const Blog = ({ blog }: Map) => {
  return (
    <div>
      {blog.map((props: Content) => (
        <dl key={props.id}>
          <dt>
            <Date dateString={props.fields.date} />
          </dt>
          <Link href={`/blog/${props.id}`}>
            <a>{props.fields.title}</a>
          </Link>
        </dl>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: "blog" });
  return {
    props: {
      blog: res.items,
    },
  };
};

export default Blog;
