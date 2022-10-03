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
<>
    {product.map((p)=>(
    <ul className="card">
        <li className="green-title">{p.name}</li>
        <li className="listaCategorias" key={p.id}>
            <a target="_blank" href={`http://localhost:4422/products/detail/${p.id}`}>
                <img className="cardImage" src={p.image}></img>
            </a>
            <p className="categoria">Categoría: {p.category.toUpperCase()}</p>
            <p className="precio">${p.price}.00</p>
        </li>
    </ul>
    ))}
    <button  onClick={prev}>Prev</button><button onClick={next}>Next</button>
</>

    )
}