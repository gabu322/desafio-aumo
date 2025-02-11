"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Person = {
   seed: string;
   firstName: string;
   lastName: string;
   city: string;
   country: string;
   image: string;
   status: string;
};

type PeopleContextType = {
   people: Person[];
   addPerson: (person: Person) => void;
};

const PeopleContext = createContext<PeopleContextType | undefined>(undefined);

export function PeopleProvider({ children }: { children: React.ReactNode }) {
   const [people, setPeople] = useState<Person[]>([]);

   useEffect(() => {
      const storedPeople = localStorage.getItem("people");
      console.log(storedPeople);
      if (storedPeople) setPeople(JSON.parse(storedPeople));
   }, []);

   useEffect(() => {
      localStorage.setItem("people", JSON.stringify(people));
   }, [people]);

   const addPerson = (person: Person) => {
      setPeople((prev) => {
         const existingIndex = prev.findIndex((p) => p.seed === person.seed);

         // Check if the person already exists
         if (existingIndex !== -1) {
            const updatedPeople = [...prev];
            updatedPeople[existingIndex] = person;
            return updatedPeople;
         }

         // If it doesn't, add them
         return [...prev, person];
      });
   };
   return <PeopleContext.Provider value={{ people, addPerson }}>{children}</PeopleContext.Provider>;
}

export function usePeople() {
   const context = useContext(PeopleContext);

   return context;
}
