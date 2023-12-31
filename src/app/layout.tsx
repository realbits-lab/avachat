import type { Metadata } from "next";
//import { Inter } from "next/font/google";
import { Providers } from "@/src/app/providers";
import "./globals.css";
import "./app.sass";

//const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "3D Avatar Chat",
  description: "Avatar Chat Demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
