export default async function getRoomType(token: string, roomType_id: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/roomTypes/${roomType_id}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
    })
    if (!response.ok) {
        throw new Error("Failed to fetch RoomType")
    }
    return await response.json();
}