import * as prismic from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";

export const repositoryName = "blog-prismic-esd"; 

export function createClient(config: prismic.ClientConfig = {}) {
  const client = prismic.createClient(repositoryName, config);
  enableAutoPreviews({ client });

  return client;
}
