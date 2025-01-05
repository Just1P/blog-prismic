import { createClient } from '@/prismicio';
import { SliceZone } from '@prismicio/react';
import { components } from '../slices';
import Link from 'next/link';

const client = createClient();

export default async function ArticlesPage() {
  // Récupérer les données
  const page = await client.getSingle('landing_page', {
    fetchLinks: [
      'article.title',
      'article.main_image',
      'article.excerpt',
    ],
  });

  // Filtrer les slices
  const aboutSection = page.data.slices.find(
    (slice: any) => slice.slice_type === 'about_section'
  );

  const featuredArticles = page.data.slices.find(
    (slice: any) => slice.slice_type === 'featured_articles'
  );

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* About Section */}
      {aboutSection && (
        <section>
          <SliceZone slices={[aboutSection]} components={components} />
        </section>
      )}

      {/* Featured Articles */}
      {featuredArticles && (
        <section className=" bg-white">
          <SliceZone slices={[featuredArticles]} components={components} />
        </section>
      )}

      
    </main>
  );
}
