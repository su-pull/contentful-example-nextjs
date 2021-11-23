const contentful = require("contentful");

const config = {
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
};

export const createClient = () => {
  return contentful.createClient(config);
};
