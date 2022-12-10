// import { EntryCollection } from 'contentful';
import { Document } from '@contentful/rich-text-types';
export interface IPostFields {
  map: StringConstructor;

  title: string;
  slug: string;
  date: string;
  description: string;
  body: Document;
  fields: {
    slug: string;
    date: string;
    title: string;
    description: string;
    body: Document;
  };
}
