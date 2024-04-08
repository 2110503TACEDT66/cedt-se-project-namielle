import Image from "next/image"
import CartPanel from "@/components/CartPanel"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

export default async function Cart() {
    const session = await getServerSession(authOptions);

    return (
        <div>
            <div className="flex justify-center items-center text-3xl pt-10">
                <Image src="/img/shopping-cart.png" alt="shopping-cart" width={40} height={40} className="mr-2" />
                Your Cart
            </div>

            {session ?
                <div className="flex flex-row m-20 h-auto min-h-lvh bg-paper min">
                    <CartPanel />
                </div> : <div className="flex justify-center h-auto bg-paper m-10">No item in cart </div>
            }
        </div>
    )
}