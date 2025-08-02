import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { updateObituaryRecord } from "../db/actions";
import { formatPrompt, ObituaryInput, systemPrompt } from "./utils";

export async function generateOpenAIObituary(
  id: string,
  formData: FormData,
  stream: any
) {
  try {
    const inputData: ObituaryInput = {
      fullName: formData.get("fullName") as string,
      birthDate: formData.get("birthDate") as string,
      deathDate: formData.get("deathDate") as string,
      biographySummary: formData.get("biographySummary") as string,
      accomplishments: formData.get("accomplishments") as string,
      hobbiesInterests: formData.get("hobbiesInterests") as string,
      survivedBy: formData.get("survivedBy") as string,
      predeceasedBy: formData.get("predeceasedBy") as string,
      serviceDetails: formData.get("serviceDetails") as string,
      tone: formData.get("tone") as string,
    };

    const prompt = formatPrompt(inputData);

    let generatedText = "";
    let tokenUsage = 0;

    (async () => {
      const { textStream } = await streamText({
        model: openai("gpt-4o"),
        system: systemPrompt,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        maxTokens: 1000,
        onFinish: ({
          usage,
        }: {
          usage: {
            promptTokens: number;
            completionTokens: number;
            totalTokens: number;
          };
        }) => {
          const { promptTokens, completionTokens, totalTokens } = usage;
          console.log("Prompt Tokens:", promptTokens);
          console.log("Completion Tokens:", completionTokens);
          console.log("Total Tokens:", totalTokens);
          tokenUsage = totalTokens;
        },
      });
      for await (const delta of textStream) {
        generatedText += delta;
        stream.update(delta);
      }

      stream.done();

      await updateObituaryRecord(id, "openai", generatedText, tokenUsage);
    })();

    return {
      success: true,
      obituary: stream.value,
    };
  } catch (error: any) {
    console.error("Error generating obituary:", error);
    return {
      success: false,
      error: error.message || "An unknown error occurred.",
    };
  }
}
