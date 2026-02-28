import { client } from "./client";

//query to get all projects from sanity, ordered by orderRank
export const getProjects = async () => {
  const data = await client.fetch(
    `*[_type == "projects"] | order(orderRank) {
      title,
      slug,
      description,
      media,
      preview,
      type,
      year
    }`,
    {},
    { 
      // Revalidate cache every 60 seconds
      next: { revalidate: 60, tags: ['projects'] }
    }
  );
  return data;
};

export const getInfo = async () => {
  const data = await client.fetch(
    `*[_type == "info"][0] {
      title,
      shareimage,
      contactEmail,
      bio
    }`,
    {},
    { 
      // Revalidate cache every 60 seconds
      next: { revalidate: 60, tags: ['info'] }
    }
  );
  return data;
}