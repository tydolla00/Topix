import { prisma } from "@/lib/utils";
import { user } from "@prisma/client";
import { cache } from "react";

const getUsers = async () => {
  const res = await fetch("http://localhost:3000/api/test");
  return res.json();
};

const getUsersCached = cache(async () => {
  const users = await prisma.user.findMany();
  console.log("Cached function called");
  return users;
});

export default async function Settings() {
  const users: user[] = await getUsersCached();
  return (
    <>
      <p className="text-3xl font-bold">Settings Component</p>
      {users.map((user) => (
        <div key={user.id}>
          <li>{user.name}</li>
        </div>
      ))}

      <Test />
      <PrismaTest />
    </>
  );
}

const Test = async () => {
  const users: user[] = await getUsersCached();
  return (
    <>
      <p className="text-3xl font-bold text-purple-500">Test Component</p>
      {users.map((user) => (
        <div key={user.id}>
          <li>{user.name}</li>
        </div>
      ))}
    </>
  );
};

const PrismaTest = async () => {
  const users: user[] = await getUsersCached();
  return (
    <>
      <p className="text-3xl font-bold text-red-500">Prisma Component</p>
      {users.map((user) => (
        <div key={user.id}>
          <li>{user.name}</li>
        </div>
      ))}
    </>
  );
};
