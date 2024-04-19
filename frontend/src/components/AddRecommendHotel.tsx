'use client'

import AddRecommendCard from "./AddRecommendCard";
import HotelCard from "./HotelCard";
import { useState, useEffect, useRef } from "react";
import getHotels from "@/libs/getHotels";



export default function AddRecommendedHotel({hotelJson}:{hotelJson:any}) {
    const [hotelData, setHotelData] = useState<any>();
    const [search, setSearch] = useState('');
    const [change, setChange] = useState({});
    const globalSelect = useRef<number[]>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const result = await getHotels()
                setHotelData(result);
                result.data.map((hotelItem: any) => {
                    if(hotelItem.priority != 0 && globalSelect.current.includes(hotelItem.priority) == false){
                        globalSelect.current.push(hotelItem.priority);
                        console.log(hotelItem.priority);
                    }
                        
                })
                console.log(globalSelect);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserData();
    }, [])

    // console.log(search);
    // console.log(hotelData);
    console.log(globalSelect);
    return (
        <div className="justify-center item-center">
            <div className="container mx-[auto] my-8 p-4 rounded-lg shadow-md block">
                <div className="block ml-[20%]">
                    <input
                        type="text"
                        id="search"
                        name="search"
                        placeholder="Enter name or city of the hotel..."
                        onChange={(e) => setSearch(e.target.value)}
                        className="input input-bordered w-[70%] text-l p-2 m-[2%]"
                    />
                    {/* <button onClick={() => {
                        for (const id in changes) {
                            // Apply the change for the hotel with this id
                            updateHotelPriority(id, changes[id]);
                        }
                        // Clear the changes
                        setChanges({});
                        }} className="bg-blue-500 text-xl text-white p-2 rounded">
                        Update All
                    </button> */}
                </div>
                
                <div className="flex flex-wrap justify-between">
                    {hotelData?.data.filter((hotelItem: any) => {
                            const searchTerm = search.toLowerCase();
                            return searchTerm === '' ? true : hotelItem.name.toLowerCase().includes(searchTerm) || hotelItem.city.toLowerCase().includes(searchTerm);
                        }).map((hotelItem: any) => (
                            <AddRecommendCard
                                hotel={hotelItem}
                                hotelName={hotelItem.name}
                                imgSrc={`/img/${hotelItem.file}`}
                                hotelCity={hotelItem.city}
                                hotelAddress={hotelItem.address}
                                hotelTel={hotelItem.tel}
                                hotelPriority={hotelItem.priority}
                                globalSelect = {globalSelect.current}
                            />
                    ))}
                </div>
            </div>
        </div>
    );
}