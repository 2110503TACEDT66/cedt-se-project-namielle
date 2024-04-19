export default async function getDiscounts() {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/discounts/`, {
        method: "GET",
        mode: "cors",
    })
    if (!response.ok) {
        throw new Error("Fail to Fetch Discount")
    }
    return await response.json()
}
