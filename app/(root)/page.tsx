"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import Button from "@/components/Button";
import Down from "@/public/icons/down";
import { usePeople } from "../../context/PeopleContext";
import { PersonCard } from "@/components/PersonCard";

export default function Home() {
   const [personalInfoOpen, setPersonalInfoOpen] = useState<boolean>(false);
   const [contactInfoOpen, setContactInfoOpen] = useState<boolean>(false);
   const { addPerson, fetchRandomUser, currentIndex, people, setCurrentIndex } = usePeople()!;

   useEffect(() => {
      addPerson({
         id: "me",
         firstName: "Gabriel",
         lastName: "Biancardi",
         email: "gabrieldallorto@hotmail.com",
         phone: "(27) 995313131",
         city: "Vitória",
         country: "Brazil",
         image: "https://randomuser.me/api/portraits/men/1.jpg",
         title: "Mr",
         cell: "(27) 995313131",
         nationality: "BR",
         age: 21,
         gender: "male",
         status: "pending",
      });
      setCurrentIndex(0);
   }, []);

   const handleToggleFollow = () => {
      console.log(people[currentIndex]?.status);
      const newPerson = {
         ...people[currentIndex],
         status: people[currentIndex]?.status === "followed" ? "pending" : "followed",
      };

      addPerson(newPerson);
   };

   const handleNextUser = () => {
      if (people[currentIndex]?.status === "pending") {
         const newPerson = {
            ...people[currentIndex],
            status: "passed",
         };

         addPerson(newPerson);
      }

      if (people[currentIndex]?.status !== "pending") {
         fetchRandomUser();
      }
   };

   return (
      <div className="flex flex-col gap-4">
         <h1 className="text-3xl md:text-4xl font-semibold">Find new users like you</h1>

         {/* Current user info */}
         <div className="card relative overflow-hidden h-96">
            <div className="relative w-full h-1/2">
               <Image
                  src={people[currentIndex]?.image || "https://randomuser.me/api/portraits/men/1.jpg"}
                  alt="Background image"
                  fill
                  style={{ objectFit: "cover" }}
                  className="filter blur-sm"
               />
            </div>

            <Image
               src={people[currentIndex]?.image || "https://randomuser.me/api/portraits/men/1.jpg"}
               alt="Front image"
               width={200}
               height={200}
               className="absolute rounded-full border-4 border-white object-cover left-1/2 top-10 -translate-x-1/2 shadow-md"
            />

            <div className="px-4 pt-12 pb-4 flex flex-col w-full items-center h-1/2">
               <h3 className="font-bold text-2xl">
                  {people[currentIndex]?.firstName} {people[currentIndex]?.lastName}
               </h3>

               <h4 className=" text-xl">
                  {people[currentIndex]?.city}, {people[currentIndex]?.country}
               </h4>

               <div className="flex flex-row gap-4 w-full mt-auto">
                  <Button
                     text={people[currentIndex]?.status === "followed" ? "Click to unfollow" : "Follow"}
                     className="flex-1"
                     color={people[currentIndex]?.status === "followed" ? "red" : "blue"}
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
                  <h4 className="text-lg">Born at: {people[currentIndex]?.nationality}</h4>

                  <h4 className="text-lg">Age: {people[currentIndex]?.age}</h4>

                  <div className={`flex flex-col gap-2 transition-all duration-500 overflow-hidden ${personalInfoOpen ? "max-h-96 " : "max-h-0 opacity-"}`}>
                     <h4 className="text-lg">Gender: {people[currentIndex]?.gender}</h4>
                     <h4 className="text-lg">Title: {people[currentIndex]?.title}</h4>
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
                  <h4 className="text-lg">Email: {people[currentIndex]?.email}</h4>

                  <h4 className="text-lg">Phone: {people[currentIndex]?.phone}</h4>

                  <div className={`flex flex-col gap-2 transition-all duration-500 overflow-hidden ${contactInfoOpen ? "max-h-96 " : "max-h-0 opacity-"}`}>
                     <h4 className="text-lg">Cell: {people[currentIndex]?.cell}</h4>
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
               .map((person, index) => (
                  <PersonCard
                     key={person.id}
                     person={person}
                     index={people.findIndex((p) => p.id === person.id)}
                     className="card p-4"
                  />
               ))}
         </div>
      </div>
   );
}
