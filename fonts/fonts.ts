import {
 Pacifico,
 Open_Sans,
 Nunito
} from "next/font/google";

export const font1 = Pacifico({
  variable: "--font-1",
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const font2 = Open_Sans({
  variable: "--font-2",
  subsets: ["latin"],
});

export const font3 = Nunito({
  variable: "--font-3",
  subsets: ["latin"],
}
)
