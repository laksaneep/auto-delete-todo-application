"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Users = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: "male" | "female";
  hairColor: string;
  postAddress: string;
  department: string;
};

export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "id",
    header: "No.",
  },
  {
    accessorKey: "firstName",
    header: "First name",
  },
  {
    accessorKey: "lastName",
    header: "Last name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "hairColor",
    header: "Hair color",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "postAddress",
    header: "PostalCode",
  },
];
