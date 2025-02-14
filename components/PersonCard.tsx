"use client";

import Image from "next/image";
import Button from "./Button";
import { usePeople } from "@/context/PeopleContext";

export function PersonCard({ className, person, index }: Readonly<{ className?: string; person: any; index: number }>) {
   const { addPerson, setCurrentIndex } = usePeople()!;

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

         <div className="flex flex-col gap-1 w-full items-start">
            <p className="truncate">Email: {person.email}</p>

            <div className="flex flex-row w-full justify-between">
               <div className="flex flex-col justify-between">
                  <p className="truncate">Phone: {person.phone}</p>
                  <p className="truncate">Gender: {person.gender}</p>
               </div>

               <div className="flex flex-row gap-4">
                  <Button
                     className="mt-auto flex-shrink-0"
                     text="Look up"
                     bgColor="bg-slate-100"
                     hoverColor="hover:bg-slate-200"
                     textColor="text-black"
                     onClick={() => setCurrentIndex(index)}
                  />

                  <Button
                     className="mt-auto flex-shrink-0"
                     text="Follow"
                     color="blue"
                     onClick={handleFollow}
                  />
               </div>
            </div>
         </div>
      </div>
   );
}
