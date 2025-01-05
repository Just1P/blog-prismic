import { createClient } from '@/prismicio';
import { PrismicRichText } from '@prismicio/react';
import Image from 'next/image';
import { ArticleType } from '../../../types/article'; // Import du type existant

type Props = {
  params: { uid: string };
};
const client = createClient();

export default async function ArticlePage({ params }: Props) {
  // Récupérer l'article en fonction de son UID
  const articleResponse = await client.getByUID('article', params.uid);

  // Cast vers le type existant
  const article = articleResponse as ArticleType;

  return (
    <main className="container mx-auto p-4">
      <article className="max-w-3xl mx-auto">
        {/* Titre */}
        <h1 className="text-4xl font-bold mb-6">{article.data.title}</h1>

        {/* Image principale */}
        {article.data.main_image?.url && (
          <div className="relative w-full h-[400px] mb-6">
            <Image
              src={article.data.main_image.url}
              alt={article.data.main_image.alt || 'Article image'}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        )}

        {/* Contenu de l'article */}
        <div className="prose prose-lg">
          <PrismicRichText field={article.data.excerpt} />
        </div>
      </article>
    </main>
  );
}
