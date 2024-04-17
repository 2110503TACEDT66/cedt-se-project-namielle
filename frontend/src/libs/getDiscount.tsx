export default async function getDiscount(id: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/discounts/${id}`, {
        method: "GET",
        mode: "cors",
    })
    if (!response.ok) {
        throw new Error("Failed to fetch Discount")
    }
    return await response.json();
}