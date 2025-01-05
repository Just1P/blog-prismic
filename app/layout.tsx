import { Playfair_Display } from "@next/font/google";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import Menu from "./components/menu/menu";
import "./globals.css";

// Importation et configuration de la police
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Ajoute les poids nécessaires
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={playfair.className}>
      <body>
        <Menu />
        {children}
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
