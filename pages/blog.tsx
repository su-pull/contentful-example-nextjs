import { GetStaticProps } from "next";
import Date from "../components/Sys/date";
import Link from "next/link";
import { buildClient, IPostFields } from "../libs/contentful";
import { Entry, EntryCollection } from "contentful";

type Map = {
  blog: {
    map: StringConstructor;
  };
};

// type Content = {
//   sys: {
//     slug: string;
//   };
//   fields: {
//     slug: string;
//     title: string;
//     date: string;
//   };
// };

const Blog: React.FC<Map> = ({ blog }) => {
  return (
    <div>
      {blog.map((props: Entry<IPostFields>) => (
        <dl key={props.sys.id}>
          <dt>
            <Date dateString={props.fields.date} />
          </dt>
          <Link href={`/blog/${props.fields.slug}`}>
            <a>{props.fields.title}</a>
          </Link>
        </dl>
      ))}
    </div>
  );
};

const client = buildClient();

export const getStaticProps: GetStaticProps = async () => {
  const data: EntryCollection<IPostFields> = await client.getEntries({
    content_type: "blog",
    limit: 500,
  });
  return {
    props: {
      blog: data.items,
    },
  };
};

export default Blog;
