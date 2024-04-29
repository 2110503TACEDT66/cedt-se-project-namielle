'use client'
import getUserProfile from "@/libs/getUserProfile";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image"
import { useEffect, useState } from "react"
import { UserJson } from "../../interface";
import { useRouter } from "next/navigation";

export default function UserDropDown() {
    const [display, setDisplay] = useState("invisible");

    const { data: session } = useSession();

    const [userData, setUserData] = useState<UserJson>();
    const Router = useRouter();

    useEffect(() => {
        if (!session || !session.user.token) return;
        const fetchUserData = async () => {
            try {
                const result = await getUserProfile(session.user.token)
                setUserData(result);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserData();
    }, [])


    return (
        <div className="flex justify-center">
            <Image src={'/img/profile-user.png'} alt='profile' width={0} height={0} sizes='3vh' className='h-[100%] w-auto mx-5 cursor-pointer dark:invert' onClick={
                () => {
                    if (display === 'invisible') setDisplay("visible");
                    else { setDisplay("invisible") };
                }} />

            <div className={display + " bg-white h-5 w-5 absolute top-[60px] right-[90px] rotate-45"}></div>
            <div className={display + " absolute bg-white mt-[48px] py-3 px-6 rounded-xl text-center"}>
                <ul className="">
                    <li className="font-bold text-lg leading-none">{userData?.data.name}</li>
                    {userData?.data.role == "admin"?
                        <li className="text-red-500 font-bold">{userData?.data.role}</li>:
                        <li className="text-green-500 font-light">{userData?.data.role}</li>
                    }
                    <li className="font-light text-sm">{userData?.data.email}</li>
                    {userData?.data.role == "admin"?
                    <div className="my-2">
                        <div className="underline font-bold">Admin Manage</div>
                        <li className="font-semibold hover:font-black text-sm flex justify-center items-center cursor-pointer hover:text-pink-600" onClick={() => { Router.push('/editdiscount') }}>
                            Create Discount
                        </li>
                        <li className="font-semibold hover:font-black text-sm flex justify-center items-center cursor-pointer hover:text-pink-600" onClick={() => { Router.push('/hotel/addnewhotel') }}>
                            Add New Hotel
                        </li>
                        <li className="font-semibold hover:font-black text-sm flex justify-center items-center cursor-pointer hover:text-pink-600" onClick={() => { Router.push('/hotel/addnewroomtype') }}>
                            Add New Roomtype
                        </li>
                        <li className="font-semibold hover:font-black text-sm flex justify-center items-center cursor-pointer hover:text-pink-600" onClick={() => { Router.push('/addrecommended') }}>
                            Recommended
                        </li>
                       
                    </div>
                    :""}

                    <li className="font-semibold flex justify-center items-center cursor-pointer mt-" onClick={() => { signOut() }}>
                        <Image src="/img/logout.png" alt="logout" width={0} height={0} className="h-[100%] w-auto object-contain"></Image> Sign Out
                    </li>
                </ul>
            </div>
        </div>
    )
}
