import { Avatar, AvatarImage } from "@/shadcn/ui/avatar";
import { User } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";

export default function ProfilePicture({ session }: { session: Session }) {
  return (
    <Avatar>
      {session.user?.image ? (
        <AvatarImage alt="Profile Pic" src={session.user.image} />
      ) : (
        <div className="flex justify-center items-center w-full text-2xl">
          <User size={40} />
        </div>
      )}
    </Avatar>
  );
}
