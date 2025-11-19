import { CategoryList } from "~/components/category-list";
import { Header } from "~/components/header";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Burger - Einbürgerungstest Study" },
    {
      name: "description",
      content: "Study for the German naturalization test",
    },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryList />
    </div>
  );
}
