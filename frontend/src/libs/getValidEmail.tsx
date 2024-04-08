export default async function getValidEmail(email:string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/email?email=${email}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) return true;
    
    return false;

    
}