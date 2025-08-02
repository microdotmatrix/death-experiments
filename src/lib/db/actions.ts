"use server";

import { db } from "@/lib/db";
import { ObituaryTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { action } from "../env/utils";

export const GenerateObituarySchema = z.object({
  userId: z.string(),
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

export const createObituaryRecord = action(
  GenerateObituarySchema,
  async (data) => {
    const { userId, deceasedId, formData } = data;

    const result = await db
      .insert(ObituaryTable)
      .values({
        fullName: formData.fullName,
        birthDate: formData.birthDate,
        deathDate: formData.deathDate,
        inputData: { ...formData },
        generatedText: "",
        generatedTextClaude: "",
        generatedTextOpenAI: "",
        generatedTextClaudeTokens: 0,
        generatedTextOpenAITokens: 0,
        userEntryId: deceasedId,
        userId: userId,
      })
      .returning();

    return result;
  }
);

export const UpdateObituarySchema = z.object({
  id: z.string(),
  model: z.string(),
  generatedText: z.string(),
  tokenUsage: z.number(),
});

export const updateObituaryRecord = action(
  UpdateObituarySchema,
  async (data) => {
    const { id, model, generatedText, tokenUsage } = data;

    if (model === "claude") {
      await db
        .update(ObituaryTable)
        .set({
          generatedTextClaude: generatedText,
          generatedTextClaudeTokens: tokenUsage,
        })
        .where(eq(ObituaryTable.id, id));
    } else if (model === "openai") {
      await db
        .update(ObituaryTable)
        .set({
          generatedTextOpenAI: generatedText,
          generatedTextOpenAITokens: tokenUsage,
        })
        .where(eq(ObituaryTable.id, id));
    }
  }
);
