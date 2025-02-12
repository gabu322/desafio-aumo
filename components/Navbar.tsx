"use client";

import { useState } from "react";

import Down from "@/public/icons/down";
import { usePeople } from "@/context/PeopleContext";
import Image from "next/image";
import Button from "./Button";

export default function Navbar() {
   const [open, setOpen] = useState<boolean>(false);
   const { people } = usePeople()!;
   const { addPerson } = usePeople()!;

   const handleUnfollow = (person: any) => {
      const newPerson = {
         ...person,
         status: "passed",
      };

      addPerson(newPerson);
   };

   return (
      <nav className="bg-[#9022f3] text-white py-4 px-4 md:px-20 fixed top-0 left-0 w-full z-10 flex flex-row justify-between items-center">
         <h2 className="text-2xl -z-20">users_like.me</h2>

         {/* Followed users */}
         {people.filter((person) => person.status === "followed").length > 0 && (
            <div className="rounded-full bg-purple-500 relative">
               <p
                  className="py-1 px-3 flex flex-row items-center cursor-pointer"
                  onClick={() => setOpen((prev) => !prev)}
               >
                  following {people.filter((person) => person.status === "followed").length} users
                  <Down className={`w-4 h-4 ml-2  transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
               </p>

               {/* Dropdown */}
               <div className={`absolute -z-10 top-0 right-0 bg-white p-4 rounded-2xl shadow-lg w-96 text-black flex flex-col gap-2 transition-all duration-300 ease-in-out transform origin-top-right ${open ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
                  <p className="font-bold text-xl">Followed users:</p>
                  {people
                     .filter((person) => person.status === "followed")
                     .map((person) => (
                        <div
                           key={person.seed}
                           className="flex flex-row items-center gap-4"
                        >
                           <Image
                              src={person.image}
                              alt="User image"
                              width={60}
                              height={60}
                              className="rounded-full"
                           />

                           <div className="flex flex-row justify-between w-full">
                              <div className="flex flex-col gap-1 w-[180px]">
                                 <h3 className="text-lg font-semibold truncate">
                                    {person.firstName} {person.lastName}
                                 </h3>
                                 <p className="truncate">
                                    {person.city}, {person.country}
                                 </p>
                              </div>

                              <Button
                                 className="mt-2"
                                 text="Unfollow"
                                 color="red"
                                 onClick={() => handleUnfollow(person)}
                              />
                           </div>
                        </div>
                     ))}
               </div>
            </div>
         )}
      </nav>
   );
}
