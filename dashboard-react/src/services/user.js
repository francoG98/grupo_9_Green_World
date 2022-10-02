export async function getAll(page){
    try{
        let endpoint = `http://localhost:4422/api/users?page=${page}`
    let query = await fetch(endpoint)
    let data = await query.json()
    return data.users

    } catch(error){
        console.log(error)
    }
}