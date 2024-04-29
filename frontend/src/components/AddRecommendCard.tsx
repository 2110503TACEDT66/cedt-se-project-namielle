import Image from "next/image";
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import UpdateHotel from "@/libs/UpdateHotel";

// var globalSelect : number[] = [];

export default function AddRecommendCard({hotel, hotelName, imgSrc, hotelCity, hotelAddress, hotelTel, hotelPriority 
    ,globalSelect
}: {hotel: any, hotelName: string, imgSrc: string, hotelCity: string, hotelAddress: string, hotelTel: string, hotelPriority: number
    , globalSelect: number[]
}) {
    const { data: session } = useSession();
    const [Priority, setPriority] = useState<number>(hotelPriority);
    const [updateHotel, setUpdateHotel] = useState<any | null>(null);
    const [prevSelectedValue, setPrevSelectedValue] = useState("0");

    function disablePriority(e: number) {
        setTimeout(function () {
            var select = document.getElementById(hotelName) as HTMLSelectElement;
            if (select === null)
                disablePriority(e);
            else {
                select[e].disabled = true;
            }
        }, 500);
    };

    // console.log(globalSelect);

    function enablePriority(e: number) {
        setTimeout(function () {
            var select = document.getElementById(hotelName) as HTMLSelectElement;
            if (select === null)
                enablePriority(e);
            else {
                select[e].disabled = false;
            }
        }, 500);
    };

    //current select number and add save data
    let cur: number;
    //if(hotelPriority != 0) globalSelect.push(hotelPriority);
    function changePriority(e: number) {
        setTimeout(function () {
            var select = document.getElementById(hotelName) as HTMLSelectElement;
            if (select === null)
                changePriority(e);
            else {
                let itr = globalSelect.indexOf(cur);
                if (e == 0) {
                    globalSelect.splice(itr, 1);
                }
                else if (e == 1) {
                    globalSelect.push(1);
                    if (cur != 0) globalSelect.splice(itr, 1);
                }
                else if (e == 2) {
                    globalSelect.push(2);
                    if (cur != 0) globalSelect.splice(itr, 1);
                }
                else if (e == 3) {
                    globalSelect.push(3);
                    if (cur != 0) globalSelect.splice(itr, 1);
                }
                // enablePriority(2);
                // localStorage.setItem('globalSelect', JSON.stringify(globalSelect)); try to save data
                check();
            }
            // enablePriority(2);
            // localStorage.setItem('globalSelect', JSON.stringify(globalSelect)); try to save data
            check();
            cur = Priority;
        },500)
       }

    function check() {
        let one = false, two = false, three = false;
        for (let e of globalSelect) {
            if (e == 1) {
                disablePriority(1);
                one = true;
            }
            else if (e == 2) {
                disablePriority(2);
                two = true;
            }
            else if (e == 3) {
                disablePriority(3);
                three = true;
            }
        }
        if (!one) enablePriority(1);
        if (!two) enablePriority(2);
        if (!three) enablePriority(3);
    };
    function currentSelect() {
        var selectBox = document.getElementById(hotelName) as HTMLSelectElement;
        var selectedValue = selectBox.selectedIndex;
        cur = selectedValue;
    }


    const fetchUpdateHotels = async () => {
        try {
            if (!session) return;
            const result = await UpdateHotel(session?.user.token, hotel._id, Priority);
            setUpdateHotel(result);
        } catch (error) {
            console.error(error);
        }
    }

    function selectRank() {
        var mySelect = document.getElementById(hotelName) as HTMLSelectElement;
        if (mySelect == null) {
            return mySelect;
        }
        mySelect.selectedIndex = hotelPriority
        return;
    }

    // const randPrice = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;

    return (
        <main className='w-[30%] h-[200px] bg-white dark:bg-midnight-blue rounded-lg border border-black my-10 flex' style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', transition: '0.3s' }}>
            <div className="w-[60%] relative rounded-t-lg" style={{ overflow: 'hidden' }}>
                <Image src={imgSrc} alt={hotelName} fill={true} className="object-cover" />
            </div>
            <div className="block w-full text-black">
                <div className="w-full font-bold px-[4%] pt-[2%] dark:text-white-grayish" style={{ fontSize: '20px' }}>
                    {hotelName}
                </div>
                <div className="w-full px-[4%] pt-[2%] " style={{ color: '#777' }}>
                    {hotelCity}
                </div>
                <div className="w-full px-[4%] pt-[2%] " style={{ color: '#777' }}>
                    Tel. {hotelTel}
                </div>
                <div className="flex items-center mt-[10%] ml-[8%]">
                    <select value={Priority} name="mySelect" id={hotelName}
                        className="w-[50px] h-[30px] dark:text-white-grayish bg-white dark:bg-midnight border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent mr-[4%]"
                        onMouseEnter={() => { check(); currentSelect() }}
                        onChange={(e) => {
                            changePriority(e.target.selectedIndex);
                            setPriority(e.target.selectedIndex); 
                        }}
                        onLoad={(e) => {
                            console.log("a");
                        }}
                        onClick={fetchUpdateHotels}
                        >
                        <option value="0">0</option>
                        <option id="one" value="1">1</option>
                        <option id="two" value="2">2</option>
                        <option id="three" value="3">3</option>
                    </select>
                </div>
            </div>
        </main>
    );

}
