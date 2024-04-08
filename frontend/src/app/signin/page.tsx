import UserAccessBlock from "@/components/UserAccessBlock";
import Login from "@/components/Login";


export default function signInPage( {searchParams}: {searchParams?: Record<"error", string>}) {
    return (
        <main className="h-[83vh] flex justify-center items-center">
            <UserAccessBlock>
                <Login error={searchParams?.error}/>
            </UserAccessBlock>
        </main>
    )
}
