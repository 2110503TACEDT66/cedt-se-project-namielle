'use client'

import AddRecommendCard from "./AddRecommendCard";
import HotelCard from "./HotelCard";
import { useState, useEffect } from "react";
import getHotels from "@/libs/getHotels";

export default function AddRecommendedHotel({hotelJson}:{hotelJson:any}) {
    const [hotelData, setHotelData] = useState<any>();
    const [checkedBoxes, setCheckedBoxes] = useState([]);
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

    // function handleCheckboxChange(e, hotelName){
    //     if(e.target.checked){
    //         console.log(hotelName);
    //         if(checkedBoxes.length < 3){
    //             setCheckedBoxes([...checkedBoxes, hotelName]);
    //         }
    //         else{
    //             e.target.checked = false;
    //             alert('Maximum 3 hotels can be recommended at a time');
    //         }
    //     }
    //     else{
    //         setCheckedBoxes(checkedBoxes.filter((item) => item !== hotelName));
    //     }
    // }

    console.log(search);
    console.log(hotelData);

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
                            />
                            
                    ))}
                </div>
            </div>
        </div>
    );
}
