"use server";

import { revalidatePath } from "next/cache";

export async function editProfile(formData: FormData) {
  const name = formData.get("name");
  revalidatePath("/profile");
}
