import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "./provider";
import { UserContextProvider } from "@/lib/useAuthClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter X",
  description: "Twitter X is a Twitter clone built with Next.js",
  icons: { icon: "/images/x.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContextProvider>
          <Provider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </Provider>
        </UserContextProvider>
      </body>
    </html>
  );
}
