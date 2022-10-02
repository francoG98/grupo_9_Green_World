import {useEffect, useState} from 'react'

export default function PriceCalculatorCard(){
    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
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
        
        setProducts(products.filter(p=> p.id != idBuscado))
        setProductcalc([...productcalc, product]);
        
        let totalisimo = productcalc.reduce((obj, data) => {obj += data.subtotal; return obj; }, 0)
       
        
        setTotal(totalisimo)
        console.log(totalisimo)
        
        console.log(productcalc)

    }

    
    return(
        <section className="card">
            <h1>GREEN BUY SIMULATOR</h1>
            <form onSubmit={priceCalc}>
                <div>
                    <label for="id">Producto</label>
                    <label for="qty">Cantidad</label>
                </div>
                <select id="id" name="id">
                    {products.map((p, index) => (
                        <option key={index} value={p.id}>
                            {p.name} - ${p.price}
                        </option>
                    ))}
                </select>
                <input type="number" min="0" id="qty" name="qty"></input>
                <button type="submit">Agregar</button>
            </form>
            <ul></ul>

        </section>
    )
}