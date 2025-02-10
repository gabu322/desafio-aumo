"use client";

import Button from "@/components/Button";
import { useState } from "react";

export default function Home() {
   const [suggestedUsers, setSuggestedUsers] = useState([1]);

   return (
      <div className="flex flex-col gap-4">
         {/* Current user info */}
         <h1 className="text-4xl font-semibold">Find new users like you</h1>

         <div className="card">Person</div>

         <div className="flex flex-col md:flex-row gap-4">
            <div className="card flex-1">Personal Info</div>

            <div className="card flex-1">Contact info</div>
         </div>

         {/* Suggested users */}
         {suggestedUsers.length > 0 && <h2 className="text-2xl font-semibold">Suggested 4you</h2>}

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {suggestedUsers.map((user) => (
               <UserCard
                  key={user}
                  className="card"
               />
            ))}
         </div>
      </div>
   );
}

export function UserCard({ className }: Readonly<{ className?: string }>) {
   return (
      <div className={`flex flex-col gap-4 ${className}`}>
         <div className="flex flex-row items-center gap-4">
            <img
               src="https://randomuser.me/api/portraits"
               alt="User profile picture"
               className="h-16 w-16 rounded-full"
            />

            <div>
               <h2 className="text-2xl font-semibold">Name</h2>
               <p className="text-lg">Username</p>
            </div>
         </div>

         <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col gap-4">
               <p>Location</p>

               <p>Age</p>
            </div>

            <Button
               className="mt-auto"
               text="Follow"
               color="blue"
            />
         </div>
      </div>
   );
}
