export default async function UpdateHotel(token: string, hid: string, priority: number) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/hotels/${hid}`, {
        method: "PUT",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            priority: priority,
        })
    })

    if (!response.ok) {
        throw new Error("PUT Failed");
    }
    return await response.json();
}
