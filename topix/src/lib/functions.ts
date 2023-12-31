import { PrismaClient, Prisma, $Enums } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { User } from "next-auth";

export const capitalizeFirstLetter = (word: string) => {
  const firstLetter = word.charAt(0).toUpperCase();
  return firstLetter + word.substring(1);
};

// ? Update user in db based on provider.
export const updateUser = async (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  provider: $Enums.Provider,
  user: User
) => {
  console.log("Update User in " + provider, { user });
  switch (provider) {
    case "google":
      const newName = user.name?.split(" ") as string[];
      await prisma.user.update({
        where: {
          email: user.email as string,
        },
        data: {
          provider: provider,
          firstName: newName[0],
          lastName: newName[1],
          role: "user",
        },
      });
      break;

    case "github":
      await prisma.user.update({
        where: { email: user.email as string },
        data: {
          provider: provider,
          username: user.name,
          role: "user",
        },
      });
      break;
  }
};
