"use client";

import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import getHotels from "@/libs/getHotels";
import RecommendCard from "./RecommendCard";

export default function RecommendBanner() {
    const [hotelData, setHotelData] = useState<any>();
    const [search, setSearch] = useState("");
    const [sortedArray, setSortedArray] = useState<any[]>([]);

    // Add state for sortedArray

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const result = await getHotels();
                setHotelData(result);
                //Calculate Rank
                const sorted = result?.data.sort((n1: any, n2: any) => {
                    if (n1.priority > n2.priority) {
                        return -1;
                    }
                    if (n1.priority < n2.priority) {
                        return 1;
                    }

                    if (n1.bookCount > n2.bookCount) {
                        return -1;
                    }

                    if (n1.bookCount < n2.bookCount) {
                        return 1;
                    }

                    return 0;
                });

                setSortedArray(sorted);
                console.log(sorted);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserData();
    }, []);

    // Now it's safe to log sortedArray
    useEffect(() => {
        console.log(sortedArray);
    }, [sortedArray]);

    return (
        <div className="flex flex-row items-center content-between gap-[5%] h-[30vh] bg-stone-400 ">
            <div className="w-fit px-5 flex flex-col">
                <p className="font-semibold font-serif text-3xl text-orange-300 leading-loose">
                    Recommended
                </p>
                <span className="text-white bold text-lg">For you</span>
            </div>
            {[1, 2, 3].map((count) => 
                (
                    <div className="Card1 w-[20%] h-[90%] flex items-center">
                        {/* <div className="w-[5%] h-[100%] bg-white text-pink-sweet font-bold flex items-center flex-col justify-center">
                            <div>T</div>
                            <div>O</div>
                            <div>P</div>
                            <div>{count}</div>
                        </div> */}
                        {
                            <div className="w-full h-[100%] relative flex items-center flex-col">
                                {sortedArray && sortedArray.length > 0 && (
                                    <Link
                                        key={sortedArray[count].name}
                                        href={`/hotel/${sortedArray[count].id}`}
                                        className="w-full h-full"
                                    >
                                        <RecommendCard
                                            hotelName={sortedArray[count].name}
                                            hotelCity={sortedArray[count].city}
                                            hotelPrice={sortedArray[count].price}
                                            rankImage={`/img/rank/rank${count}.png`}
                                            imgSrc={`/img/${sortedArray[count].file}`}
                                        />
                                    </Link>
                                )}
                            </div>
                        }
                    </div>
                ))

            }
        </div>
    );
}
