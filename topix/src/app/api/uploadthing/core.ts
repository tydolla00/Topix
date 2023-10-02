import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/utils";

const f = createUploadthing();

const auth = async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session) return false;
  return { email: session.user?.email, session };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { email: user.email as string, session: user.session };
    })
    .onUploadError(async (e) => {
      console.log(e);
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for user:", metadata.email);

      console.log("file url", file.url);
      await prisma.user.update({
        where: { email: metadata.email },
        data: { image: file.url },
      });
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
