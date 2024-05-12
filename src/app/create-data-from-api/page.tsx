"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { getUsersData } from "@/lib/actions/users";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import {
  IAddress,
  IAgeList,
  IData,
  IDepartmentData,
  IHair,
  IRawData,
} from "@/lib/types";

const getMaxAge = (acc: number, next: number) => {
  return Math.max(acc, next);
};

const getMinAge = (acc: number, next: number) => {
  return Math.min(acc, next);
};

const isDuplicateKey = (
  obj: { [key: string]: IDepartmentData },
  matchKey: string
) => {
  for (const key in obj) {
    if (key === matchKey) {
      return true;
    }
  }

  return false;
};

const isDuplicateHairColor = (
  prevHairColor: { [key: string]: number },
  matchHairColor: string
) => {
  for (const key in prevHairColor) {
    if (key === matchHairColor) {
      return true;
    }
  }

  return false;
};

const CreateDataFromAPI = () => {
  const [datas, setDatas] = useState<IData>({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = useMemo(
    () => async () => {
      try {
        const dummyResult: IData = {};
        const ageList: IAgeList = {};
        const response = await getUsersData().then((data) => {
          const tmpResult = data.users.map((user: IRawData) => {
            const id = user.id;
            const department = user.company.department;
            const firstName = user.firstName;
            const lastName = user.lastName;
            const age = user.age;
            const gender = user.gender;
            const postAddress = user.address.postalCode;
            const hairColor = user.hair.color;

            const duplicatedKey = isDuplicateKey(dummyResult, department);
            if (!ageList[department]) {
              ageList[department] = { maxAge: age, minAge: age };
            } else {
              if (ageList[department].maxAge < age) {
                ageList[department].maxAge = age;
              }
              if (ageList[department].minAge > age) {
                ageList[department].minAge = age;
              }
            }

            if (user.id === 1) {
              const tmpObj: IAddress = {};
              tmpObj[`${firstName}${lastName}`] = postAddress;
              const tmpHairObj: IHair = {};
              tmpHairObj[hairColor] = 1;

              dummyResult[department] = {
                male: gender === "male" ? 1 : 0,
                female: gender === "female" ? 1 : 0,
                ageRange: `${age}`,
                hair: tmpHairObj,
                addressUser: tmpObj,
              };
            } else if (duplicatedKey) {
              let tmpDummyResult = { ...dummyResult[department] };

              let tmpHairColor: IHair;
              if (isDuplicateHairColor(tmpDummyResult.hair, hairColor)) {
                tmpHairColor = { ...tmpDummyResult.hair };
                tmpHairColor[hairColor] = tmpDummyResult.hair[hairColor] + 1;
              } else {
                tmpHairColor = { ...tmpDummyResult.hair };
                tmpHairColor[hairColor] = 1;
              }

              const tmpAddress: IAddress = { ...tmpDummyResult.addressUser };
              tmpAddress[`${firstName}${lastName}`] = postAddress;

              dummyResult[department] = {
                ...dummyResult[department],
                male:
                  gender === "male"
                    ? tmpDummyResult.male + 1
                    : tmpDummyResult.male,
                female:
                  gender === "female"
                    ? tmpDummyResult.female + 1
                    : tmpDummyResult.female,
                ageRange: `${ageList[department].minAge} - ${ageList[department].maxAge} `,
                hair: tmpHairColor,
                addressUser: tmpAddress,
              };
            } else {
              const tmpObj: IAddress = {};
              tmpObj[`${firstName}${lastName}`] = postAddress;
              const tmpHairObj: IHair = {};
              tmpHairObj[hairColor] = 1;

              dummyResult[department] = {
                ...dummyResult[department],
                male: gender === "male" ? 1 : 0,
                female: gender === "female" ? 1 : 0,
                ageRange: `${age}`,
                hair: tmpHairObj,
                addressUser: tmpObj,
              };
            }

            return dummyResult;
          });
        });

        setDatas(dummyResult);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    },
    []
  );

  return (
    <div className="max-w-screen-md my-20 mx-auto flex flex-col gap-8 justify-center items-center">
      <h1 className="text-center text-3xl"> Create data from API </h1>
      <div className="container mx-auto py-10">
        {datas && (
          <CodeBlock
            text={JSON.stringify(datas, null, 2)}
            language="javascript"
            showLineNumbers={true}
            theme={atomOneDark}
          />
        )}
      </div>
      <Button variant="link">
        <Link href="/">{`<< Back`}</Link>
      </Button>
    </div>
  );
};

export default CreateDataFromAPI;
