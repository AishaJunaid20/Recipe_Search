"use client";
import React, { useState, FormEvent } from "react"; 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; 
import Link from "next/link"; 
import { SearchIcon } from "lucide-react"; 
import { ClipLoader } from "react-spinners";
import Image from "next/image";
interface Recipe {
  uri: string;
  label: string;
  image: string;
  ingredientLines: string[];
  ingredients: { text: string }[];
  url: string;
}

const examples = [  "Biryani",  "Chicken Karahi",  "Nihari",  "Haleem",  "Chapli Kabab",];

export default function RecipeSearchComponent() {
  const [query, setQuery] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searched, setSearched] = useState<boolean>(false);

const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setSearched(true);
    setRecipes([]); 
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${process.env.NEXT_PUBLIC_EDAMAM_APP_ID}&app_key=${process.env.NEXT_PUBLIC_EDAMAM_APP_KEY}`
      );
      const data = await response.json();
      setRecipes(data.hits.map((hit: { recipe: Recipe }) => hit.recipe));
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }


  };
  return (
    <div className="flex flex-col  w-full max-w-6xl mx-auto p-4 md:p-6 h-screen bg-yellow-100" >
      <header className="flex flex-col items-center mb-6 bg-yellow-200">
        <h1 className="text-3xl font-bold mb-2 font-serif">Recipe Search</h1>
        <p className="text-lg mb-4 font-bold">
          Find delicious recipes by ingredients you have at home.
        </p>
        <div className="mb-4">
          <p>Try searching for:</p>
          <div className="flex space-x-2">
            {examples.map((example) => (
              <span
                key={example}
                className="px-2 py-1 bg-yellow-400 hover:bg-yellow-600 rounded-xl cursor-pointer"
                onClick={() => setQuery(example)}
              >
                {example}
              </span>
            ))}
          </div>
        </div>
        <form className="relative w-full max-w-md mb-6 bg-slate-200" onSubmit={handleSearch}>
          <Input
            type="search"
            placeholder="Search by ingredient..."
            className="pr-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <SearchIcon className="w-5 h-5" />
          </Button>
        </form>
      </header>
      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
           
          <p>Loading recipes, please wait...</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {searched && recipes.length === 0 && (
            <p>No recipes found. Try searching with different ingredients.</p>
          )}
          {recipes.map((recipe) => (
            <Card className="group relative" key={recipe.uri}>
              <Image
                src={recipe.image}
                alt={recipe.label}
                width={400}
                height={300}
                className="rounded-t-lg object-cover w-full h-48 group-hover:opacity-50 transition-opacity"
              />
              <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-2">{recipe.label}</h2>
                <p className="text-muted-foreground line-clamp-2">
                  {recipe.ingredientLines.join(", ")}
                </p>
              </CardContent>
              <Link
                href={recipe.url}
                className="absolute inset-0 z-10"
                prefetch={false}
              >
                <span className="sr-only">View recipe</span>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}