import { NextRequest, NextResponse } from "next/server";
import { drive } from "@/app/api/services/googleDrive";

// Get File from Google Drive
export async function GET(request: NextRequest, res: Response) {
  try {
    // const fileId = request.nextUrl.href.lastIndexOf("/");
    const fileId = "1jIKeyV3_TeV1KOziG354yTBy8gtqEyus";
    const res = await drive.files.get({ fileId, alt: "media" });
    console.log(res);
    const response = new NextResponse(res);
    response.headers.set("content-type", "image/png");
    console.log({ response });
    console.log(response.body);
    return response.blob();
    return NextResponse.json({ message: "Congrats" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "An error ocurred" });
  }
}
