"use client";

import { ActionState } from "@/types/state";
import { useActionState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { submitAction } from "./actions";

export const AnalyzePdf = () => {
  const [state, action, pending] = useActionState<ActionState, FormData>(
    submitAction,
    {
      error: "",
      loading: false,
      result: "",
    }
  );

  return (
    <div>
      <form action={action}>
        <div className="mb-4">
          <Label>Upload Image</Label>
          <Input name="pdf" type="file" accept="application/pdf" />
        </div>
        <Button type="submit" disabled={pending}>
          Submit{pending && "ing..."}
        </Button>
      </form>
      {state.result && (
        <pre>{JSON.stringify(JSON.parse(state.result), null, 2)}</pre>
      )}
    </div>
  );
};
