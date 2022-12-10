import Head from 'next/head';
import client from '../libs/contentful';
import Link from 'next/link';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Entry } from 'contentful';
import { IPostFields } from 'libs/types';
import { Key } from 'react';
import { format } from 'date-fns';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Pagination } from '@mui/material';
import { useRouter } from 'next/router';

type IdProps = {
  blog: {
    map: StringConstructor;
  };
  total: number;
  id: number;
};

// cut Types in libs folder.

const MAX_ENTRY = 15;

const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i);
const Id = ({ blog, total, id }: IdProps) => {
  useEffect(() => {
    fetch('/api/revalidate');
  }, [blog]);

  const [page, setPage] = useState(id);
  const router = useRouter();
  const handleChangePage = (_: ChangeEvent<unknown>, page: number) => {
    router.push(`/${page}`);
    setPage(page);
  };

  const countPage = Math.ceil(total / MAX_ENTRY);

  return (
    <div>
      <Head>
        <title>Contentful - Dynamic routes example</title>
        <meta name="description" content="example code" />
      </Head>
      <main>
        <h2>Articles</h2>
        <ul>
          {blog.map((props: Entry<IPostFields>, index: Key) => (
            <li key={index}>
              <Link href={`/test/${props.fields.slug}`}>
                <div>
                  {format(new Date(props.fields.date), 'MMMM eeee,do yyyy: a')}:{props.fields.title}
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <ul>
          {range(1, Math.ceil(total / MAX_ENTRY)).map((id) => (
            <li key={id}>
              <Link href={`/${id}`}>{id}</Link>
            </li>
          ))}
        </ul>
        <Pagination
          sx={{
            display: 'flex',
            justifyContent: 'center',
            margin: '20px 0 40px 0',
            height: '50px',
          }}
          // onMouseEnter={() => prefetch}
          onChange={handleChangePage}
          count={countPage}
          page={page}
          showFirstButton
          showLastButton
          variant="text"
          color="standard"
          shape="rounded"
          tabIndex={0}
        />
        {/* <nav>
          <ul className="ListNum">
            <li>
              <ActiveLink href={`/docs/${1}`} activeClassName="arrowState">
                <a className="StartPage">≪</a>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href={`/docs/${id === 1 ? 1 : id - 1}`} activeClassName="arrowState">
                <a className="Rotate">
                  <div className="arrow1" />
                </a>
              </ActiveLink>
            </li>
            <div>{id === 1 ? null : '...'}</div>
            {range(
              id === 1 ? id : id === countPage ? id - 2 : id - 1,
              id === countPage ? countPage : id === 1 ? id + 2 : id + 1
            ).map((id) => (
              <li key={id}>
                <ActiveLink href={`/docs/${id}`} activeClassName="listState">
                  <a className="Pagi">{id}</a>
                </ActiveLink>
              </li>
            ))}
            <div>{id === countPage ? null : '...'}</div>
            <li>
              <ActiveLink href={`/docs/${id === countPage ? countPage : id + 1}`} activeClassName="arrowState">
                <a className="Rotate">
                  <div className="arrow2" />
                </a>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href={`/docs/${countPage}`} activeClassName="arrowState">
                <a className="EndPage">≫</a>
              </ActiveLink>
            </li>
          </ul>
        </nav> */}
      </main>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.getEntries<IPostFields>({
    content_type: 'blog',
    order: '-fields.date',
  });

  const paths = range(1, Math.ceil(data.total / MAX_ENTRY)).map((id) => `/${id}`);

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = Number(context.params?.id);

  const entries = await client.getEntries<IPostFields>({
    content_type: 'blog',
    order: '-fields.date',
    limit: MAX_ENTRY,
    skip: (id - 1) * MAX_ENTRY,
  });

  return {
    props: {
      blog: entries.items,
      total: entries.total,
      id: id,
    },
  };
};

export default Id;
