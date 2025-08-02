import { relations } from "drizzle-orm";
import {
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { UserEntriesTable, UserTable } from "./user";

export const ObituaryTable = pgTable("obituaries", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: text("full_name").notNull(),
  birthDate: text("birth_date").notNull(), // Store as text 'YYYY-MM-DD'
  deathDate: text("death_date").notNull(), // Store as text 'YYYY-MM-DD'
  // Storing input data as JSONB is flexible. Consider a more granular schema
  // if you need to query specific input fields frequently.
  inputData: jsonb("input_data"), // Store the raw form input as JSONB
  generatedText: text("generated_text").notNull(),
  generatedTextClaude: text("generated_text_claude").notNull(),
  generatedTextOpenAI: text("generated_text_openai").notNull(),
  generatedTextClaudeTokens: integer("generated_text_claude_tokens").notNull(),
  generatedTextOpenAITokens: integer("generated_text_openai_tokens").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  // Foreign key to relate obituary to deceased person
  userEntryId: uuid("user_entry_id")
    .notNull()
    .references(() => UserEntriesTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const ObituaryRelations = relations(ObituaryTable, ({ one }) => ({
  userEntry: one(UserEntriesTable, {
    fields: [ObituaryTable.userEntryId],
    references: [UserEntriesTable.id],
  }),
  user: one(UserTable, {
    fields: [ObituaryTable.userId],
    references: [UserTable.id],
  }),
}));

export type Obituary = typeof ObituaryTable.$inferSelect;
