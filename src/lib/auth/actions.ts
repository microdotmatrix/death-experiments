"use server";

import { auth } from "@/lib/auth";
import { action } from "@/lib/env/utils";
import { redirect } from "next/navigation";
import { z } from "zod";

export const SignUpSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(1, "Name is required"),
});

export const LoginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginEmail = action(LoginSchema, async (data) => {
  const { email, password } = data;

  await auth.api.signInEmail({
    body: { email, password },
  });

  redirect("/");
});

export const signUpEmail = action(SignUpSchema, async (data) => {
  const { email, password, name } = data;

  await auth.api.signUpEmail({
    body: { email, password, name },
  });

  redirect("/");
});
