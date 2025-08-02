import { openai } from "@ai-sdk/openai";
import { customProvider } from "ai";

export const ai = customProvider({
  languageModels: {
    "chat-model": openai("gpt-4o"),
    "artifact-model": openai("gpt-4o"),
  },
});
