import { RichTextField } from '@prismicio/client';

export interface ArticleType {
    id: string;
    uid: string;
    data: {
      title: string | null; // Autorise null
      main_image: {
        url: string | null | undefined; // Accepte null ou undefined
        alt: string | null;
      };
    excerpt: RichTextField; // Utilise le bon type pour les RichText
  };
}
