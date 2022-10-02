import {  } from 'react'
import './App.css'
import { Routes, Route, Link} from "react-router-dom"
import Product from "./components/Product"

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/products" element={<Product/>} ></Route>
      </Routes>
    </div>
  )
}

export default App
