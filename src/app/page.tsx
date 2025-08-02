import { AnalyzePdf } from "@/components/forms/analyze-pdf";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main>
      <div className="container grid auto-rows-min gap-2 place-content-center h-screen">
        <Card>
          <CardHeader>
            <CardTitle>PDF Analyzer</CardTitle>
            <CardDescription>Upload a PDF file to analyze it.</CardDescription>
          </CardHeader>
          <CardContent>
            <AnalyzePdf />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
