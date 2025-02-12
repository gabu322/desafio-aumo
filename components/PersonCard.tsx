"use client";

import Image from "next/image";
import Button from "./Button";
import { usePeople } from "@/context/PeopleContext";

export function PersonCard({ className, person }: Readonly<{ className?: string; person: any }>) {
   const { addPerson } = usePeople()!;

   const handleFollow = () => {
      const newPerson = {
         ...person,
         status: "followed",
      };

      addPerson(newPerson);
   };

   return (
      <div className={`flex flex-col gap-4 ${className}`}>
         <div className="flex flex-row items-center gap-4">
            <Image
               src={person.image}
               alt="User image"
               width={80}
               height={80}
               className="rounded-full"
            />

            <div className="min-w-0">
               <h2 className="text-2xl font-semibold truncate">
                  {person.firstName} {person.lastName}
               </h2>
               <p className="truncate">
                  {person.city}, {person.country}
               </p>
            </div>
         </div>

         <div className="flex flex-row justify-between w-full items-start">
            <div className="flex flex-col gap-4 min-w-0">
               <p className="truncate">Email: {person.email}</p>
               <p className="truncate">Phone: {person.phone}</p>
            </div>

            <Button
               className="mt-auto flex-shrink-0"
               text="Follow"
               color="blue"
               onClick={handleFollow}
            />
         </div>
      </div>
   );
}
