import Image from "next/image";
import CardTemplate from "./CardTemplate";
import getHotels from "@/libs/getHotels";
import getHotel from "@/libs/getHotel";

export default function RecommendCard({ hotelName, imgSrc }: { hotelName: string, imgSrc: string }) {

    // const randPrice = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;


    return (
        <div className="w-[100%] h-[90%] relative">
            <Image src={imgSrc} alt={hotelName} fill={true} className="object-cover" />
        </div>
    )
}
