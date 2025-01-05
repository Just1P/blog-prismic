import { createClient } from '@/prismicio';
import { PrismicRichText } from '@prismicio/react';
import Image from 'next/image';
import { ArticleType } from '../../../types/article'; // Import du type existant

type Props = {
  params: { uid: string };
};

const client = createClient();

export default async function ArticlePage({ params }: Props) {
  const articleResponse = await client.getByUID('article', params.uid);
  const article = articleResponse as ArticleType;

  return (
    <main className="bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen">
      <article className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        {/* Image principale */}
        {article.data.main_image?.url && (
          <div className="relative w-full h-[400px]">
            <Image
              src={article.data.main_image.url}
              alt={article.data.main_image.alt || 'Article image'}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-t-xl hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>
        )}

        <div className="p-6 lg:p-10">
          {/* Titre */}
          <h1 className="text-4xl font-bold mb-4 text-gray-900 leading-tight">
            {article.data.title}
          </h1>

          {/* Date */}
          <p className="text-sm text-purple-500 mb-6">
            Published on {new Date(article.first_publication_date).toLocaleDateString()}
          </p>

          {/* Contenu de l'article */}
          <div className="prose prose-lg prose-purple max-w-none">
            <PrismicRichText field={article.data.excerpt} />
          </div>
        </div>
      </article>
    </main>
  );
}
