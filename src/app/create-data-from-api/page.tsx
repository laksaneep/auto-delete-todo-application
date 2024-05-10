import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { Users, columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";

async function getUsersData() {
  const res = await fetch("https://dummyjson.com/users");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  let results: Users[] = [];

  res.json().then((data) => {
    // const dummyObj = {};
    // const tmp = { ...dummyObj };
    // let minAge = 1000;
    // let maxAge = 0;
    // const tmpResult = data.users.reduce((prev, user) => {
    //   //---------- FIXME: ------------------

    //   let ageList = [];
    //   let hairColorList = [];
    //   let maleCnt = 0;
    //   let femaleCnt = 0;
    //   let hair = null;
    //   // -------------------------
    //   const id = user.id;
    //   const department = user.company.department;
    //   const firstName = user.firstName;
    //   const lastName = user.lastName;
    //   const age = user.age;
    //   const gender = user.gender;
    //   const postAddress = user.address.postalCode;
    //   const hairColor = user.hair.color;

    //   ageList.push(age);
    //   hairColorList.push(hairColor);

    //   const address = { ...dummyObj };
    //   address[`${firstName}${lastName}`] = postAddress;

    //   console.log(" ------- prev -------");
    //   console.log(prev[department]);

    //   tmp[department] = {
    //     male:
    //       gender === "male"
    //         ? prev[department]
    //           ? prev[department].male + 1
    //           : 1
    //         : prev[department].male,
    //     female: gender === "female" ? 1 : 0,
    //     // ageRange: age > prev.ageRange ?  ,
    //     hairColor: hairColorList,
    //     addressUser: address,
    //   };

    //   return tmp;

    //   // const objResult = {
    //   //   id,
    //   //   firstName,
    //   //   lastName,
    //   //   age,
    //   //   gender,
    //   //   hairColor,
    //   //   postAddress,
    //   //   department,
    //   // };

    //   // console.log("---------------------");
    //   // console.log(tmp);

    //   // return [...results, objResult];
    // }, initialData);
    data.users.map((user) => {
      const id = user.id;
      const department = user.company.department;
      const firstName = user.firstName;
      const lastName = user.lastName;
      const age = user.age;
      const gender = user.gender;
      const postAddress = user.address.postalCode;
      const hairColor = user.hair.color;

      const objResult = {
        id,
        firstName,
        lastName,
        age,
        gender,
        hairColor,
        postAddress,
        department,
      };

      results.push(objResult);
    });
  });

  return results;
}

const CreateDataFromAPI = async () => {
  const data = await getUsersData();

  return (
    <div className="max-w-screen-md my-20 mx-auto flex flex-col gap-8 justify-center items-center">
      <h1 className="text-center text-3xl"> Create data from API </h1>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
      {/* <CodeView>{JSON.parse(data)}</CodeView> */}

      <Button variant="link">
        <Link href="/">{`<< Back`}</Link>
      </Button>
    </div>
  );
};

export default CreateDataFromAPI;
