import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Route, Routes } from 'react-router'
import NotFound from './pages/NotFound'
import RecipeCard from './pages/RecipeCard'
import RecipeDetail from './pages/RecipeDetail'

function App() {
  return (
    <div className="min-h-screen bg-background text-text font-sans">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/recipe/:id' element={<h1> <RecipeDetail/> </h1>}/>
        <Route path ="*" element ={<NotFound/>}/>
      </Routes>

    </div>
  )
}

export default App