import * as prismic from '@prismicio/client';

export const repositoryName = 'blog-prismic-esd'; // Remplace par ton repository

export const client = prismic.createClient(repositoryName, {
  accessToken: process.env.PRISMIC_ACCESS_TOKEN,
});
