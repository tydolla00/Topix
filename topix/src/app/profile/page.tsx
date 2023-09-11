import { getServerSession } from "next-auth";
import FileUpload from "./components/uploadFile";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Profile() {
  return (
    <div>
      <FileUpload />
    </div>
  );
}
