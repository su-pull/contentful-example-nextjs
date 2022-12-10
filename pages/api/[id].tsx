import client from "libs/contentful";
import { IPostFields } from "libs/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async (
  { query: { id } }: NextApiRequest,
  res: NextApiResponse
) => {
  const entries = await client.getEntries<IPostFields>({
    content_type: "blog",
    order: "-fields.date",
    limit: 15,
    skip: (Number(id) - 1) * 15,
  });
  res.statusCode = 200;
  res.json(entries.items);
};
