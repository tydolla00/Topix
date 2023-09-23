import { getServerSession } from "next-auth";
import { capitalizeFirstLetter } from "@/lib/functions";
import { Avatar, AvatarImage } from "@/shadcn/ui/avatar";
import { prisma } from "@/lib/utils";
import { Form } from "./components/form";

export default async function Profile() {
  const session = await getServerSession();
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email as string | undefined },
    select: {
      username: true,
      name: true,
      first_name: true,
      last_name: true,
      email: true,
      birthday: true,
      pronouns: true,
      updatedAt: true,
    },
  });

  console.log({ user });

  return (
    <>
      <div className="grid sm:grid-cols-2">
        <div>
          <h1 className="font-bold text-2xl m-3">My Profile {user?.name}</h1>
          <p className="m-3 text-slate-700 font-bold">
            Your changes will be reflected when you save.
          </p>
          <h1 className="text-3xl ml-3 font-bold">
            {user?.username && capitalizeFirstLetter(user?.username)}
          </h1>
          <Avatar className="w-64 h-64">
            <AvatarImage
              src={session?.user?.image as string}
              alt="Profile Pic"
            />
          </Avatar>
        </div>
        <Form user={user} />
      </div>
      <h1 className="font-bold text-2xl m-3">Topix</h1>
    </>
  );
}
