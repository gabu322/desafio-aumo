"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import Button from "@/components/Button";
import Down from "@/public/icons/down";
import { usePeople } from "../context/PeopleContext";
import { PersonCard } from "@/components/PersonCard";

export default function Home() {
   const [currentUser, setCurrentUser] = useState<any>();
   const [personalInfoOpen, setPersonalInfoOpen] = useState<boolean>(false);
   const [contactInfoOpen, setContactInfoOpen] = useState<boolean>(false);
   const [following, setFollowing] = useState<boolean>(false);

   const { addPerson } = usePeople()!;
   const { people } = usePeople()!;

   const fetchRandomUser = () => {
      axios.get("https://randomuser.me/api/").then((res) => {
         setCurrentUser({ seed: res.data.info.seed, ...res.data.results[0] });
         console.log({ seed: res.data.info.seed, ...res.data.results[0] });
      });
   };

   useEffect(() => {
      fetchRandomUser();
   }, []);

   const handleToggleFollow = () => {
      setFollowing(!following);

      const newPerson = {
         seed: currentUser?.seed,
         firstName: currentUser?.name.first,
         lastName: currentUser?.name.last,
         email: currentUser?.email,
         phone: currentUser?.phone,
         city: currentUser?.location.city,
         country: currentUser?.location.country,
         image: currentUser?.picture.large,
         status: following ? "passed" : "followed",
      };

      addPerson(newPerson);
   };

   const handleNextUser = () => {
      if (!following) {
         const newPerson = {
            seed: currentUser?.seed,
            firstName: currentUser?.name.first,
            lastName: currentUser?.name.last,
            email: currentUser?.email,
            phone: currentUser?.phone,
            city: currentUser?.location.city,
            country: currentUser?.location.country,
            image: currentUser?.picture.large,
            status: "passed",
         };

         addPerson(newPerson);
      }

      setFollowing(false);

      fetchRandomUser();
   };

   return (
      <div className="flex flex-col gap-4">
         <h1 className="text-3xl md:text-4xl font-semibold">Find new users like you</h1>

         {/* Current user info */}
         <div className="card relative overflow-hidden h-96">
            <div className="relative w-full h-1/2">
               {currentUser && (
                  <Image
                     src={currentUser?.picture.large}
                     alt="Background image"
                     fill
                     style={{ objectFit: "cover" }}
                     className="filter blur-sm"
                  />
               )}
            </div>

            {currentUser && (
               <Image
                  src={currentUser?.picture.large}
                  alt="Front image"
                  width={200}
                  height={200}
                  className="absolute rounded-full border-4 border-white object-cover 
                     left-1/2 top-10 -translate-x-1/2 shadow-md"
               />
            )}

            <div className="px-4 pt-12 pb-4 flex flex-col w-full items-center h-1/2">
               <h3 className="font-bold text-2xl">
                  {currentUser?.name.first} {currentUser?.name.last}
               </h3>

               <h4 className=" text-xl">
                  {currentUser?.location.city}, {currentUser?.location.country}
               </h4>

               <div className="flex flex-row gap-4 w-full mt-auto">
                  <Button
                     text={following ? "Click to unfollow" : "Follow"}
                     className="flex-1"
                     color={following ? "red" : "blue"}
                     onClick={handleToggleFollow}
                  />
                  <Button
                     text="Try next user"
                     bgColor="bg-slate-100"
                     hoverColor="hover:bg-slate-200"
                     textColor="black"
                     className="flex-1"
                     onClick={handleNextUser}
                  />
               </div>
            </div>
         </div>

         {/* Personal and contact info, needed for responsivity */}
         <div className="flex flex-col md:flex-row md:items-start gap-4">
            {/* Pesonal info */}
            <div className="card flex-1 flex flex-col gap-4 p-4">
               <h3 className="font-bold text-2xl">Personal Info</h3>

               <div className="flex flex-col gap-2 pl-2">
                  <h4 className="text-lg">Born at: {currentUser?.nat}</h4>

                  <h4 className="text-lg">Age: {currentUser?.dob.age}</h4>

                  <div className={`flex flex-col gap-2 transition-all duration-500 overflow-hidden ${personalInfoOpen ? "max-h-96 " : "max-h-0 opacity-"}`}>
                     <h4 className="text-lg">Gender: {currentUser?.gender}</h4>
                     <h4 className="text-lg">Title: {currentUser?.name.title}</h4>
                  </div>
               </div>

               <hr className="" />

               <Button
                  bgColor="transparent"
                  hoverColor="hover:bg-gray-200"
                  textColor="text-blue-500"
                  rounded
                  noShadow
                  textSize="text-lg"
                  onClick={() => setPersonalInfoOpen(!personalInfoOpen)}
               >
                  See more info{" "}
                  <Down
                     className={`w-4 h-4 ml-2 transition-transform duration-300 ${personalInfoOpen ? "rotate-180" : ""}`}
                     color="blue"
                  />
               </Button>
            </div>

            {/* Contact info */}
            <div className="card flex-1 flex flex-col gap-4 p-4 min-h-0">
               <h3 className="font-bold text-2xl">Contact Info</h3>

               <div className="flex flex-col gap-2 pl-2">
                  <h4 className="text-lg">Email: {currentUser?.email}</h4>

                  <h4 className="text-lg">Phone: {currentUser?.phone}</h4>

                  <div className={`flex flex-col gap-2 transition-all duration-500 overflow-hidden ${contactInfoOpen ? "max-h-96 " : "max-h-0 opacity-"}`}>
                     <h4 className="text-lg">Cell: {currentUser?.cell}</h4>
                     <h4 className="text-lg">Username: {currentUser?.login.username}</h4>
                  </div>
               </div>

               <hr className="" />

               <Button
                  bgColor="transparent"
                  hoverColor="hover:bg-gray-200"
                  textColor="text-blue-500"
                  rounded
                  noShadow
                  textSize="text-lg"
                  onClick={() => setContactInfoOpen(!contactInfoOpen)}
               >
                  See more info{" "}
                  <Down
                     className={`w-4 h-4 ml-2 transition-transform duration-300 ${contactInfoOpen ? "rotate-180" : ""}`}
                     color="blue"
                  />
               </Button>
            </div>
         </div>

         {/* Suggested users */}
         {people.filter((person) => person.status === "passed").length > 0 && <h2 className="text-2xl font-semibold">Suggested 4you</h2>}

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {people
               .filter((person) => person.status === "passed")
               .filter((person) => person.seed !== currentUser?.seed)
               .map((person) => (
                  <PersonCard
                     key={person.seed}
                     person={person}
                     className="card p-4"
                  />
               ))}
         </div>
      </div>
   );
}
