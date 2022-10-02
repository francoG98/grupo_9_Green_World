import{useState, useEffect} from "react"




export default function CategoriasCard(){
    let [cats,setCats] = useState([])

    useEffect(()=>{
        const catApi = async () =>{
            let request = await fetch("http://localhost:4422/api/products")
            let response = await request.json()
            
            setCats(response.countByCategory)
            
        }
        catApi()
    },[])
    return(
        <section className="card">
            <h1>GREEN CATEGORIES (5)</h1>
           
            <ul className="listaCategorias">
                <li className="titles-categorias">
                <p>Categoría</p>
                <p>Productos</p>
                </li>
                {cats.map((item, index) => (
                    <li className={`catLi-${index%2} lista-categorias`} key={item.id}>
                    <a href={`http://localhost:4422/products/categorias/${item.name}`} target="_blank">
                        <p>{item.name.toUpperCase()}</p>
                        <p>{item.count}    <i className="fa-solid fa-box"></i></p>
                        </a>
                    
                    </li>
                ))}
            </ul>
        </section>
    )

}