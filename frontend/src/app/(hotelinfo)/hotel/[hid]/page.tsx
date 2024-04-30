'use client'

import ReviewBlock from "@/components/ReviewBlock";
import { Rating } from "@mui/material";
import Image from "next/image";
import getHotel from "@/libs/getHotel";
import Link from "next/link";
import getReviewsByHotel from "@/libs/getReviews";
import YourReview from "@/components/YourReview";
import getUserProfile from "@/libs/getUserProfile";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ReviewJson } from "../../../../../interface";
import Swal from "sweetalert2";

export default function Detailpage({ params }: { params: { hid: string } }) {

    const [hotel, setHotel] = useState<any>();
    const [review, setReview] = useState<ReviewJson>();
    const [userInfo, setUserInfo] = useState<any>();
    const [roomType, setRoomType] = useState<any>() || null;
    const [roomName, setRoomName] = useState<any>() || null;
    const [remainRoom, setRemainRoom] = useState<any>(0);
    const [personLimit, setPersonLimit] = useState<any>(0) || null;
    const [price, setPrice] = useState<any>();
    const { data: session } = useSession();
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const result = await getHotel(params.hid)
                setHotel(result);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserData();
    }, [])

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const result = await getReviewsByHotel(hotel.data._id)
                setReview(result);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserData();
    }
        , [hotel])
    let AvgReview = 0;
    if (review?.count) {
        let sum: number = 0;
        review.data.forEach((item: any) => {
            sum += item.stars
        })
        AvgReview = sum / review.count
    }

    if (session) {
        useEffect(() => {
            const fetchUserData = async () => {
                try {
                    const result = await getUserProfile(session?.user.token)
                    setUserInfo(result);
                } catch (err) {
                    console.error(err);
                }
            };

            fetchUserData();
        }, [session])
    }


    if (!hotel) return "ERROR";
    const hotelDetail = hotel.data;

    const handleRoomTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRoomName = e.target.value;
        const selectedRoom = hotelDetail.roomType.find((room: any) => room.name === selectedRoomName);
        if (selectedRoom) {
            setRoomName(selectedRoom.name);
            setPrice(selectedRoom.price);
            setRoomType(selectedRoom._id);
            setRemainRoom(selectedRoom.roomLimit);
            setPersonLimit(selectedRoom.personLimit);
        } else {
            setPrice(null);
            setRemainRoom(0);
            setPersonLimit(0);
        }
    };

    const formatter = new Intl.NumberFormat("th-TH", {
        style: "currency",
        currencyDisplay: "code",
        currency: "THB",
    });

    return (
        <main className="h-auto w-full">
            <div className="bg-white dark:bg-midnight-blue h-[500px] w-[90%] mt-5 mx-auto border border-solid border-slate-800 rounded-t-2xl flex">
                <div className="relative h-[100%] w-[35%]">
                    <Image src={`${hotelDetail.file}`} alt="bannerImage1" fill={true} priority className="block object-cover rounded-tl-2xl"></Image>
                </div>

                <div className="p-10 text-purple-dark dark:text-white-grayish">
                    <h1 className="my-2 font-bold text-3xl font-sans">{hotelDetail.name}</h1>
                    <div className="h-[20px] w-[100%] flex items-center flex-wrap ">
                        <Rating readOnly value={AvgReview} precision={0.1}></Rating> <span className="text-sm font-light mx-3">reviews by {review?.count} persons</span>
                    </div>
                    <p className="m-4 font-medium text-md font-sans">{hotelDetail.address}</p>
                    <p className="m-4 font-medium text-md font-sans">Rooms Available: {hotelDetail.capacity}</p>
                    <p className="m-4 font-medium text-md font-sans">Tel. {hotelDetail.tel}</p>
                </div>

            </div>

            <div className="bg-white dark:bg-midnight-blue h-[80px] w-[90%] mt-5 mx-auto border border-solid border-slate-800 flex  divide-x divide-solid divide-slate-800 dark:divide-midnight">
                <div className="leading-none w-[20%] flex justify-center items-center">
                    <select className="block w-[80%] h-[50%] text-xl text-gray-sweet dark:text-white-grayish font-sans border border-solid border-slate-800 rounded-md bg-white dark:bg-midnight-dark" onChange={handleRoomTypeChange}>
                        <option key="" value="" className="text-gray-sweet dark:text-white-grayish text-center bg-white dark:bg-midnight-dark">Select Your Room</option>
                        {hotelDetail.roomType.map((item: any) => (
                            <option key={item.name} value={item.name} className="text-purple-dark dark:text-white-grayish text-center">{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="leading-none w-[30%] flex justify-center items-center">
                    {
                        price == null
                            ? <h1 className="block font-bold text-green-800 dark:text-green-success text-xl">Please Select Room</h1>
                            :
                            <>
                                <h1 className="block font-bold text-green-800 dark:text-green-success text-2xl">{formatter.format(price)}.-</h1>
                                <h1 className="block text-green-800 dark:text-green-success text-xl "> /day</h1>
                            </>
                    }

                </div>
                <div className="leading-none w-[30%] flex justify-center items-center">
                    {personLimit == 0 ?
                        <h1 className="block font-bold text-green-800 dark:text-green-success text-xl">Please Select Room</h1>
                        :
                        <>
                            <h1 className="block font-bold text-green-800 dark:text-green-success text-xl">{personLimit}</h1>
                            <h1 className="block text-green-800 dark:text-green-success text-xl">&nbsp;persons limit</h1>
                        </>
                    }
                </div>
                <div className="leading-none w-[30%] flex justify-center items-center">
                    {remainRoom == 0 ?
                        <h1 className="block font-bold text-red-800 dark:text-red-error text-xl">No Room Available</h1>
                        : <>
                            <h1 className="block font-bold text-green-800 dark:text-green-success text-xl">{remainRoom}</h1>
                            <h1 className="block text-green-800 dark:text-green-success text-xl">&nbsp;rooms left</h1></>
                    }

                </div>
                <div className="leading-none w-[20%] flex justify-center items-center">
                    
                    {price == null || remainRoom == 0 ?
                        <>
                        {    session ? 
                        <button className="block p-1 text-2xl text-white dark:text-white-grayish font-bold font-sans bg-gray-500 hover:bg-slate-800 hover:text-slate-800 dark:hover:bg-white-grayish dark:hover:text-white-grayish rounded-md" onClick={() => {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Please select room type and check availability',
                                })
                            }}>
                                RESERVE
                        </button>
                            :
                            <button className="block p-1 text-2xl text-white dark:text-white-grayish font-bold font-sans bg-gray-500 hover:bg-slate-800 hover:text-slate-800 dark:hover:bg-white-grayish dark:hover:text-white-grayish rounded-md" onClick={() => {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Please login to reserve room',
                                })
                            }}>
                                RESERVE
                        </button>
                            }
                        </>   
                        :
                        <>
                        {   session ?
                            <Link href={`/reservation?price=${price}&hid=${params.hid}&name=${hotelDetail.name}&file=${hotelDetail.file}&roomType=${roomType}&roomName=${roomName}&address=${hotelDetail.address}&rating=${AvgReview}&count=${review?.count}`} className="flex justify-center items-center">
                                <button className="block p-1 text-2xl text-white font-bold font-sans bg-orange-500 hover:bg-slate-800 hover:text-orange-500 dark:hover:bg-midnight rounded-md">
                                    RESERVE
                                </button>
                            </Link>
                            :
                            <button className="block p-1 text-2xl text-white dark:text-white-grayish font-bold font-sans bg-gray-500 hover:bg-slate-800 hover:text-slate-800 dark:hover:bg-white-grayish dark:hover:text-white-grayish rounded-md" onClick={() => {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Please login to reserve room',
                                })
                            }}>
                                RESERVE
                            </button>
                        }
                        </>
                        
                    }
                </div>
            </div>

            <div className="bg-white dark:bg-midnight-blue h-auto pb-5 w-[90%] mt-5 mx-auto border border-solid border-slate-800 rounded-b-2xl p-2">


                {
                    session && !review?.data.some((e: any) => e.user?.email == userInfo?.data.email) ?
                        <>
                            <p className="text-md font-light mx-10 mt-5 text-purple-dark dark:text-white-grayish">Your Review</p>
                            <YourReview hotel={params.hid} />
                        </> : ""
                }



                <p className="text-md font-light mx-10 text-purple-dark dark:text-white-grayish">All reviews</p>
                {
                    review?.data.map((item: any) => (
                        <ReviewBlock key={item.user?.name} user={item.user?.name} rating={item.stars} comment={item.description} createdAt={item.createAt.slice(0, 10)} id={item._id} isHidden={item.isHidden} />
                    ))

                }

            </div>
        </main>
    )

}
