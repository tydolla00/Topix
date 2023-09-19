import { Session, getServerSession } from "next-auth";
import FileUpload from "./components/uploadFile";
import { capitalizeFirstLetter } from "@/lib/functions";
import { Avatar, AvatarImage } from "@/shadcn/ui/avatar";
import { editProfile } from "../actions/actions";
import { prisma } from "@/lib/utils";
import { DatePicker } from "./components/datepicker";

export default async function Profile() {
  const session = await getServerSession();
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email as string | undefined },
    select: { username: true, first_name: true, last_name: true, email: true },
  });
  console.log(user);
  const name =
    user &&
    capitalizeFirstLetter(user.first_name as string) +
      " " +
      capitalizeFirstLetter(user.last_name as string);

  return (
    <>
      <div className="grid sm:grid-cols-2">
        <div>
          <h1 className="font-bold text-2xl m-3">My Profile </h1>
          <h1 className="text-3xl ml-3 font-bold">
            {capitalizeFirstLetter(user?.username as string)}
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
      <DatePicker />
      <FileUpload />
    </>
  );
}

const Form = ({ user }: { user: UserProps }) => (
  <form action={editProfile}>
    <button className="ml-auto btn btn-success block">Edit Profile</button>
    <label className="label">Full Name</label>
    <input
      name="name"
      type="text"
      className="input input-bordered w-full max-w-xs "
      value={`${user?.first_name} ${user?.last_name}` as string}
      disabled
    />
    <label className="label"> Username</label>
    <input
      name="username"
      type="text"
      className="input input-bordered w-full max-w-xs "
      value={user?.username as string}
      disabled
    />
    <label className="label">Email</label>
    <input
      name="email"
      type="email"
      className="input input-bordered w-full max-w-xs "
      value={user?.email as string}
      disabled
    />
    <label className="label">Birthday</label>
    <input
      name="birthday"
      type="date"
      defaultValue={""}
      className="input input-bordered w-full max-w-xs "
      disabled
    />
    <label className="label">Pronouns</label>
    <input
      name="pronounts"
      type="text"
      className="input input-bordered w-full max-w-xs "
      disabled
    />
    <button className="btn btn-secondary ml-auto block">Save Changes</button>
  </form>
);

type UserProps = {
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
} | null;
