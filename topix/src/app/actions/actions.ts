"use server";

import { revalidatePath } from "next/cache";
import * as yup from "yup";

export async function editProfile(formData: FormData) {
  const userSchema = yup.object({ name: yup.string().required() });
  const name = {
    name: formData.get("name"),
    username: formData.get("username"),
  };
  console.log(name);
  const user = await userSchema.validate(name);
  revalidatePath("/profile");
}
