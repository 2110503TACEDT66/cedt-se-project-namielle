'use client'

import Link from "next/link";
import HotelCard from "./HotelCard";
import React, { useState, useEffect } from "react";
import getHotels from "@/libs/getHotels";
import { Box, Slider } from "@mui/material";

function valuetext(value: number) {
    return `THB ${value}`;
}

const formatter = new Intl.NumberFormat("th-TH", {
    style: "currency",
    currencyDisplay: "code",
    currency: "THB",
});

export default function HotelCatalog({ hotelJson }: { hotelJson: any }) {
    const [hotelData, setHotelData] = useState<any>();
    const [search, setSearch] = useState('');
    const [persons, setPersons] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [value1, setValue1] = React.useState<number[]>([0, 0]);
    const minDistance = 0;

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
            <div className="container mx-auto my-8 p-4 rounded-lg shadow-md block bg-paper-yellow dark:bg-midnight-dark">
                <div className="flex flex-row justify-center">
                    <div className="m-1 w-[80%]">
                        <h2 className="text-lg font-semibold text-gray-sweet dark:text-white-grayish">Search Your Hotels</h2>
                        <input
                            type="text"
                            id="search"
                            name="search"
                            placeholder="Search..."
                            onChange={(e) => setSearch(e.target.value)}
                            className="input input-bordered text-sm p-2 mr-[2%] w-[100%] h-[65%] border-solid border border-gray-400 rounded-md bg-paper-more-yellow dark:bg-midnight-blue dark:text-gray-200"
                        />
                    </div>
                </div>
                
                <div className="flex flex-row justify-center mt-2">
                    <div className="m-1 w-[25%]">
                        <div className="flex flex-row justify-between">
                            <span className="text-sm font-semibold text-gray-sweet dark:text-white-grayish">PRICE: {formatter.format(value1[0])} - {formatter.format(value1[1])}</span>
                        </div>
                        <div className="input input-bordered text-sm p-2 mr-[2%] w-[100%] h-[65%] border-solid border border-`gray-400 rounded-md bg-paper-more-yellow dark:bg-midnight-blue">
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
                    <div className="m-1 w-[10%]">
                        <h2 className="text-sm font-semibold text-gray-sweet dark:text-white-grayish">Min</h2>
                        <input
                            type="number"
                            id="search"
                            name="search"
                            placeholder={`${formatter.format(value1[0])}`}
                            min={0}
                            onChange={(e) => setValue1([Number(e.target.value), value1[1]])}
                            className="input input-bordered text-sm p-2 mr-[2%] w-[100%] h-[65%] border-solid border border-gray-400 rounded-md bg-paper-more-yellow dark:bg-midnight-blue dark:text-gray-200"
                        />
                    </div>
                    <div className="m-1 w-[10%]">
                        <h2 className="text-sm font-semibold text-gray-sweet dark:text-white-grayish">Max</h2>
                        <input
                            type="number"
                            id="search"
                            name="search"
                            placeholder={`${formatter.format(value1[1])}`}
                            min={0}
                            onChange={(e) => setValue1([value1[0], Number(e.target.value)])}
                            className="input input-bordered text-sm p-2 mr-[2%] w-[100%] h-[65%] border-solid border border-gray-400 rounded-md bg-paper-more-yellow dark:bg-midnight-blue dark:text-gray-200"
                        />
                    </div>
                    <div className="m-1 w-[10%]">
                        <h2 className="text-sm font-semibold text-gray-sweet dark:text-white-grayish">Persons</h2>
                        <input
                            type="number"
                            id="persons"
                            name="persons"
                            placeholder="Persons"
                            min={0}
                            onChange={(e) => setPersons(Number(e.target.value))}
                            className="input input-bordered text-sm p-2 mr-[2%] w-[100%] h-[65%] border-solid border border-gray-400 rounded-md bg-paper-more-yellow dark:bg-midnight-blue dark:text-gray-200"
                        />
                    </div>
                </div>

                <div className="text-center">
                    <h1 className="text-lg pt-2 text-center font-black text-purple-dark dark:text-white-grayish">
                    {hotelData?.data.filter((hotelItem: any) => {
                            return (search.toLowerCase() === '') ? hotelItem : hotelItem.name.toLowerCase().includes(search.toLowerCase()) || hotelItem.city.toLowerCase().includes(search.toLowerCase())
                        }).filter((hotelItem: any) => {
                            if ((hotelItem.roomType.length === 0 && persons == 0 && value1[1] != 0)) return hotelItem;
                            else {
                                for (let i = 0; i < hotelItem.roomType.length; i++) {
                                    if (hotelItem.roomType[i].personLimit >= persons && hotelItem.roomType[i].price >= value1[0] && hotelItem.roomType[i].price <= value1[1]) {
                                        return hotelItem;
                                    }
                                }
                            }
                            
                        }).length != 0 ? `You found ${hotelData?.data.filter((hotelItem: any) => {
                            return (search.toLowerCase() === '') ? hotelItem : hotelItem.name.toLowerCase().includes(search.toLowerCase()) || hotelItem.city.toLowerCase().includes(search.toLowerCase())
                        }).filter((hotelItem: any) => {
                            if ((hotelItem.roomType.length === 0 && persons == 0 && value1[1] != 0)) return hotelItem;
                            else {
                                for (let i = 0; i < hotelItem.roomType.length; i++) {
                                    if (hotelItem.roomType[i].personLimit >= persons && hotelItem.roomType[i].price >= value1[0] && hotelItem.roomType[i].price <= value1[1]) {
                                        return hotelItem;
                                    }
                                }
                            }
                            
                        }).length} hotels.` : "No matching hotels found."}
                    </h1>
                </div>
                {hotelData?.data.filter((hotelItem: any) => {
                            return (search.toLowerCase() === '') ? hotelItem : hotelItem.name.toLowerCase().includes(search.toLowerCase()) || hotelItem.city.toLowerCase().includes(search.toLowerCase())
                        }).filter((hotelItem: any) => {
                            if ((hotelItem.roomType.length === 0 && persons == 0 && value1[1] != 0)) return hotelItem;
                            else {
                                for (let i = 0; i < hotelItem.roomType.length; i++) {
                                    if (hotelItem.roomType[i].personLimit >= persons && hotelItem.roomType[i].price >= value1[0] && hotelItem.roomType[i].price <= value1[1]) {
                                        return hotelItem;
                                    }
                                }
                            }
                }).map((hotelItem: any) => {
                    let AvgReview = 0;
                    if (hotelItem.review.length) {
                        let sum: number = 0;
                        hotelItem.review.forEach((item: any) => {
                            sum += item.stars
                        })
                        AvgReview = sum / hotelItem.review.length
                    }
                    return(
                    <Link key={hotelItem.name} href={`/hotel/${hotelItem.id}`}>
                        <HotelCard
                            hotelName={hotelItem.name}
                            imgSrc={`${hotelItem.file}`}
                            hotelCity={hotelItem.city}
                            hotelAddress={hotelItem.address}
                            hotelTel={hotelItem.tel}
                            roomType={hotelItem.roomType}
                            persons={persons}
                            rating={AvgReview}
                            review={hotelItem.review.length}
                            minPrice={value1[0]}
                            maxPrice={value1[1]}
                        />
                    </Link>)
                })}
            </div>
        </div>
    );
}
