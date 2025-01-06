import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "../slices";

const client = createClient();

export default async function ArticlesPage() {
  const page = await client.getSingle("landing_page", {
    fetchLinks: ["article.title", "article.main_image", "article.excerpt"],
  });

  const aboutSection = page.data.slices.find(
    (slice: any) => slice.slice_type === "about_section"
  );

  const featuredArticles = page.data.slices.find(
    (slice: any) => slice.slice_type === "featured_articles"
  );

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {aboutSection && (
        <section>
          <SliceZone slices={[aboutSection]} components={components} />
        </section>
      )}

      {featuredArticles && (
        <section className=" bg-white">
          <SliceZone slices={[featuredArticles]} components={components} />
        </section>
      )}
    </main>
  );
}
