'use client'

import Link from "next/link";
import HotelCard from "./HotelCard";
import { useState, useEffect } from "react";
import getHotels from "@/libs/getHotels";
import DateBooker from "./DateBooker";
import dayjs, { Dayjs } from "dayjs";

export default function HotelCatalog({ hotelJson }: { hotelJson: any }) {
    const [hotelData, setHotelData] = useState<any>();
    const [search, setSearch] = useState('');
    const [persons, setPersons] = useState(0);
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
    
    // console.log(search);

    return (
        <div className="justify-center item-center">
            <div className="container mx-auto my-8 p-4 rounded-lg shadow-md block">
                <div className="flex flex-row justify-center">
                    <div className="m-1 w-[60%]">
                        <h2 className="text-lg font-semibold text-gray-800">Search Your Hotels</h2>
                        <input
                            type="text"
                            id="search"
                            name="search"
                            placeholder="Search..."
                            onChange={(e) => setSearch(e.target.value)}
                            className="input input-bordered text-l p-2 mr-[2%] w-[100%] h-[65%] border-solid border border-gray-400 rounded-md"
                        />
                    </div>
                    <div className="m-1 w-[10%]">
                        <h2 className="text-lg font-semibold text-gray-800">Persons</h2>
                        <input type="number" id="persons" name="persons" placeholder="Persons" className="input input-bordered text-l p-2 w-[100%] h-[65%] border-solid border border-gray-400 rounded-md" onChange={(e) => setPersons(Number(e.target.value)) }/>
                    </div>
                </div>
                <div className="items-center justify-center">
                    <h1 className="">
                        Your result {hotelData?.data.filter((hotelItem: any) => {
                    return (search.toLowerCase() === '') ? hotelItem : hotelItem.name.toLowerCase().includes(search)
                    }).filter((hotelItem: any) => {
                        for(let i = 0; i < hotelItem.roomType.length; i++) {
                            if(hotelItem.roomType[i].roomLimit >= persons) {
                                return hotelItem;
                            }
                        }
                    }).length}
                    </h1>
                </div>
                {hotelData?.data.filter((hotelItem: any) => {
                    return (search.toLowerCase() === '') ? hotelItem : hotelItem.name.toLowerCase().includes(search)
                }).filter((hotelItem: any) => {
                    for(let i = 0; i < hotelItem.roomType.length; i++) {
                        if(hotelItem.roomType[i].roomLimit >= persons) {
                            return hotelItem;
                        }
                    }
                }).map((hotelItem: any) => (
                    <Link key={hotelItem.name} href={`/hotel/${hotelItem.id}`}>
                        <HotelCard
                            hotelName={hotelItem.name}
                            imgSrc={`/img/${hotelItem.file}`}
                            hotelAddress={hotelItem.address}
                            hotelTel={hotelItem.tel}
                            roomType={hotelItem.roomType}
                            persons={persons}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}
