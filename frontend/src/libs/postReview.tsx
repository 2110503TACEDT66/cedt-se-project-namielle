export default async function PostReview(hotel:string, token:string, stars:number, description:string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/hotels/${hotel}/reviews`, {
        method: "POST",
        mode: "cors",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            stars: stars,
            description: description
        })
    })
    if (!response.ok) {
        throw new Error("Failed to post reviews")
    }
    return await response.json();

}