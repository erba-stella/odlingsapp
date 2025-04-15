import type { Metadata } from "next";
import "./globals.css";
import { font1, font2, font3 } from "@/fonts/fonts";

export const metadata: Metadata = {
  title: "OdlingsPlanera",
  description: "En liten odlingsplaneringsapp gjord som ett skolprojekt på Lexicon frontend utbildning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
        ${font1.variable}
        ${font2.variable}
        ${font3.variable}
        `}
      >
        {children}
      </body>
    </html>
  );
}