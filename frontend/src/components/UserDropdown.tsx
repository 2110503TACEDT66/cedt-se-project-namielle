'use client'
import getUserProfile from "@/libs/getUserProfile";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { UserJson } from "../../interface";
import Link from "next/link";

export default function UserDropDown() {
    const [display, setDisplay] = useState("invisible");

    const {data:session} = useSession();

    const [userData, setUserData] = useState<UserJson>();

    useEffect( ()=> {
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
    },[])
    

    return (
        <div className="flex justify-center">
            <Image src={'/img/profile-user.png'} alt='profile' width={0} height={0} sizes='3vh' className='h-[100%] w-auto mx-5 cursor-pointer' onClick={
                ()=>{
                    if (display === 'invisible') setDisplay("visible");
                    else {setDisplay("invisible")};
            }}/>
            
            <div className={display + " bg-white h-5 w-5 absolute top-[60px] right-[90px] rotate-45"}></div>
            <div className={display + " absolute bg-white mt-[48px] py-3 px-6 rounded-xl text-center"}>
            <ul className="">
                <li className="font-bold text-lg leading-none">{userData?.data.name}</li>
                <li className="font-light text-sm text-green-500">{userData?.data.role}</li>
                <li className="font-light text-sm">{userData?.data.email}</li>
                <li className="font-semibold flex justify-center items-center cursor-pointer mt-" onClick={()=>{signOut()}}>
                    <Image src="/img/logout.png" alt="logout" width={0} height={0} className="h-[100%] w-auto object-contain"></Image> Sign Out
                </li>
            </ul>
            </div>
        </div>
    )
}