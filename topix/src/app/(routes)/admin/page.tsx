import SheetForm from "@/app/_components/sheetForm";
import { prisma } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function Admin() {
  let user;
  const session = await getServerSession();
  if (session)
    user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    });
  if (user?.role !== "admin") redirect("/");
  return (
    <>
      <h1 className="text-2xl font-bold"> Admin Dashboard</h1>
      <SheetForm user={session?.user?.email} />
    </>
  );
}
