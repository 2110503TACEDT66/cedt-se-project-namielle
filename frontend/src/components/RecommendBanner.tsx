'use client'

import { Button } from "@mui/material"
import Image from "next/image"
import Link from "next/link";
import { useEffect, useState } from "react";
import getHotels from "@/libs/getHotels";
import RecommendCard from "./RecommendCard";

export default function RecommendBanner() {
    const [hotelData, setHotelData] = useState<any>();
    const [search, setSearch] = useState('');

    //Hotel Ranking
    let rank1 = 0, rank2 = 0, rank3 = 0;
    let sortedArray : any

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const result = await getHotels()
                setHotelData(result);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserData();
        //Calculate Rank
        sortedArray = hotelData?.data.sort((n1: any ,n2: any) => {
            if (n1.bookCount > n2.bookCount) {
                return -1;
            }
    
            if (n1.bookCount < n2.bookCount) {
                return 1;
            }
    
            return 0;
        });
    }, [])

    console.log(sortedArray)

    return (
        <div className="flex flex-row p-1 h-[25vh] bg-stone-400">
            <div className="w-[20%] px-5">
                <p className="font-semibold font-serif text-3xl text-orange-300 leading-loose">Recommended <span className="text-white bold">For you</span></p>
            </div>
            <div className="w-[1%] bg-white text-black">
                T O P 1
            </div>
            {<div className="px-10 w-[55%] h-[100%] relative">
            <Link key={sortedArray[0].name} href={`/hotel/${sortedArray[0].id}`}>
                        <RecommendCard
                            hotelName={sortedArray[0].name}
                            imgSrc={`/img/${sortedArray[0].file}`}
                        />
            </Link>
            </div> }
            <div className="w-1/5 bg-white m-3 text-black">
                Top Hotel 2
            </div>
            <div className="w-1/5 bg-white m-3 text-black">
                Top Hotel 3
            </div>
            <div className="flex flex-row w-[20%] h-[30%] relative">
            </div>
        </div>
    )
}
