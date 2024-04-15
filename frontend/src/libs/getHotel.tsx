export default async function getHotel(id: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/hotels/${id}`, {
        method: "GET",
        mode: "cors",
    })
    if (!response.ok) {
        throw new Error("Failed to fetch Hotel")
    }
    return await response.json();
}