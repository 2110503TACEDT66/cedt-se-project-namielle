export default async function PostDiscount(name: string, info: string, code: string, percentage: string, image: string, token: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/discounts`, {
        method: "POST",
        mode: "cors",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            info: info,
            code: code,
            percentage: percentage,
            image: image
        })
    })
    if (!response.ok) {
        throw new Error("Failed to post discounts")
    }
    return await response.json();

}
