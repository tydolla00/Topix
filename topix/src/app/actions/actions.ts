"use server";

import { prisma } from "@/lib/utils";
import { $Enums } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function editProfile(formData: FormData) {
  const user = await getServerSession();
  if (!user?.user?.email) throw new Error("Unauthenticated");
  console.log(user);

  const name = {
    name: formData.get("name") as string | undefined,
    username: formData.get("username") as string | undefined,
    email: formData.get("email") as string | undefined,
    birthday: formData.get("birthday"),
    pronouns: formData.get("pronouns") as string | undefined,
  };

  let pronoun: $Enums.Pronouns;
  switch (name.pronouns) {
    case "He/Him":
      pronoun = "HeHim";
      break;
    case "She/Her":
      pronoun = "SheHer";
      break;
    default:
      pronoun = "Other";
  }

  await prisma.user.update({
    where: { email: user?.user?.email },
    data: {
      first_name: name.name?.split(" ")[0],
      last_name: name.name?.split(" ")[1],
      name: name.name && (name.name as string),
      pronouns: pronoun,
    },
  });
  console.log({ name });
  revalidatePath("/profile");
}
