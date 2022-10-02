import {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import CategoriasCard from "../components/CategoriasCard"
import UsuariosCard from "../components/UsuariosCard"
import ProductosCard from "../components/ProductosCard"

export default function Home(){

    return(
        <>
         <CategoriasCard/>
         <UsuariosCard/>
         <ProductosCard/>
        </>
    )
}