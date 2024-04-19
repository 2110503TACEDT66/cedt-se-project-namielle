export default async function hideReview(token: string, reviewId: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/review/${reviewId}/hide`, {
        method: "PUT",
        mode: "cors",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    })
    if (!response.ok) {
        throw new Error("Failed to hide/unhide reviews")
    }
    return await response.json();

}
