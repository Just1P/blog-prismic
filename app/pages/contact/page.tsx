import { SliceZone } from "@prismicio/react";
import { createClient} from "@/prismicio"; // Vérifie bien ton chemin vers la configuration Prismic
import { components } from "@/slices";

const client = createClient();

export default async function ContactPage() {
  const page = await client.getSingle("contact"); 

  return (
    <main className="container mx-auto p-8">
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  );
}
