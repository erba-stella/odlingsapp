import { Pacifico, Open_Sans, Shantell_Sans } from "next/font/google";

export const font_logo = Pacifico({
  variable: "--font-logo",
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const font_heading = Shantell_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const font_base = Open_Sans({
  variable: "--font-base",
  subsets: ["latin"],
});