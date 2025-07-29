import type { Metadata } from "next";
import "./globals.css";
import { font_logo, font_heading, font_base } from "@/fonts/fonts";

export const metadata: Metadata = {
  title: "SåPlanera",
  description: "En liten odlingsplaneringsapp gjord som ett skolprojekt på Lexicon frontend utbildning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body
        className={`
        ${font_logo.variable}
        ${font_heading.variable}
        ${font_base.variable}
        `}
      >
        {children}
      </body>
    </html>
  );
}