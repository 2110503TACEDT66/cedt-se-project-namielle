export default async function userDeleteBooking(token: string, bid: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${bid}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
            authorization: `Bearer ${token}`,
        },
    })

    if (!response.ok) {
        throw new Error("Failed to Delete Booking");
    }
    return await response.json();
}