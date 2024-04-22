export default async function deleteDiscount(token: string, id: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/discounts/${id}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`,
        },
    })
    if (!response.ok) {
        throw new Error("Failed to fetch RoomType")
    }
    return await response.json();
}