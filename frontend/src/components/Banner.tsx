'use client'

import getUserProfile from "@/libs/getUserProfile";
import { useSession } from "next-auth/react";
import Image from "next/image"
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Banner() {

    const images = ["/img/banner1.png", "/img/banner2.jpg", "/img/banner3.png"]
    const [currentIndex, setCurrentIndex] = useState(0);
    const delay = 4000

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length)
        }, delay)

        return () => clearInterval(intervalId);
    }, [])

    const [userData, setUserData] = useState<any>(null);
    const { data: session } = useSession();
    useEffect(() => {
        const fetchData = async () => {
            // console.log(session)
            if (session) {
                const userData = await getUserProfile(session?.user.token);
                setUserData(userData);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-row flex-wrap justify-center items-center gap-x-64 gap-y-36 py-40">
            <div className="flex flex-col justify-center items-center">
                {userData?.data.role == "admin"?
                    <h1 className="font-semibold font-serif text-6xl text-purple-dark dark:text-white-grayish leading-loose text-center mb-8">Do your <span className="text-pink-namielle font-bold">work</span> now!!</h1>
                    :<>
                        <h1 className="font-semibold font-serif text-6xl text-purple-dark dark:text-white-grayish leading-loose text-center mb-8">Explore your <span className="text-pink-sweet font-bold">world</span>,<br />One <span className="text-pink-sweet font-bold">stay</span> at a time</h1>
                        <Link href={'/hotel'}>
                            <button className="w-[200px] h-[50px] text-2xl font-bold font-sans rounded-2xl text-pink-sweet bg-purple-dark hover:bg-pink-sweet hover:text-purple-dark dark:text-white-grayish dark:bg-pink-sweet dark:hover:text-pink-sweet dark:hover:bg-white-grayish">Book Now!</button>
                        </Link>
                    </>
                }

            </div>

            <div className="h-[400px] w-[647px] relative">
                <Image src={images[currentIndex]} alt="bannerImage" fill={true} priority className="object-cover rounded-2xl"></Image>
            </div>
        </div>
    )
}
