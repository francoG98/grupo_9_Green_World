import {useState, useEffect} from "react"
import{getAll} from "../services/products"

export default function Product(){
    const [page,setPage]= useState(0)
    const [pages,setPages]= useState(0)
    const [product,setProduct]= useState([])
    const [count,setCount]= useState(0)

    useEffect(()=> {getAll(page).then((data) => {
        setProduct(data)
           
    })},[page])

    useEffect(()=>{
        const countApi = async () =>{
            let request = await fetch("http://localhost:4422/api/products")
            let response = await request.json()
            
            setCount(response.count)
            
        }
        countApi()
    },[])

    useEffect(()=>{
        const pagesApi = async () =>{
            let request = await fetch("http://localhost:4422/api/products")
            let response = await request.json()
            
           
        }
        pagesApi()
    },[])
 
    const next = ()=>  page==pages? setPage(0):setPage(page+1)
    const prev = ()=>  page==0? setPage(pages):setPage(page-1)
    return(
        <div>
            <h3> Product name </h3>
            <p> Product price </p>
            <p> Product category </p>
            <img src="" alt="Imagen de producto"></img>
            <button  onClick={prev}>Prev</button><button onClick={next}>Next</button>
        </div>
    )
}