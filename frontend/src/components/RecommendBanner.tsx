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
    const [sortedArray, setSortedArray] = useState<any[]>([]);

    //Hotel Ranking
    let rank1 = 0, rank2 = 0, rank3 = 0;

    // Add state for sortedArray

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const result = await getHotels();
                setHotelData(result);
                //Calculate Rank
                const sorted = result?.data.sort((n1: any, n2: any) => {
                    if (n1.bookCount > n2.bookCount) {
                        return -1;
                    }

                    if (n1.bookCount < n2.bookCount) {
                        return 1;
                    }

                    return 0;
                });
                setSortedArray(sorted);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserData();
    }, [])

    // Now it's safe to log sortedArray
    useEffect(() => {
        console.log(sortedArray);
    }, [sortedArray])

    return (
        <div className="flex flex-row p-1 h-[25vh] bg-stone-400 ">
            <div className="w-[20%] px-5">
                <p className="font-semibold font-serif text-3xl text-orange-300 leading-loose">Recommended <span className="text-white bold">For you</span></p>
            </div>
            <div className="w-[1%] h-[90%] bg-white text-black flex items-center justify-center mt-[0.5%]">
                T O P 1
            </div>
            {<div className="w-1/5 pr-6 h-[100%] relative mr-[3%] mt-[0.5%]">
                {sortedArray && sortedArray.length > 0 && (
                    <Link key={sortedArray[0].name} href={`/hotel/${sortedArray[0].id}`}>
                        <RecommendCard
                            hotelName={hotelItem.name}
                            imgSrc={`/img/${hotelItem.file}`}
                        />
                    </Link>
                )}
            </div>}
            <div className="w-[1%] h-[90%] bg-white text-black flex items-center justify-center mt-[0.5%]">
                T O P 2
            </div>
            {<div className="w-1/5 pr-6 h-[100%] relative mr-[3%] mt-[0.5%]">
                {sortedArray && sortedArray.length > 0 && (
                    <Link key={sortedArray[1].name} href={`/hotel/${sortedArray[1].id}`}>
                        <RecommendCard
                            hotelName={sortedArray[1].name}
                            imgSrc={`/img/${sortedArray[1].file}`}
                        />
                    </Link>
                )}
            </div>}
            <div className="w-[1%] h-[90%] bg-white text-black flex items-center justify-center mt-[0.5%]">
                T O P 3
            </div>
            {<div className="w-1/5 pr-6 h-[100%] relative mr-[3%] mt-[0.5%]">
                {sortedArray && sortedArray.length > 0 && (
                    <Link key={sortedArray[2].name} href={`/hotel/${sortedArray[2].id}`}>
                        <RecommendCard
                            hotelName={sortedArray[2].name}
                            imgSrc={`/img/${sortedArray[2].file}`}
                        />
                    </Link>
                )}
            </div>}
        </div>
    )
}
