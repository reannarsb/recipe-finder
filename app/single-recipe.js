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