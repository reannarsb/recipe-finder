"use client";
 
import { useEffect, useState } from "react";
import Recipe from "./recipe";
 
export default function SingleRecipe() {
    const [singleRecipe, setSingleRecipe] = useState(null);
 
    async function fetchSingleRecipe() {
        try {
            const response = await fetch(`https://api.api-ninjas.com/v1/recipe?id=12345`, {
                headers: {
                    'X-Api-Key': 'iwuq6D9SI1hezHijXm+D/w==aDV5cyafh8z9wYEm'
                }
            });
            const data = await response.json();
            setSingleRecipe(data[0]);
        } catch (error) {
            console.error(`Error fetching recipe: ${error.message}`);
        }
    }
 
    useEffect(() => {
        fetchSingleRecipe();
    }, []);
 
    return (
        <div className="single-recipe-container">
            {singleRecipe && <Recipe recipe={singleRecipe} />}
        </div>
    );
}
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
                className="search-input p-2 border rounded"
            />
            <button onClick={fetchRecipes} className="search-button p-2 bg-blue-500 text-white rounded ml-2 text-black">
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
 
