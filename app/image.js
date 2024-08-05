"use client";
import { useEffect, useState } from "react";
import Recipe from "./recipe";

export default function Image() {
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState("bread");

    async function fetchRecipes() {
        try {
            const response = await fetch(
                `https://api.api-ninjas.com/v1/recipe?query=${query}`,
                {
                    headers: {
                        'X-Api-Key': 'iwuq6D9SI1hezHijXm+D/w==aDV5cyafh8z9wYEm'
                    }
                }
            );
            const data = await response.json();
            if (Array.isArray(data)) {
                setRecipes(data);
            } else {
                setRecipes([]);
                console.error("Expected an array of recipes");
            }
        } catch (error) {
            console.error(`Error fetching recipes: ${error.message}`);
        }
    }

    useEffect(() => {
        fetchRecipes();
    }, [query]);

    return (
        <div className="image-container text-black">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for recipes..."
                className="search-input ml-4 p-2 border rounded-lg bg-white"
            />
            <button onClick={fetchRecipes} className="search-button p-2 bg-indigo-400 hover:bg-indigo-600 text-white rounded-xl ml-2 text-black">
                Search
            </button>
            <div className="recipes-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipes.length > 0 ? (
                    recipes.map((recipe, index) => (
                        <Recipe key={index} recipe={recipe} />
                    ))
                ) : (
                    <p>No recipes found.</p>
                )}
            </div>
        </div>
    );
}