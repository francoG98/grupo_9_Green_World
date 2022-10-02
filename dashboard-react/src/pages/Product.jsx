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
            setPages(response.pages)
           
        }
        pagesApi()
    },[])
 

    const next = ()=>  page==pages? setPage(0):setPage(page+1)
    const prev = ()=>  page==0? setPage(pages):setPage(page-1)
    return(
<ul>
    {product.map((p)=>(
        <li className="card"  key={p.id}>
        <a target="_blank" href={`http://localhost:4422/products/detail/${p.id}`}>
            <p>{p.name}</p>
            <p>${p.price}.00</p>
            <img src={p.image}></img>
            <p>{p.category}</p>
        </a>
        </li>
    ))}

</ul>
    )
}