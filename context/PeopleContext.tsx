"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Person } from "@/context/Person";

type PeopleContextType = {
   people: Person[];
   currentId: Person | null;
   addPerson: (person: Person) => void;
   fetchRandomUser: () => void;
   setCurrentId: (user: Person | null) => void;
};
const PeopleContext = createContext<PeopleContextType | undefined>(undefined);

export function PeopleProvider({ children }: { children: React.ReactNode }) {
   const [people, setPeople] = useState<Person[]>([]);
   const [currentId, setCurrentId] = useState<Person | null>(null);

   useEffect(() => {
      const storedPeople = localStorage.getItem("people");
      if (storedPeople) setPeople(JSON.parse(storedPeople));
   }, []);

   useEffect(() => {
      localStorage.setItem("people", JSON.stringify(people));
   }, [people]);

   const addPerson = (person: Person) => {
      const existingIndex = people.findIndex((p) => p.id === person.id);

      // Check if the person already exists
      if (existingIndex !== -1) {
         const updatedPeople = [...people];
         updatedPeople[existingIndex] = person;
         setPeople(updatedPeople);
         return;
      }

      // If it doesn't, add them
      setPeople((prev) => [...prev, person]);
   };

   const fetchRandomUser = async () => {
      const newUser = await axios.get("https://randomuser.me/api/");
      const userData = newUser.data.results[0];

      const user = {
         id: newUser.data.info.seed,
         firstName: userData.name.first,
         lastName: userData.name.last,
         title: userData.name.title,
         email: userData.email,
         phone: userData.phone,
         cell: userData.cell,
         city: userData.location.city,
         country: userData.location.country,
         image: userData.picture.large,
         nationality: userData.nat,
         age: userData.dob.age,
         gender: userData.gender,
         status: "pending",
      };

      addPerson(user);
      setCurrentId(user.id);
   };

   return <PeopleContext.Provider value={{ people, currentId, addPerson, fetchRandomUser, setCurrentId }}>{children}</PeopleContext.Provider>;
}

export function usePeople() {
   const context = useContext(PeopleContext);

   return context;
}
