import Image from "next/image";
import CardTemplate from "./CardTemplate";
import { Checkbox } from "@mui/material";
import { useState } from "react";

export default function AddRecommendCard({ hotelName, imgSrc, hotelCity, hotelAddress, hotelTel }: { hotelName: string, imgSrc: string, hotelCity: string, hotelAddress: string, hotelTel: string}) {
    const [checkData, setcheckData] = useState<boolean>();

    // function changeCheckData(){
    //     if(checkData){

    //     }
    // }

    // const randPrice = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;

    return (
        <main className='w-[30%] h-[200px] bg-white rounded-lg border border-black my-10 flex' style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', transition: '0.3s' }}>
            <div className="w-[60%] relative rounded-t-lg" style={{ overflow: 'hidden' }}>
                <Image src={imgSrc} alt={hotelName} fill={true} className="object-cover" />
            </div>
            <div className="block w-full text-black">
                <div className="w-full font-bold px-[4%] pt-[2%] " style={{ fontSize: '20px' }}>
                    {hotelName}
                </div>
                <div className="w-full px-[4%] pt-[2%] " style={{ color: '#777' }}>
                    {hotelCity}
                </div>
                <div className="w-full px-[4%] pt-[2%] text-sm" style={{ color: '#777' }}>
                    Address: {hotelAddress}
                </div>
                <div className="w-full px-[4%] pt-[2%] " style={{ color: '#777' }}>
                    Tel. {hotelTel}
                </div>
                <input
                    id={hotelName}
                    type="checkbox"
                    className="m-3"
                />
            </div>
        </main>
    );
}