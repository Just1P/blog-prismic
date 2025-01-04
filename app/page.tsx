import { client } from '../prismicio';
import { SliceZone } from '@prismicio/react';
import { components } from '../slices'; // Import des composants de Slice
import { PrismicRichText } from '@prismicio/react';
import Image from 'next/image';

export default async function Page() {
  const page = await client.getSingle('landing_page', {
    fetchLinks: [
      'article.title',
      'article.main_image',
      'article.excerpt',
    ],
  });

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{page.data.title}</h1>
      <div className="text-lg mb-4">
        <PrismicRichText field={page.data.description} />
      </div>

      <div className="rounded-lg shadow-lg mb-4">
        {page.data.main_image?.url && (
          <Image
            src={page.data.main_image.url}
            alt={page.data.main_image.alt || 'Main image'}
            width={800}
            height={500}
            layout="responsive"
          />
        )}
      </div>

      {/* Conteneur parent pour alignement strictement horizontal */}
      <h2 className="text-2xl font-bold mb-4">Featured Articles</h2>
      <div className="flex flex-nowrap gap-6 overflow-x-auto">
        <SliceZone slices={page.data.slices} components={components} />
      </div>
    </main>
  );
}
