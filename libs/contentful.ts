import { createClient } from "contentful";

import { Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";

export interface IPostFields {
  title: string;
  slug: string;
  date: string;
  content: Document;
}

export interface IPost extends Entry<IPostFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "blog";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export const buildClient = () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || "",
    accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN || "",
  });

  return client;
};

// export default client;
