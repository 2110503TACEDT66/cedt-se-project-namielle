import Image from "next/image"
import CartPanel from "@/components/CartPanel"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

export default async function Cart() {
    const session = await getServerSession(authOptions);

    return (
        <div>
            <div className="flex justify-center items-center text-3xl pt-10 dark:text-white-grayish">
                <Image src="/img/shopping-cart.png" alt="shopping-cart" width={40} height={40} className="mr-2 dark:bg-white-grayish rounded-md" />
                Your Cart
            </div>

            {session ?
                <div className="flex flex-row mt-12 h-[70vh]">
                    <CartPanel />
                </div> : <div className="flex justify-center h-auto m-10 dark:text-white-grayish">No item in cart </div>
            }
        </div>
    )
}
