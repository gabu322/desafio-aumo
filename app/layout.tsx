import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { PeopleProvider } from "./context/PeopleContext";

const quicksand = Quicksand({
   subsets: ["latin"],
   weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
   title: "users_like.me",
   description: "Find users like you to",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
   return (
      <html lang="en">
         <body className={`${quicksand.className} antialiased bg-slate-100`}>
            <PeopleProvider>{children}</PeopleProvider>
         </body>
      </html>
   );
}
