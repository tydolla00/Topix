import { Avatar, AvatarImage } from "@/shadcn/ui/avatar";
import { Session } from "next-auth";
import Image from "next/image";

export default function ProfilePicture({ session }: { session: Session }) {
  return (
    <Avatar>
      {session.user?.image ? (
        <AvatarImage alt="Profile Pic" src={session.user.image} />
      ) : (
        <h2 className="font-bold text-xl text-center">
          {session.user?.name?.at(0)?.toUpperCase()}
        </h2>
      )}
    </Avatar>
  );
}
