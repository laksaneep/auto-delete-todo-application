"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center mx-auto my-[20rem]">
      <h1 className="text-4xl">Frontend Test</h1>
      <p>Developed by : Laksanee Petchngamsaeng </p>
      <Button asChild>
        <Link href={`https://1drv.ms/b/s!AvZDuPzjmrnvk_0KhzuXQGbOuRtgnw`}>
          Resume
        </Link>
      </Button>
      <br></br>
      <div className="flex flex-col justify-center items-start">
        <p className="italic">Solution : </p>
        <li>
          <Link href="/auto-todo">Auto delete todo application</Link>
        </li>
        <li>
          <Link href="/create-data-from-api">Create data from API</Link>
        </li>
      </div>
    </div>
  );
}
