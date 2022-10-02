import {useState, useEffect} from "react"

export default function Product(){
    const [page,setPage]= useState(0)
    const [pages,setPages]= useState(0)
    const [product,setProduct]= useState([])
    const [count,setCount]= useState(0)

    useEffect(()=>{
        const productApi = async(page)=>{
            let request = await fetch(`http://localhost:4422/api/products?page=${page}`)
            let response = await request.json()   
            setProduct(response.product) 
            setPages(response.pages)
            setCount(response.count)
        }
        productApi()
        console.log(product)
        console.log(pages)
        console.log(count)
    },[page])

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