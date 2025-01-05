import { createClient } from '@/prismicio';
import { PrismicRichText } from '@prismicio/react';
import Image from 'next/image';
import Link from 'next/link';

const client = createClient();

export default async function ArticlesPage() {
  const articlesResponse = await client.getAllByType('article', {
    orderings: [
      { field: 'document.first_publication_date', direction: 'desc' },
    ],
  });


  const articles = articlesResponse;

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">All Articles</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="border rounded-lg p-4 shadow-md flex flex-col"
          >
            <div className="relative w-full h-[200px] mb-4">
              {article.data.main_image?.url ? (
                <Image
                  src={article.data.main_image.url}
                  alt={article.data.main_image.alt || 'Article image'}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                />
              ) : (
                <div className="flex items-center justify-center bg-gray-200 h-full rounded-lg">
                  No Image Available
                </div>
              )}
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {article.data.title || 'Untitled'}
            </h3>
            <div className="text-sm text-gray-700 mb-4">
              {article.data.excerpt ? (
                <PrismicRichText field={article.data.excerpt} />
              ) : (
                <p>No excerpt available.</p>
              )}
            </div>
            <Link
              href={`articles/${article.uid}`}
              className="text-blue-500 hover:underline mt-auto"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
