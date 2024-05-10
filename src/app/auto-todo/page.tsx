"use client";

import { Button } from "@/components/ui/button";
import Groceries from "@/lib/groceries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import Link from "next/link";

interface IGroceries {
  type: string;
  name: string;
}

interface ICountingItem {
  [item: string]: ReturnType<typeof setTimeout> | undefined;
}

const ALLTYPE = ["Fruit", "Vegetable"];

const AutoTodo = () => {
  const [groceriesList, setGroceriesList] = useState<IGroceries[]>(Groceries);
  const [selectedGroceriesList, setSelectedGroceriesList] = useState<
    IGroceries[]
  >([]);
  const [isCounting, setIsCounting] = useState<ICountingItem>({});

  const handleUnSelected = (
    unselected: IGroceries,
    isCliecked: boolean = false
  ) => {
    if (isCliecked) {
      clearTimeout(isCounting[unselected.name]);
    }
    setSelectedGroceriesList((prev) => [
      ...prev.filter((v) => v.name !== unselected.name),
    ]);
    setGroceriesList((prev) => [...prev, unselected]);
    setIsCounting((prev) => {
      const newState = { ...prev };
      newState[unselected.name] = undefined;
      return newState;
    });
  };

  const handleOnClickItem = (clickedItem: IGroceries) => {
    setGroceriesList((prev) => [
      ...prev.filter((v) => v.name !== clickedItem.name),
    ]);
    setSelectedGroceriesList((prev) => [...prev, clickedItem]);

    const timeoutId = setTimeout(() => {
      handleUnSelected(clickedItem);
    }, 5000);

    setIsCounting((prev) => {
      const newState = { ...prev };
      newState[clickedItem.name] = timeoutId;
      return newState;
    });
  };

  return (
    <div className="max-w-screen-md my-20 mx-auto flex flex-col gap-8 justify-center items-center">
      <h1 className="text-center text-3xl"> To-do application </h1>
      <div className="grid grid-cols-3 gap-10">
        <Card>
          <CardHeader>
            <CardTitle>{""}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 justify-center items-center my-3 ">
            {groceriesList.map((grocery, idx) => (
              <Button
                key={idx}
                variant="outline"
                className="w-full"
                onClick={(e) => handleOnClickItem(grocery)}
              >
                {grocery.name}
              </Button>
            ))}
          </CardContent>
        </Card>
        {ALLTYPE.map((type, idx) => {
          return (
            <Card key={idx}>
              <CardHeader>
                <CardTitle>{type}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 justify-center items-center my-3 mx-3 ">
                {selectedGroceriesList &&
                  selectedGroceriesList
                    .filter((t: IGroceries) => t.type === type)
                    .map((value: IGroceries, idx) => {
                      return (
                        <Button
                          key={idx}
                          variant="outline"
                          className="w-full"
                          onClick={(e) => handleUnSelected(value, true)}
                        >
                          {value.name}
                        </Button>
                      );
                    })}
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Button variant="link">
        <Link href="/">{`<< Back`}</Link>
      </Button>
    </div>
  );
};

export default AutoTodo;
