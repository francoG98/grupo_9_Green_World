export async function getAll(page){
    try{
        let endpoint = `http://localhost:4422/api/products?page=${page}`
    let query = await fetch(endpoint)
    let data = await query.json()
    return data.products

    } catch(error){
        console.log(error)
    }
}