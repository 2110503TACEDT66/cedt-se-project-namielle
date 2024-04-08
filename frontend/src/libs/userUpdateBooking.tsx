export default async function userUpdateBooking(token: string, bid: string, checkInDate: string, checkOutDate: string){
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${bid}`, {
        method: "PUT",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
        })
    })

    if (!response.ok) {
        throw new Error("PUT Failed");
    }
    return await response.json();
}