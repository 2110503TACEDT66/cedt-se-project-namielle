import Image from "next/image";
import CardTemplate2 from "./CardTemplate2";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState,useEffect } from "react";
import deleteDiscount from "@/libs/deleteDiscount";
import getUserProfile from "@/libs/getUserProfile";

export default function DiscountCard({ discountid ,discountName,/* imgSrc,*/ discountcode, discountinfo }: { discountid: string ,discountName: string,/* imgSrc: string,*/ discountcode: string, discountinfo: string}) {

    const [userData, setUserData] = useState<any>(null);
    const {data: session} = useSession();
    const router = useRouter();
    const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!session) return;
        await deleteDiscount( discountid, session.user.token);
        //console.log("Discount deleted. Refreshing page...");
        router.refresh();
        window.location.reload();
    }

    useEffect(() => {
        const fetchData = async () => {
            if (session) {
                const userData = await getUserProfile(session?.user.token);
                setUserData(userData);
            }
        };

        fetchData();
    }, []);

    return (
        userData?.data.role === 'admin' ?
        <CardTemplate2 contentName={discountName}>
            
            <div className='w-full h-[60%] relative rounded-t-lg'>
                
            </div>
            <div className='w-full h-[40%] p-[10px]'>
                {discountName}
                <div>
                    <div className="w-full px-[5%] pt-[2%] ">
                        Info: {discountinfo}
                    </div>
                    <div className="w-full px-[5%] pt-[2%] ">
                        Code: {discountcode}
                    </div>
                </div>
            </div>
            <form onSubmit={handleSumbit}>
                <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 "
                style={{ margin: '10px' }}
                        >Delete</button>
            </form>
        </CardTemplate2 >
        :
        <CardTemplate2 contentName={discountName}>
            
            <div className='w-full h-[60%] relative rounded-t-lg'>
                
            </div>
            <div className='w-full h-[40%] p-[10px]'>
                {discountName}
                <div>
                    <div className="w-full px-[5%] pt-[2%] ">
                        Info: {discountinfo}
                    </div>
                    <div className="w-full px-[5%] pt-[2%] ">
                        Code: {discountcode}
                    </div>
                </div>
            </div>
        </CardTemplate2 >
    )
}

/*<div className="w-1/3 relative rounded-t-lg">
<Image src={imgSrc} alt={discountName} fill={true} className="object-cover" />
</div>*/

/*
<div className="block w-full text-black">
                <div className="w-full font-bold px-[4%] pt-[2%] ">
                    {discountName}
                </div>
                <div className="w-full px-[4%] pt-[2%] ">
                    Info: {discountinfo}
                </div>
                <div className="w-full px-[4%] pt-[2%] ">
                    Code: {discountcode}
                </div>
            </div>
*/