'use server';

import { redirect } from "next/navigation";
import { db } from "@/db";

export default async function createUser(formData: {
  name: string,
  email: string,
  password: string
}) {
  console.log(formData.password);
  const user = await db.user.create({
    data: {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }
  });
  console.log(user);

  redirect('/');
}