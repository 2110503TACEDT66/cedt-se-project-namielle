import Register from "@/components/Register";
import UserAccessBlock from "@/components/UserAccessBlock";



export default function signUpPage() {
    
    return (
        <main className="h-[83vh] flex justify-center items-center">
            <UserAccessBlock>
                <Register/>
            </UserAccessBlock>
        </main>
    )
}
