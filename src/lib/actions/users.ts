"use server";

export async function getUsersData() {
  const res = await fetch("https://dummyjson.com/users");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = res.json();
  return data;
}
