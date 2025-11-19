import { Link } from "react-router";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  CATEGORY_EMOJIS,
  getGeneralCategories,
  getQuestionsByCategory,
  STATES,
} from "~/lib/questions";

export function CategoryList() {
  const categories = getGeneralCategories();

  return (
    <div className="container mx-auto p-4 max-w-5xl space-y-12 py-8">
      {/* General Categories Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span>📚</span> General Topics
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const count = getQuestionsByCategory(cat).length;
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
                    <Badge variant="secondary">{count} Questions</Badge>
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
            // We use the state code as the category ID
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
                    <Badge variant="outline">10 Questions</Badge>
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
