'use client'

import { Button } from "@mui/material"
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
        <div className="flex flex-row p-20 h-[83vh] bg-paper">
            <div className="w-[45%] px-20 py-10">
                <p className="font-semibold font-serif text-6xl text-slate-800 leading-loose">Explore your <span className="text-orange-500 bold">world</span>,</p> 
                <p className="font-semibold font-serif text-6xl text-slate-800">One <span className="text-orange-500 bold">stay</span> at a time</p>
                <Link href={'/hotel'}>
                    <button className="w-[40%] h-[10%] my-[15%] mx-[10%] text-2xl text-slate-900 font-bold font-sans bg-orange-500 hover:bg-slate-800 hover:text-orange-500 rounded-2xl">Book Now!</button>
                </Link>
               
            </div>

            <div className="w-[55%] h-[70%] relative">
                <Image src={images[currentIndex]} alt="bannerImage" fill={true} priority className="block obj-cover rounded-2xl"></Image>
            </div>
            
        </div>
    )
}