// import { EntryCollection } from 'contentful';
import { Document } from '@contentful/rich-text-types';
export interface IPostFields {
  title: string;
  slug: string;
  date: string;
  description: string;
  body: Document;
}
