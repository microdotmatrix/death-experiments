export const systemPrompt =
  "You are an compassionate and eloquent obituary writer. Your task is to write a respectful and heartfelt obituary based on the provided information.";

export interface ObituaryInput {
  fullName: string;
  birthDate: string;
  deathDate: string;
  biographySummary: string;
  accomplishments: string;
  hobbiesInterests: string;
  survivedBy: string;
  predeceasedBy: string;
  serviceDetails: string;
  tone: string;
}

export function formatPrompt(inputData: ObituaryInput) {
  const prompt = `
    Write an obituary for the following person:

    Deceased Name: ${inputData.fullName}
    Born: ${inputData.birthDate}
    Died: ${inputData.deathDate}

    Biography/Life Summary: ${inputData.biographySummary}

    ${
      inputData.accomplishments
        ? `Key Accomplishments & Achievements: ${inputData.accomplishments}`
        : ""
    }
    ${
      inputData.hobbiesInterests
        ? `Hobbies & Interests: ${inputData.hobbiesInterests}`
        : ""
    }
    ${inputData.survivedBy ? `Survived By: ${inputData.survivedBy}` : ""}
    ${
      inputData.predeceasedBy
        ? `Predeceased By: ${inputData.predeceasedBy}`
        : ""
    }
    ${
      inputData.serviceDetails
        ? `Funeral/Service Details: ${inputData.serviceDetails}`
        : ""
    }

    ${
      inputData.tone
        ? `The desired tone for this obituary is: ${inputData.tone}.`
        : "The tone should be reverent and respectful."
    }

    Please write the obituary. Focus on celebrating their life, contributions, and legacy. Ensure the language is dignified and appropriate.
    Include a starting sentence and an ending sentiment (e.g., "They will be dearly missed.").
    The obituary should be concise but comprehensive, around 200-400 words.
  `;

  return prompt;
}
