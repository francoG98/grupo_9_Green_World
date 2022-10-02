export async function categoryCount(){
    try{
        let endpoint = "http://localhost:4422/api/products"
        let query = await fetch(endpoint)
        let data = await query.json()
        return data.countByCategory
    } catch (error){
        console.log(error)
    }
}

