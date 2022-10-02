import {useState, useEffect} from "react"
const [page,setPage]= useState(1)
const next = ()=>  page==42? setPage(1):setPage(page+1)
const prev = ()=>  page==1? setPage(42):setPage(page-1)

export default function Product(){
    return(
        <div>
            <h3> Product name </h3>
            <p> Product price </p>
            <p> Product category </p>
            <img src="/assets/react.svg" alt="Imagen de producto" width="50%"></img>
            <button  onClick={prev}>Prev</button><button onClick={next}>Next</button>
        </div>
    )
}