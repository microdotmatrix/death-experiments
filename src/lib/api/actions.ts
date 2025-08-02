"use server";

import { createStreamableValue } from "@ai-sdk/rsc";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getSession } from "../auth/server";
import { createObituaryRecord } from "../db/actions";
import { action } from "../env/utils";
import { generateOpenAIObituary } from "./openai";

export const GenerateObituarySchema = z.object({
  deceasedId: z.string(),
  formData: z.object({
    fullName: z.string(),
    birthDate: z.string(),
    deathDate: z.string(),
    biographySummary: z.string(),
    accomplishments: z.string(),
    hobbiesInterests: z.string(),
    survivedBy: z.string(),
    predeceasedBy: z.string(),
    serviceDetails: z.string(),
    tone: z.string(),
  }),
});

export const generateObituary = action(GenerateObituarySchema, async (data) => {
  const { deceasedId, formData } = data;

  const session = await getSession();

  if (!session.user) {
    return {
      success: false,
      error: "Must be logged in to generate an obituary.",
    };
  }

  const entry = await createObituaryRecord(
    session.user.id,
    deceasedId,
    formData
  );

  // const claudeStream = createStreamableValue("");
  const openaiStream = createStreamableValue("");

  const [openai] = await Promise.all([
    // generateClaudeObituary(entry[0].id, formData, claudeStream),
    generateOpenAIObituary(entry[0].id, formData, openaiStream),
  ]);

  revalidatePath("/obituaries"); // Revalidate the page where the form is located

  return {
    success: true,
    obituary: {
      // claude: claude.obituary,
      openai: openai.obituary,
    },
  };
});
