import { Link } from "react-router";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  CATEGORY_EMOJIS,
  getGeneralCategories,
  getQuestionsByCategory,
  questions,
  STATES,
} from "~/lib/questions";
import { useStudy } from "~/lib/store";

export function CategoryList() {
  const { answers } = useStudy();
  const categories = getGeneralCategories();

  const totalQuestions = questions.length;
  const totalAnswered = questions.filter((q) => answers[q.num]).length;
  const totalPercentage =
    totalQuestions > 0 ? Math.round((totalAnswered / totalQuestions) * 100) : 0;

  return (
    <div className="container mx-auto p-4 max-w-5xl space-y-12 py-8">
      {/* Overall Progress */}
      <section>
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span></span>
              <span className="text-2xl font-bold text-primary">
                {totalPercentage}%
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-background h-4 rounded-full overflow-hidden border">
              <div
                className="bg-green-600 h-full transition-all duration-500"
                style={{ width: `${totalPercentage}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2 text-right">
              {totalAnswered} of {totalQuestions} questions answered
            </p>
          </CardContent>
        </Card>
      </section>

      {/* General Categories Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span>📚</span> General Topics
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const catQuestions = getQuestionsByCategory(cat);
            const count = catQuestions.length;
            const answeredCount = catQuestions.filter(
              (q) => answers[q.num]
            ).length;
            const percentage =
              count > 0 ? Math.round((answeredCount / count) * 100) : 0;
            const emoji = CATEGORY_EMOJIS[cat] || "📝";

            return (
              <Link key={cat} to={`/category/${encodeURIComponent(cat)}`}>
                <Card className="h-full hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all hover:scale-[1.02] cursor-pointer border-l-4 border-l-primary">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-3">
                      <span className="text-2xl">{emoji}</span>
                      {cat}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-2">
                      <Badge variant="secondary">{count} Questions</Badge>
                      <span className="text-xs font-medium text-muted-foreground">
                        {percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-green-600 h-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Federal States Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span>🇩🇪</span> Federal States
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {STATES.map((state) => {
            const stateQuestions = getQuestionsByCategory(state.code);
            const count = stateQuestions.length;
            const answeredCount = stateQuestions.filter(
              (q) => answers[q.num]
            ).length;
            const percentage =
              count > 0 ? Math.round((answeredCount / count) * 100) : 0;

            return (
              <Link key={state.code} to={`/category/${state.code}`}>
                <Card className="h-full hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all hover:scale-[1.02] cursor-pointer">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-3">
                      <span className="text-2xl">{state.emblem}</span>
                      {state.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-2">
                      <Badge variant="outline">{count} Questions</Badge>
                      <span className="text-xs font-medium text-muted-foreground">
                        {percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-green-600 h-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
