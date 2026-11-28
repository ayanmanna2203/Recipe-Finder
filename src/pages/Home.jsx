import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { data } from 'react-router';
import RecipeCard from './RecipeCard';

const dummyRecipes = [
    {
        id: 1,
        name: 'Margherita Pizza',
        image: '/images/recipe-1.svg',
        cuisine: 'Italian',
        difficulty: 'Easy',
        rating: 4.8,
        prepTimeMinutes: 20,
        cookTimeMinutes: 15,
    },
    {
        id: 2,
        name: 'Vegetable Stir-Fry',
        image: '/images/recipe-2.svg',
        cuisine: 'Asian',
        difficulty: 'Easy',
        rating: 4.6,
        prepTimeMinutes: 15,
        cookTimeMinutes: 10,
    },
    {
        id: 3,
        name: 'Chocolate Chip Cookies',
        image: '/images/recipe-3.svg',
        cuisine: 'American',
        difficulty: 'Medium',
        rating: 4.9,
        prepTimeMinutes: 15,
        cookTimeMinutes: 12,
    },
    {
        id: 4,
        name: 'Chicken Alfredo Pasta',
        image: '/images/recipe-4.svg',
        cuisine: 'Italian',
        difficulty: 'Medium',
        rating: 4.7,
        prepTimeMinutes: 15,
        cookTimeMinutes: 20,
    },
    {
        id: 5,
        name: 'Mango Lassi',
        image: '/images/recipe-5.svg',
        cuisine: 'Indian',
        difficulty: 'Easy',
        rating: 4.9,
        prepTimeMinutes: 10,
        cookTimeMinutes: 0,
    },
    {
        id: 6,
        name: 'Caprese Salad',
        image: '/images/recipe-6.svg',
        cuisine: 'Italian',
        difficulty: 'Easy',
        rating: 4.5,
        prepTimeMinutes: 10,
        cookTimeMinutes: 0,
    },
];

function Home() {
    const [recipes, setRecipes] = useState([]);
    const [total, setTotal] = useState(0)
    const  [loading , setloading] = useState(true)
    const [searchQuery , setSearchQuery] = useState("")


    async function fetchRecipes(skipCount , query) {
        try {
            let url = `https://dummyjson.com/recipes?limit=6&skip=${skipCount}`
            if(query){
                url = `https://dummyjson.com/recipes/search?limit=6&skip=${skipCount}&q=${query}`
            }
            const {data}  = await axios.get(url);
        //    console.log(data.recipes);
           setRecipes((prev)=> skipCount===0 ? data.recipes : [...prev, ...data.recipes])
          setTotal(data.total)
            

        } catch (error) {

        }


    }

    function handleSeacrh(e){
        e.preventDefault()
        // console.log(e.target.value);

        const form = new FormData(e.target)
        let query = form.get("query").trim()
        console.log(form.get("query"));
        setSearchQuery(query)
        if(query){
            console.log(query);
            fetchRecipes(0 , query)
        }
    }

 
    useEffect(() => {
        fetchRecipes(0);
    }, []);

    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <form onSubmit={handleSeacrh} className="flex gap-2 max-w-md mx-auto mb-8">
                <input
                    type="text"
                    name ="query"
                    placeholder="Search recipes..."
                    className="flex-1 border border-border rounded px-3 py-2 bg-card text-text outline-none focus:border-accent"
                />
                <button type="button" className="bg-accent hover:bg-accent-hover text-white rounded px-4 py-2 font-medium">
                    Search
                </button>

            </form>
            
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

            {/* {
                recipes.map((r) => (<li>{r.name}</li>))
            } */}
          { recipes.length < total &&  <div className="text-center mt-8">
                <button
                onClick={()=> fetchRecipes(recipes.length , searchQuery)}
                    type="button"
                    className="bg-accent hover:bg-accent-hover text-white rounded px-6 py-2 font-medium"
                >
                    Load More
                </button>
            </div>}
        </main>
    )
}

export default Home