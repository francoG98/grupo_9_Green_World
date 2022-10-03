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
    
        }
        pagesApi()
    },[])
 
    const next = ()=>  page==pages? setPage(0):setPage(page+1)
    const prev = ()=>  page==0? setPage(pages):setPage(page-1)
    return(
        <ul>
            <button  onClick={prev}>Prev</button><button onClick={next}>Next</button>
            {users.map((u)=>(
                <li className="card"  key={u.id}>
                    <p>{u.name}</p>
                    <p>{u.email}</p>
                    <img src={u.image}></img>
                    <p>{u.cultivo}</p>
                </li>
            ))}

        </ul>
            )
        }