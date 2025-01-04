import React from 'react';
import Image from 'next/image';
import { PrismicRichText } from '@prismicio/react';
import Link from 'next/link';

type FeaturedArticlesProps = {
  slice: {
    primary: {
      articles: {
        id: string;
        uid: string;
        data: {
          title: string;
          main_image: {
            url: string;
            alt: string | null;
          };
          excerpt: any;
        };
      };
    };
  };
};

const FeaturedArticles = ({ slice }: FeaturedArticlesProps) => {
  const article = slice.primary.articles;

  return (
    <section>
  {/* Conteneur parent pour affichage en ligne */}
  <div className="flex gap-6 overflow-x-auto">
    {article && article.data ? (
      <div key={article.id} className="border rounded-lg p-4 shadow-md max-w-[300px]">
        {article.data.main_image?.url && (
          <Image
          src={article.data.main_image.url}
          alt={article.data.main_image.alt || 'Article image'}
          width={300}
          height={30}
          style={{ width: '300px', height: '350px' }}
          className="rounded-lg mb-4"
        />
        )}
        <h3 className="text-xl font-semibold mb-2">
          {article.data.title}
        </h3>
        <PrismicRichText field={article.data.excerpt} />
        <Link
          href={`/article/${article.uid}`}
          className="text-blue-500 hover:underline"
        >
          Read More →
        </Link>
      </div>
    ) : (
      <p>No articles available.</p>
    )}
  </div>
</section>
  );
};

export default FeaturedArticles;
