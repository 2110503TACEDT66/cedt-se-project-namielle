'use client'

import { AppDispatch } from "../redux/store"
import { useDispatch } from "react-redux"
import { useSearchParams } from "next/navigation"
import DateBooker from "@/components/DateBooker"
import { useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import Image from "next/image";
import { CartItem } from "../../../interface"
import { addToCart } from "../redux/features/cartSlice"

export default function reservation() {
    const urlParams = useSearchParams()
    const hid = urlParams.get("hid")
    const price = urlParams.get("price") || "0"
    const name = urlParams.get("name") || ""
    const picture = urlParams.get("file") || ""

    const dispatch = useDispatch<AppDispatch>()
    const [checkInDate, setCheckInDate] = useState<Dayjs>(dayjs())
    const [checkOutDate, setCheckOutDate] = useState<Dayjs>(dayjs().add(1, "day"))

    const MakeReservation = () => {
        if(checkInDate !== null && checkOutDate !== null && hid !== null && price !== null) {
            const booking: CartItem = {
                _id: dayjs().format("YYYYMMDDHHmmssSSS"),
                checkInDate: dayjs(checkInDate).format("YYYY-MM-DD"),
                checkOutDate: dayjs(checkOutDate).format("YYYY-MM-DD"),
                hid: hid,
                price: checkOutDate.diff(checkInDate, "day") * parseInt(price),
                name: name,
                picture: picture
            }
            dispatch(addToCart(booking))
        }
    }
    
    let totalPrice = checkOutDate?.diff(checkInDate, "day") * parseInt(price)
    if (totalPrice === undefined) {
        totalPrice = 0
    }

    return (
        <div className="flex justify-center items-center m-10">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl">
                <div className="flex justify-center items-center">
                    <Image src={`/img/${picture}`} width={400} height={200} alt={`{name}`} className="rounded-lg text-center m-1 pb-2" />
                </div>
                
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{name}</h1>
                    <p className="text-gray-600">It's Happening...</p>
                </div>
                <div className="flex justify-between items-center mb-8">
                    <div className="m-1">
                        <h2 className="text-lg font-semibold text-gray-800">Check In</h2>
                        <DateBooker onDateChange={(value:Dayjs)=>{setCheckInDate(value)}}/>
                    </div>
                    <div className="m-1">
                        <h2 className="text-lg font-semibold text-gray-800">Check Out</h2>
                        <DateBooker onDateChange={(value:Dayjs)=>{setCheckOutDate(value)}}/>
                    </div>
                </div>
                <div className="text-center">
                        
                    <h1 className={`text-4xl font-bold ${totalPrice >= 0 ? 'text-green-600' : 'text-red-600'} mb-4`}>{totalPrice >= 0 ? `฿ ${totalPrice}` : "Wrong"}</h1>
                    
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105" onClick={MakeReservation}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}