"use server";

import { ActionState } from "@/types/state";

export const submitAction = async (_: ActionState, formData: FormData) => {
  try {
    const response = await fetch("http://localhost:3000/api/analyze", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      return await response.text();
    }
  } catch (error) {
    console.error("Analysis failed:", error);
  }
};
