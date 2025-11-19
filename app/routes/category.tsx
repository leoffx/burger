import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router";
import { Header } from "~/components/header";
import { QuestionCard } from "~/components/question-card";
import { Button } from "~/components/ui/button";
import { getQuestionsByCategory, STATES } from "~/lib/questions";
import type { Route } from "./+types/category";

export function meta({ params }: Route.MetaArgs) {
  return [{ title: `Burger - ${params.categoryId}` }];
}

export default function CategoryPage() {
  const { categoryId } = useParams();

  if (!categoryId) {
    return (
      <div className="p-8 text-center">
        <p>Invalid category.</p>
        <Link to="/">
          <Button variant="link">Go Home</Button>
        </Link>
      </div>
    );
  }

  const decodedId = decodeURIComponent(categoryId);
  const questions = getQuestionsByCategory(decodedId);

  // Check if it's a state to show a nicer title
  const state = STATES.find((s) => s.code === decodedId);
  const title = state ? `${state.name} Questions` : decodedId;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto max-w-3xl p-4">
        <div className="flex items-center gap-4 mb-6 sticky top-14 bg-background/95 backdrop-blur z-10 py-4 border-b">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold truncate">{title}</h1>
          <div className="ml-auto text-sm text-muted-foreground">
            {questions.length} Questions
          </div>
        </div>

        <div className="space-y-8 pb-20">
          {questions.map((q) => (
            <QuestionCard key={q.num} question={q} />
          ))}
        </div>
      </div>
    </div>
  );
}
