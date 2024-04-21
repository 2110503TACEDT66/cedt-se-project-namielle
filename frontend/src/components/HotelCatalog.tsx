'use client'

import Link from "next/link";
import HotelCard from "./HotelCard";
import React, { useState, useEffect } from "react";
import getHotels from "@/libs/getHotels";
import { Box, Slider } from "@mui/material";

function valuetext(value: number) {
    return `THB ${value}`;
}


export default function HotelCatalog({ hotelJson }: { hotelJson: any }) {
    const [hotelData, setHotelData] = useState<any>();
    const [search, setSearch] = useState('');
    const [persons, setPersons] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [value1, setValue1] = React.useState<number[]>([0, 0]);
    const minDistance = 100;

    const formatter = new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
    });

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

    useEffect(() => {  
        if (hotelData) {
            let max = 0;
            hotelData.data.forEach((hotelItem: any) => {
                for (let i = 0; i < hotelItem.roomType.length; i++) {
                    if (hotelItem.roomType[i].price > max) {
                        max = hotelItem.roomType[i].price;
                    }
                }
            });
            setMaxPrice(max);
            setValue1([0, max]);
        }
    }, [hotelData])
   
    const handleChange1 = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (activeThumb === 0) {
            setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
        }
    };

    return (
        <div className="justify-center item-center">
            <div className="container mx-auto my-8 p-4 rounded-lg shadow-md block">
                <div className="flex flex-row justify-center">
                    <div className="m-1 w-[50%]">
                        <h2 className="text-lg font-semibold text-gray-800">Search Your Hotels</h2>
                        <input
                            type="text"
                            id="search"
                            name="search"
                            placeholder="Search..."
                            onChange={(e) => setSearch(e.target.value)}
                            className="input input-bordered text-l p-2 mr-[2%] w-[100%] h-[65%] border-solid border border-gray-400 rounded-md bg-white"
                        />
                    </div>
                    <div className="m-1 w-[10%]">
                        <h2 className="text-lg font-semibold text-gray-800">Persons</h2>
                        <input type="number" id="persons" name="persons" placeholder="Persons" min={0} className="bg-white input input-bordered text-l p-2 w-[100%] h-[65%] border-solid border border-gray-400 rounded-md" onChange={(e) => setPersons(Number(e.target.value))} />
                    </div>
                    <div className="m-1 w-[20%]">
                        <div className="flex flex-row justify-between">
                            <h2 className="text-lg font-semibold text-gray-800">Price</h2>
                            <span className="text-sm text-gray-800">{formatter.format(value1[0]).replace('฿', 'THB ')} - {formatter.format(value1[1]).replace('฿', 'THB ')}</span>
                        </div>
                        <div className="bg-white input input-bordered text-l p-2 w-[100%] h-[65%] border-solid border border-gray-400 rounded-md">
                            <div className="ml-3 mr-3">
                                <Box>
                                    <Slider
                                        getAriaLabel={() => 'Price range slider'}
                                        min={0}
                                        max={maxPrice}
                                        value={value1}
                                        onChange={handleChange1}
                                        valueLabelDisplay="auto"
                                        getAriaValueText={valuetext}
                                        color="secondary"
                                        step={100}
                                        disableSwap
                                    />
                                </Box>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <h1 className="text-lg pt-2 font-semibold text-center font-black ">
                        {hotelData?.data.filter((hotelItem: any) => {
                            return (search.toLowerCase() === '') ? hotelItem : hotelItem.name.toLowerCase().includes(search.toLowerCase()) || hotelItem.city.toLowerCase().includes(search.toLowerCase())
                        }).filter((hotelItem: any) => {
                            for (let i = 0; i < hotelItem.roomType.length; i++) {
                                if (hotelItem.roomType[i].personLimit >= persons && hotelItem.roomType[i].price >= value1[0] && hotelItem.roomType[i].price <= value1[1]) {
                                    return hotelItem;
                                }
                            }
                        }).length != 0 ? `You found ${hotelData?.data.filter((hotelItem: any) => {
                            return (search.toLowerCase() === '') ? hotelItem : hotelItem.name.toLowerCase().includes(search.toLowerCase()) || hotelItem.city.toLowerCase().includes(search.toLowerCase())
                        }).filter((hotelItem: any) => {
                            for (let i = 0; i < hotelItem.roomType.length; i++) {
                                if (hotelItem.roomType[i].personLimit >= persons && hotelItem.roomType[i].price >= value1[0] && hotelItem.roomType[i].price <= value1[1]) {
                                    return hotelItem;
                                }
                            }
                        }).length} hotels.` : "No matching hotels found."}
                    </h1>
                </div>
                {hotelData?.data.filter((hotelItem: any) => {
                    return (search.toLowerCase() === '') ? hotelItem : hotelItem.name.toLowerCase().includes(search.toLowerCase()) || hotelItem.city.toLowerCase().includes(search.toLowerCase())
                }).filter((hotelItem: any) => {
                    for (let i = 0; i < hotelItem.roomType.length; i++) {
                        if (hotelItem.roomType[i].personLimit >= persons && hotelItem.roomType[i].price >= value1[0] && hotelItem.roomType[i].price <= value1[1]) {
                            return hotelItem;
                        }
                    }
                }).map((hotelItem: any) => (
                    <Link key={hotelItem.name} href={`/hotel/${hotelItem.id}`}>
                        <HotelCard
                            hotelName={hotelItem.name}
                            imgSrc={`/img/${hotelItem.file}`}
                            hotelCity={hotelItem.city}
                            hotelAddress={hotelItem.address}
                            hotelTel={hotelItem.tel}
                            roomType={hotelItem.roomType}
                            persons={persons}
                            minPrice={value1[0]}
                            maxPrice={value1[1]}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}
