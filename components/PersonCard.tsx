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

            <div>
               <h2 className="text-2xl font-semibold">
                  {person.firstName} {person.lastName}
               </h2>
               <p>
                  {person.city}, {person.country}
               </p>
            </div>
         </div>

         <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col gap-4">
               <p>Email: {person.email}</p>

               <p>Phone: {person.phone}</p>
            </div>

            <Button
               className="mt-auto"
               text="Follow"
               color="blue"
               onClick={handleFollow}
            />
         </div>
      </div>
   );
}
