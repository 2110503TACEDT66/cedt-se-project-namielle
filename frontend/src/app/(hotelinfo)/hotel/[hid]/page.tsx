'use client'

import ReviewBlock from "@/components/ReviewBlock";
import { Rating } from "@mui/material";
import Image from "next/image";
import getHotel from "@/libs/getHotel";
import Link from "next/link";
import getReviewsByHotel from "@/libs/getReviews";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import YourReview from "@/components/YourReview";
import getUserProfile from "@/libs/getUserProfile";
import { use, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { HotelJson, ReviewJson } from "../../../../../interface";

export default function Detailpage({ params }: { params: { hid: string } }) {

    const [hotelDetail, setHotelDetail] = useState<HotelJson>();
    const [review, setReview] = useState<ReviewJson>();
    const [userInfo, setUserInfo] = useState<any>();
    const [roomType, setRoomType] = useState<any>() || null;
    const [roomName, setRoomName] = useState<any>() || null;
    const [remainRoom, setRemainRoom] = useState<any>(0);
    const [price, setPrice] = useState<any>();
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const result = await getHotel(params.hid)
                setHotelDetail(result);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserData();
    }, [])

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const result = await getReviewsByHotel(hotelDetail.data._id)
                setReview(result);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserData();
    }
    , [hotelDetail])
    let AvgReview = 0;
    if (review?.count) {
        let sum: number = 0;
        review.data.forEach((item: any) => {
            sum += item.stars
        })
        AvgReview = sum / review.count
    }

    const session = useSession();
    if (session) {
        useEffect(() => {
            const fetchUserData = async () => {
                try {
                    const result = await getUserProfile(session.user.token)
                    setUserInfo(result);
                } catch (err) {
                    console.error(err);
                }
            };
    
            fetchUserData();
        }, [session])
    }
    
   

    const handleRoomTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRoomName = e.target.value;
        const selectedRoom = hotelDetail?.data.roomType.find((room: any) => room.name === selectedRoomName);
        if (selectedRoom) {
            setRoomName(selectedRoom.name);
            setPrice(selectedRoom.price);
            setRoomType(selectedRoom._id);
            setRemainRoom(selectedRoom.roomLimit);
        }
    };

    return (
        <main className="h-auto w-full">
            <div className="bg-white h-[500px] w-[90%] mt-5 mx-auto border border-solid border-slate-800 rounded-t-2xl flex">
                <div className="relative h-[100%] w-[35%]">
                    <Image src={`/img/${hotelDetail?.data.file}`} alt="bannerImage1" fill={true} priority className="block obj-cover rounded-tl-2xl"></Image>
                </div>

                <div className="p-10">
                    <h1 className="my-2 font-bold text-3xl font-sans">{hotelDetail?.data.name}</h1>
                    <div className="h-[20px] w-[100%] flex items-center flex-wrap ">
                        <Rating readOnly value={AvgReview} precision={0.1}></Rating> <span className="text-sm font-light mx-3">reviews by {review?.count} persons</span>
                    </div>
                    <p className="m-4 font-medium text-md font-sans">{hotelDetail?.data.address}</p>
                    <p className="m-4 font-medium text-md font-sans">Rooms Available: {hotelDetail?.data.capacity}</p>
                    <p className="m-4 font-medium text-md font-sans">Tel. {hotelDetail?.data.tel}</p>
                </div>

            </div>

            <div className="bg-white h-[80px] w-[90%] mt-5 mx-auto border border-solid border-slate-800 flex  divide-x divide-solid divide-slate-800">
                <div className="leading-none w-[20%] flex justify-center items-center">
                    <select className="block w-[80%] h-[50%] text-xl text-black font-sans border border-solid border-slate-800 rounded-md" onChange={handleRoomTypeChange}>
                    <option key="" value="" className="text-black text-center">Select Your Room</option>
                        {hotelDetail?.data.roomType.map((item: any) => (
                            <option key={item.name} value={item.name} className="text-black text-center">{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="leading-none w-[30%] flex justify-center items-center">
                    {price == null ? <h1 className="block font-bold text-green-800 text-xl">Please Select Room</h1> :
                    <><h1 className="block font-bold text-green-800 text-4xl">฿ {price}</h1>
                    <h1 className="block text-green-800 text-xl "> /day</h1></>
                    } 
                    
                </div>
                <div className="leading-none w-[30%] flex justify-center items-center">
                    {remainRoom == 0 ? <h1 className="block font-bold text-red-800 text-xl">No Room Available</h1> :
                        <>Remain room : {remainRoom}</>
                    }
                </div>
                <div className="leading-none w-[20%] flex justify-center items-center">
                    <Link href={`/reservation?price=${price}&hid=${params.hid}&name=${hotelDetail?.data.name}&file=${hotelDetail?.data.file}&roomType=${roomType}&roomName=${roomName}`} className="flex justify-center items-center">
                        <button className="block p-1 text-2xl text-white font-bold font-sans bg-orange-500 hover:bg-slate-800 hover:text-orange-500 rounded-md">
                            RESERVE
                        </button>
                    </Link>
                </div>
            </div>

            <div className="bg-white h-auto pb-5 w-[90%] mt-5 mx-auto border border-solid border-slate-800 rounded-b-2xl p-2">


                {
                    session && !review?.data.some((e: any) => e.user?.email == userInfo?.data.email) ?
                        <>
                            <p className="text-md font-light mx-10 mt-5">Your Review</p>
                            <YourReview hotel={params.hid} />
                        </> : ""
                }



                <p className="text-md font-light mx-10">All reviews</p>
                {
                    review?.data.map((item: any) => (

                        <ReviewBlock key={item.user?.name} user={item.user?.name} rating={item.stars} comment={item.description} createdAt={item.createAt.slice(0, 10)} id={item._id} isHidden={item.isHidden}/>
                    ))

                }

            </div>
        </main>
    )

}
