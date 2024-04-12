import Image from "next/image";
import CardTemplate from "./CardTemplate";
import getHotels from "@/libs/getHotels";
import getHotel from "@/libs/getHotel";

export default function RecommendCard({ hotelName, imgSrc, hotelAddress, hotelTel, hotelPrice }: { hotelName: string, imgSrc: string, hotelAddress: string, hotelTel: string, hotelPrice: number }) {

    // const randPrice = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;


    return (
        <div className="w-[55%] h-[70%] relative">
            <Image src={imgSrc} alt={hotelName} fill={true} className="object-cover" />
        </div>
    )
}
