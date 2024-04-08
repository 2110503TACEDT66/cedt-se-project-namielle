import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopMenu from "@/components/TopMenu";
import BottomMenu from "@/components/BottomMenu";
import ReduxProvider from "./redux/ReduxProvider";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "John Book",
  description: "Hotel Booking Services",
  icons: {
    icon: '/icon.png'
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const nextAuthSession = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <NextAuthProvider session={nextAuthSession}>
            <TopMenu />
            {children}
            <BottomMenu />
          </NextAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
