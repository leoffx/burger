import { CheckCircle2, HelpCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import type { Question } from "~/lib/questions";
import { useStudy } from "~/lib/store";

interface QuestionCardProps {
  question: Question;
}

export function QuestionCard({ question }: QuestionCardProps) {
  const { language } = useStudy();
  const [selected, setSelected] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  const t = question.translation?.[language] || {
    question: question.question,
    a: question.a,
    b: question.b,
    c: question.c,
    d: question.d,
    context: undefined,
  };

  // Fallback to German if translation is missing parts (though structure implies full object)
  const qText = t.question || question.question;
  const options = {
    a: t.a || question.a,
    b: t.b || question.b,
    c: t.c || question.c,
    d: t.d || question.d,
  };

  const isCorrect = selected === question.solution;

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="mb-2">
            #{question.num}
          </Badge>
          {question.category && (
            <Badge variant="secondary" className="mb-2 ml-2">
              {question.category}
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg leading-relaxed">{qText}</CardTitle>
        {question.image && question.image !== "-" && (
          <div className="mt-4">
            <img
              src={question.image}
              alt="Question illustration"
              className="max-h-48 rounded-md object-contain"
            />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selected || ""}
          onValueChange={(v) => {
            if (!showSolution) {
              setSelected(v);
              setShowSolution(true);
            }
          }}
          className="space-y-3"
        >
          {(["a", "b", "c", "d"] as const).map((key) => {
            let itemClass =
              "flex items-center space-x-2 p-3 rounded-lg border transition-colors";

            if (showSolution) {
              if (key === question.solution) {
                itemClass +=
                  " border-green-500 bg-green-50 dark:bg-green-900/20";
              } else if (selected === key && key !== question.solution) {
                itemClass += " border-red-500 bg-red-50 dark:bg-red-900/20";
              } else {
                itemClass += " opacity-50";
              }
            } else {
              itemClass +=
                " hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer";
              if (selected === key) {
                itemClass += " border-primary bg-primary/5";
              }
            }

            return (
              <div
                key={key}
                className={itemClass}
                onClick={() => {
                  if (!showSolution) {
                    setSelected(key);
                    setShowSolution(true);
                  }
                }}
              >
                <RadioGroupItem
                  value={key}
                  id={`${question.num}-${key}`}
                  className="sr-only"
                />
                <div className="flex-1">
                  <span className="font-bold mr-2 uppercase">{key})</span>
                  {options[key]}
                </div>
                {showSolution && key === question.solution && (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                )}
                {showSolution &&
                  selected === key &&
                  key !== question.solution && (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
              </div>
            );
          })}
        </RadioGroup>

        {showSolution && t.context && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm">
            <div className="flex items-center gap-2 font-semibold text-blue-700 dark:text-blue-300 mb-1">
              <HelpCircle className="h-4 w-4" />
              Explanation
            </div>
            <p>{t.context}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {showSolution && (
          <div className="w-full text-center font-medium">
            {isCorrect ? (
              <span className="text-green-600">Correct!</span>
            ) : (
              <span className="text-red-600">
                Incorrect. The correct answer is{" "}
                {question.solution.toUpperCase()}.
              </span>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
