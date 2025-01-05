import React from 'react';
import Image from 'next/image';
import { PrismicRichText } from '@prismicio/react';
import Link from 'next/link';

const FeaturedArticles = ({ slice }: any) => {
  const articles = slice.primary.grouparticle;

  if (!articles || articles.length === 0) {
    return <p className="text-gray-500 text-center py-12">No featured articles available.</p>;
  }

  return (
    <section className="py-16 bg-gray-50">
      {/* Header */}
      <h1 className="text-6xl font-bold italic mb-8 text-center">Best of the week</h1>
      <div className="text-center mb-12">
        <Link
          href="/pages/articles"
          className="text-lg text-gray-600 hover:text-blue-500 transition duration-300"
        >
          See all posts →
        </Link>
      </div>

      {/* Articles Grid */}
      <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((item: any, index: number) => {
          const article = item.featured_articles;

          if (!article || !article.data) {
            return null;
          }

          return (
            <div
              key={index}
              className="relative bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {/* Image Section */}
              <div className="relative w-full h-64">
                {article.data.main_image?.url ? (
                  <Image
                    src={article.data.main_image.url}
                    alt={article.data.main_image.alt || 'Article image'}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-t-3xl hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center bg-gray-200 h-full rounded-t-3xl">
                    No Image Available
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col gap-4">
                <h3 className="text-2xl font-bold">
                  {article.data.title || 'Untitled'}
                </h3>
                <div className="text-sm text-gray-600 line-clamp-3">
                  {article.data.excerpt ? (
                    <PrismicRichText field={article.data.excerpt} />
                  ) : (
                    <p>No excerpt available.</p>
                  )}
                </div>
                <Link
                  href={`/pages/articles/${article.uid}`}
                  className="mt-auto text-blue-500 hover:text-blue-700 transition-colors duration-300 text-sm font-medium"
                >
                  Read More →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedArticles;
