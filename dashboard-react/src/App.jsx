import './App.css'
import { Routes, Route, Link} from "react-router-dom"
import Home from "./pages/Home"
import Product from "./pages/Product"


function App() {

  return (
    <div className="mainPage">
      <section className="navSection">
        <div className="info-bar">
          <figure className="figure-image">
            <img src="/imagen-redonda.avif"></img>
          </figure>
          <div>
            <p>Reporte de</p>
            <img className="logo-img" src="http://localhost:4422/assets/logo-blanco-57cc99.svg"></img>
          </div>
          
        </div>
        <nav className="navBar">
          <Link to="/">Home</Link>
          <Link to="/users">Usuarios</Link>
          <Link to="/products">Productos</Link>
        </nav>
      </section>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/products" element={<Product/>}></Route>
      </Routes>
     
      
    </div>
  )
}

export default App
