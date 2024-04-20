export default async function adminAddHotel(token: string, name: string, address: string, tel: string, capacity: number, file: string, price: number, city: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/hotels`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: name,
            address: address,
            tel: tel,
            capacity: capacity,
            file: file,
            price: price,
            city: city
        })
    })

    if (!response.ok) {
        throw new Error("Add new hotel failed");
    }
    return await response.json();
}
