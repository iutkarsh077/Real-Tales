import { Inter } from "next/font/google";
import "./globals.css";
import NextJsProvider from "@/authProvider/authNextjs";
import GlobalContextProvider from "@/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RealTales",
  description: "Write your thoughts Here",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-800 text-white`}>
        <NextJsProvider>
        <GlobalContextProvider>
          {children}
        </GlobalContextProvider>
        </NextJsProvider>
  </body>
    </html>
  );
}
