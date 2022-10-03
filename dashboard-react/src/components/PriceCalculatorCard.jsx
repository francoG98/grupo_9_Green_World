import {useEffect, useState} from 'react'

export default function PriceCalculatorCard(){
    const [products, setProducts] = useState([])
    let [total, setTotal] = useState(0)
    const [productcalc,setProductcalc]= useState([])
    //FALTA TERMINAR

    useEffect(()=>{
        const productApi = async () =>{
            let request = await fetch("http://localhost:4422/api/products/priceCalculator")
            let response = await request.json()   
            setProducts(response) 
            console.log(products)
        }
        productApi()
    },[])

    const priceCalc = e =>{
        e.preventDefault()
        let idBuscado = e.target.elements.id.value
        let cantidad = e.target.elements.qty.value
        let product = products.filter(p=> p.id == idBuscado)
        
        product = product.map(p=>{
            let data = {
                id:p.id,
                name:p.name,
                price:p.price,
                cant:parseInt(cantidad),
                subtotal: parseInt(cantidad * p.price)
            } 
            return data
        })
        setTotal(total+= product[0].subtotal)
        
        setProducts(products.filter(p=> p.id != idBuscado))
        let joined = productcalc.concat(Object.assign({},product))
        setProductcalc(joined);
        
       
       
        
        
        console.log(total)
        
        console.log(productcalc)

    }

    
    return(
        <section className="card">
            <h1>GREEN BUY SIMULATOR</h1>
            <form onSubmit={priceCalc}>
                <div>
                    <label htmlFor="id">Producto</label>
                    <label htmlFor="qty">Cantidad</label> 
                </div>
                <select id="id" name="id">
                    {products.map((p, index) => (
                        <option key={index} value={p.id}>
                            {p.name} - ${p.price}
                        </option>
                    ))}
                </select>
                <input type="number" min="1" id="qty" name="qty"></input>
                <button type="submit">Agregar</button>
            </form>

            <ul>
            {productcalc.map((item, index) => (
                <li className={`catLi-${index%2} lista-categorias`} key={item[0].id}>
                
                    <p>{item[0].name}</p>
                    <p>${item[0].subtotal}.00</p>
                    
                
                </li>
            ))}

            </ul>

        </section>
    )
}