import Image from "next/image";
import CardTemplate from "./CardTemplate";
import getHotels from "@/libs/getHotels";
import getHotel from "@/libs/getHotel";
import { Rating } from "@mui/material";

export default function RecommendCard({ hotelName, hotelCity, hotelPrice, rankImage, rating, count,  imgSrc }: { hotelName: string, hotelCity: string, hotelPrice: number, rankImage: string, rating: number, count: number, imgSrc: string }) {

    // const randPrice = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;
    const formatter = new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
    });

    return (
        <div className="w-[100%] h-[100%] relative">
            <div className="absolute top-0 left-0 z-10">
                <Image
                    src={rankImage}
                    width={75}
                    height={75}
                    alt="rank image"
                ></Image>
            </div>
            <div className="w-[100%] h-[60%] relative rounded-xl">
                <Image src={imgSrc} alt={hotelName} fill={true} className="object-cover rounded-t-md"/>
            </div>
            <div className="w-full h-[40%] bg-white p-1">
                <div className="font-bold text-lg pl-1">
                    {hotelName}
                </div>
                <div className="flex">
                    <Image
                        src={"/img/location.png"}
                        width={20}
                        height={20}
                        alt="location image"
                    ></Image>
                    {hotelCity}
                </div>
                <div className="flex gap-1">
                    <Rating
                        name="read-only"
                        value={rating}
                        precision={0.1}
                        readOnly
                    />
                    <div className="text-bold">({rating.toFixed(1)})</div>
                </div>
                <div className="opacity-50 pl-1">{count} reviews</div>
            </div>
        </div>
    )
}
