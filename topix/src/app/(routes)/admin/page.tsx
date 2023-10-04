import SheetForm from "@/app/_components/sheetForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function Admin() {
  const session = await getServerSession();
  // @ts-ignore
  if (session?.user.role !== "admin") redirect("/");
  return (
    <>
      <h1 className="text-2xl font-bold"> Admin Dashboard</h1>
      <SheetForm />
    </>
  );
}
