"use client";

import { useEffect, useState } from "react";

import Down from "@/public/icons/down";
import { usePeople } from "@/app/context/PeopleContext";

export default function Navbar() {
   const { people } = usePeople()!;

   return (
      <nav className="bg-[#9022f3] text-white py-4 px-6 md:px-20 fixed top-0 left-0 w-full z-10 flex flex-row justify-between items-center">
         <h2 className="text-2xl">users_like.me</h2>

         {/* Followed users */}
         {people.filter((person) => person.status === "followed").length > 0 && (
            <div className="rounded-full bg-purple-500 py-1 px-3 flex flex-row items-center">
               following {people.length} users
               <Down className="w-4 h-4 ml-2" />
            </div>
         )}
      </nav>
   );
}
