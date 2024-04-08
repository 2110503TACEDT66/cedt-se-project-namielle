export default async function getHotels(){
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/hotels/`,{mode:'cors'})
    if(!response.ok){
        throw new Error("Fail to Fetch Hotel")
    }
    return await response.json()
}