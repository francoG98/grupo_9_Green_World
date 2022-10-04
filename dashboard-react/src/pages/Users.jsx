import {useState, useEffect} from "react"
import { Link } from "react-router-dom"
import{getAll} from "../services/user"

export default function Users(){
    const [page,setPage]= useState(0)
    const [pages,setPages]= useState(0)
    const [users,setUsers]= useState([])
    const [count,setCount]= useState(0)

    useEffect(()=> {getAll(page).then((data) => {
        setUsers(data)
           
    })},[page])

    useEffect(()=>{
        const countApi = async () =>{
            let request = await fetch("http://localhost:4422/api/users")
            let response = await request.json()
            
            setCount(response.count)
            
        }
        countApi()
    },[])

    useEffect(()=>{
        const pagesApi = async () =>{
            let request = await fetch("http://localhost:4422/api/users")
            let response = await request.json()
            setPages(response.pages)
        }
        pagesApi()
    },[])
 
    const next = ()=>  page == pages? setPage(0):setPage(page+1)
    const prev = ()=>  page==0? setPage(pages):setPage(page-1)
    return(
<>
    {users.map((u)=>(
        <ul key={u.id} className="card">
            <li className="green-title">{u.name}</li>
            <li className="listaUserProds" key={u.id}>
                <img className="cardImage" src={u.image}></img>
                <p className="categoria">{u.email}</p>
                <p className="precio">Cultivo: {u.cultivo.toUpperCase()}</p>
            </li>
        </ul>
            ))}
        <div className="buttons">
            <button className="btnCalc"  onClick={prev}><i class="fa-solid fa-caret-left"></i> Anteriores</button><button className="btnCalc" onClick={next}>Siguientes <i class="fa-solid fa-caret-right"></i></button>
        </div>     

    
</>
            )
        }