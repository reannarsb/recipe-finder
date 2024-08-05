"use client";
import { useEffect, useState } from "react";
import Recipe from "./recipe";

export default function Image() {
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState("chicken");

    async function fetchRecipes() {
        try {
            const response = await fetch(
                `https://api.api-ninjas.com/v1/recipe?query=${query}&api_key=YOUR_API_KEY`
            );
            const data = await response.json();
            setRecipes(data);
        } catch (error) {
            console.error(`Error fetching recipes: ${error.message}`);
        }
    }

    useEffect(() => {
        fetchRecipes();
    }, [query]);

    return (
        <div className="image-container">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for recipes..."
                className="search-input p-2 border rounded"
            />
            <button onClick={fetchRecipes} className="search-button p-2 bg-blue-500 text-white rounded ml-2">
                Search
            </button>
            <div className="recipes-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipes.map((recipe, index) => (
                    <Recipe key={index} recipe={recipe} />
                ))}
            </div>
        </div>
    );
}
