import client from '../../libs/contentful';
import { GetStaticPaths, GetStaticProps } from 'next';
import { EntryCollection } from 'contentful';
import { IPostFields } from '../../libs/types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import Head from 'next/head';
import * as TYPES from '@contentful/rich-text-types';
import { Options } from '@contentful/rich-text-react-renderer';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type SlugProps = {
  blog: {
    fields: {
      slug: string;
      date: string;
      title: string;
      description: string;
      body: Document;
    };
  };
};

const Slug = ({ blog }: SlugProps) => {
  const options: Options = {
    renderNode: {
      [TYPES.BLOCKS.EMBEDDED_ASSET]: (node: TYPES.Node) => {
        const src = 'https:' + node.data.target.fields.file.url;
        const height = node.data.target.fields.file.details.height;
        const width = node.data.target.fields.file.details.width;
        return <img src={src} width={width} height={height} />;
      },
    },

    renderMark: {
      [TYPES.MARKS.CODE]: (text) => {
        return (
          <SyntaxHighlighter
            lineProps={{
              style: { whiteSpace: 'pre-wrap' },
            }}
            wrapLines={true}
            language="jsx"
            style={vscDarkPlus}
            showLineNumbers
          >
            {text}
          </SyntaxHighlighter>
        );
      },
    },
  };
  return (
    <div>
      <Head>
        <title>{blog.fields.title} - sou</title>
        <meta name="description" content={blog.fields.description} />
      </Head>
      <main className="textLeft margin50p">
        <h1>{blog.fields.title}</h1>
        <div>{documentToReactComponents(blog.fields.body, options)}</div>
      </main>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { items }: EntryCollection<IPostFields> = await client.getEntries({
    content_type: 'blog',
    limit: 1000,
  });
  const paths = items.map((item) => ({
    params: { slug: item.fields.slug },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug;

  const entries = await client.getEntries<IPostFields>({
    content_type: 'blog',
    'fields.slug': slug,
  });

  return {
    props: {
      blog: entries.items[0],
    },
  };
};

export default Slug;
