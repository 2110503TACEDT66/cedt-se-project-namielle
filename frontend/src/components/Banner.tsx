'use client'

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

    return (
        <div className="flex flex-row flex-wrap justify-center items-center gap-x-64 gap-y-36 py-40">
            <div className="flex flex-col justify-center items-center">
                <h1 className="font-semibold font-serif text-6xl text-slate-800 leading-loose text-center mb-8">Explore your <span className="text-pink-500 font-bold">world</span>,<br/>One <span className="text-pink-500 font-bold">stay</span> at a time</h1>

                <Link href={'/hotel'}>
                    <button className="w-[200px] h-[50px] text-2xl text-pink-500 font-bold font-sans bg-slate-800 hover:bg-pink-500 hover:text-slate-800 rounded-2xl">Book Now!</button>
                </Link>
            </div>

            <div className="h-[400px] w-[647px] relative">
                <Image src={images[currentIndex]} alt="bannerImage" fill={true} priority className="object-cover rounded-2xl"></Image>
            </div>
        </div>
    )
}
