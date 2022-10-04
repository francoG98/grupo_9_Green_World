import{useState, useEffect} from "react"
import {Link} from "react-router-dom"

export default function UsuariosCard(){
    let [users,setUsers] = useState([])
    let[count,setCount] = useState(0)

    useEffect(()=>{
        const userApi = async () =>{
            let request = await fetch("http://localhost:4422/api/lastUsers")
            let response = await request.json()
            
            
            setUsers(response.users)
            
            
        }
        userApi()

       
    },[])
    useEffect(()=>{
        const countApi = async () =>{
            let request = await fetch("http://localhost:4422/api/lastUsers")
            let response = await request.json()
            
            setCount(response.count)
            
        }
        countApi()
    },[])
    return(
        <section className="card">
            <h1>GREEN USERS ({count})</h1>
           
            <ul className="listaCategorias">
                <li className="titles-categorias">
                <p>Últimos Registros</p>
                <p>Preferencia</p>
                </li>
                {users.map((item, index) => (
                    <li className={`catLi-${index%2} lista-categorias`} key={item.id}>
                    <div >
                        <p>{item.name}</p>
                        <p>{item.cultivo}</p>
                        </div>
                    
                    </li>
                ))}
            </ul>
        </section>
    )

}