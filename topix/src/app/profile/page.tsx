import { getServerSession } from "next-auth";
import FileUpload from "./components/uploadFile";
import { authOptions } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return (
    <div>
      <FileUpload />
    </div>
  );
}
