import { Asset, Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";

export interface ICategoryFields {
  /** Name */
  name?: string | undefined;
}

/** 記事カテゴリー */

export interface ICategory extends Entry<ICategoryFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "category";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IPostFields {
  /** Title */
  title?: string | undefined;

  /** Content */
  content?: string | undefined;

  /** Category */
  category?: ICategory[] | undefined;

  slug?: string | undefined;
}

/** 記事 */

export interface IPost extends Entry<IPostFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "post";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export type CONTENT_TYPE = "category" | "post";

export type LOCALE_CODE = "en-US";

export type CONTENTFUL_DEFAULT_LOCALE_CODE = "en-US";
