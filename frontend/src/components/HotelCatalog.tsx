'use client'

import Link from "next/link";
import HotelCard from "./HotelCard";
import { useState, useEffect } from "react";
import getHotels from "@/libs/getHotels";

export default function HotelCatalog({ hotelJson }: { hotelJson: any }) {
    const [hotelData, setHotelData] = useState<any>();
    const [search, setSearch] = useState('');

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
    }, [])

    console.log(search);
    console.log(hotelData);

    return (
        <div className="justify-center item-center">
            <div className="container mx-auto my-8 p-4 rounded-lg shadow-md block">
                <div className="block ml-[20%]">
                    <input
                        type="text"
                        id="search"
                        name="search"
                        placeholder="Enter Hotel Name"
                        onChange={(e) => setSearch(e.target.value)}
                        className="input input-bordered w-[70%] text-l p-2 m-[2%]"
                    />
                    <input
                        type="text"
                        id="search_city"
                        name="search_city"
                        placeholder="Enter Destination"
                        className="input input-bordered w-[70%] text-l p-2 m-[2%]"
                    />
                </div>
                {hotelData?.data.filter((hotelItem: any) => {
                    return search.toLowerCase() === '' ? hotelItem : hotelItem.name.toLowerCase().includes(search)
                }).map((hotelItem: any) => (
                    <Link key={hotelItem.name} href={`/hotel/${hotelItem.id}`}>
                        <HotelCard
                            hotelName={hotelItem.name}
                            imgSrc={`/img/${hotelItem.file}`}
                            hotelAddress={hotelItem.address}
                            hotelTel={hotelItem.tel}
                            hotelPrice={hotelItem.price}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}
