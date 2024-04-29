export default async function deleteDiscount(id: string, token: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/discounts/${id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
            authorization: `Bearer ${token}`,
        },
    })
    if (!response.ok) {
        throw new Error("Failed to delete discountcode")
    }
    return await response.json();
}