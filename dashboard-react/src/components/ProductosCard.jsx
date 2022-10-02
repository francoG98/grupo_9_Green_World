import{useState, useEffect} from "react"

export default function ProductosCard(){
    let [prods,setProds] = useState([])
    let[count,setCount] = useState(0)

    useEffect(()=>{
        const productApi = async () =>{
            let request = await fetch("http://localhost:4422/api/lastProducts")
            let response = await request.json()   
            setProds(response.products) 
        }
        productApi()
    },[])
    useEffect(()=>{
        const countApi = async () =>{
            let request = await fetch("http://localhost:4422/api/lastProducts")
            let response = await request.json()
            
            setCount(response.count)
            
        }
        countApi()
    },[])
    return(
        <section className="card">
        <h1>GREEN PRODUCTS ({count})</h1>
       
        <ul className="listaCategorias">
            <li className="titles-categorias">
            <p>Últimos Registros</p>
            <p>Precio</p>
            </li>
            {prods.map((item, index) => (
                <li className={`catLi-${index%2} lista-categorias`} key={item.id}>
                <a href={`http://localhost:4422/products/detail/${item.id}`}>
                    <p>{item.name}</p>
                    <p>${item.price}.00</p>
                    </a>
                
                </li>
            ))}
        </ul>
    </section>
    )
}

