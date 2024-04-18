import Image from "next/image";
import CardTemplate from "./CardTemplate";
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import UpdateHotel from "@/libs/UpdateHotel";
import { Select } from "@mui/material";

export default function AddRecommendCard({hotel, hotelName, imgSrc, hotelCity, hotelAddress, hotelTel, hotelPriority 
    , onCancel, onSave
}: {hotel: any, hotelName: string, imgSrc: string, hotelCity: string, hotelAddress: string, hotelTel: string, hotelPriority: number
    ,onCancel?: () => void, onSave?: () => void 
}) {
    const { data: session } = useSession();
    const [Priority, setPriority] = useState<number>(hotelPriority);
    const [updateHotel, setUpdateHotel] = useState<any | null>(null);
    const [prevSelectedValue, setPrevSelectedValue] = useState("0");

   function disablePriority(e:number){
        var select = document.getElementById(hotelName) as HTMLSelectElement;
        if(select == null){
            return select;
        }
        select[e].disabled = true;
        return;
   }
   
   function enablePriority(e:number){
        var select = document.getElementById(hotelName) as HTMLSelectElement;
        if(select == null){
            return select;
        }
        select[e].disabled = false;
        return;
   }

   function changePriority(e:number){
        if(e == 1){
            disablePriority(1);
            enablePriority(2);
            enablePriority(3);
        }
        else if(e == 2){
            disablePriority(2);
            enablePriority(1);
            enablePriority(3);
        }
        else if(e == 3){
            disablePriority(3);
            enablePriority(1);
            enablePriority(2);
        }
        return;
    }

    const fetchUpdateHotels = async () => {

            try {
                if (!session) return;
                const result = await UpdateHotel(session?.user.token,hotel._id,Priority);
                setUpdateHotel(result);
            } catch (error) {
                console.error(error);
            }
    }
    function selectRank(){
        var mySelect = document.getElementById(hotelName) as HTMLSelectElement;
        if(mySelect == null){
            return mySelect;
        }
        mySelect.selectedIndex = hotelPriority
        return;
    }
    

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
                <select value={Priority} name="rank" id={hotelName} 
                    onChange={(e) => {
                        setPriority(e.target.selectedIndex); 
                    }}
                    >
                    <option value="0" selected>0</option>
                        <option id="one" value="1" onChange={changePriority(1)} >1</option>
                        <option id="two" value="2" onChange={changePriority(2)} >2</option>
                        <option id="three" value="3" onChange={changePriority(3)}>3</option>
                </select>
                <div className="text-opacity-0">
                {
                   selectRank()
                }
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-4" onClick={fetchUpdateHotels}>Save</button>
            </div>
        </main>
    );
    
}