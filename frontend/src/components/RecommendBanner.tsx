"use client";

import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import getHotels from "@/libs/getHotels";
import RecommendCard from "./RecommendCard";

export default function RecommendBanner() {
    const [search, setSearch] = useState("");
    const [sortedArray, setSortedArray] = useState<any[]>([]);

    // Add state for sortedArray

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const result = await getHotels();
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
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserData();
    }, []);

    // Now it's safe to log sortedArray
    useEffect(() => {
        // console.log(sortedArray);
    }, [sortedArray]);

    return (
        <div className="flex flex-row items-center gap-[5%] h-[35vh] bg-paper-more-yellow dark:bg-midnight-dark rounded-xl">
            <div className="w-fit px-5 flex flex-col">
                <p className="font-semibold font-serif text-center text-5xl text-purple-namielle leading-loose">
                    Recommended
                </p>
                <span className="text-pink-namielle font-bold text-3xl text-center">For you</span>
            </div>
            <div className="w-full h-[90%]">
                <div className="w-full h-[100%] relative flex items-center">
                    {sortedArray && sortedArray.length > 0 ? (
                        sortedArray.map((hotel, index) => {
                            if(index > 2) return;
                            let AvgReview = 0;
                            if (hotel.review.length) {
                                let sum: number = 0;
                                hotel.review.forEach((item: any) => {
                                    sum += item.stars
                                })
                                AvgReview = sum / hotel.review.length
                            }
                            return (
                                <Link
                                    key={hotel.name}
                                    href={`/hotel/${hotel.id}`}
                                    className="w-[25%] h-full mr-[5%]"
                                >
                                    <RecommendCard
                                        hotelName={hotel.name}
                                        hotelCity={hotel.city}
                                        hotelPrice={hotel.price}
                                        rankImage={`/img/rank/rank${index + 1}.png`}
                                        rating={AvgReview}
                                        count={hotel.review.length}
                                        imgSrc={`${hotel.file}`}
                                    />
                                </Link>
                            )
                        })
                    ) : null
                    }
                </div>
            </div>
        </div>
    );
}
