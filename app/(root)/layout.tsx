"use client";

import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
   return (
      <main>
         <div className="top-0 h-[72px]" />

         <main className="md:w-3/4 mx-4 md:mx-auto md:mt-6">
            <Navbar />

            {children}
         </main>
      </main>
   );
}
