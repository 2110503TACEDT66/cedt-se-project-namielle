import Image from "next/image";
import CardTemplate from "./CardTemplate";
import getHotels from "@/libs/getHotels";
import getHotel from "@/libs/getHotel";

export default function RecommendCard({ hotelName, hotelCity, hotelPrice, rankImage,  imgSrc }: { hotelName: string, hotelCity: string, hotelPrice: number, rankImage: string, imgSrc: string }) {

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
            <div className="w-[100%] h-[70%] relative rounded-xl">
                <Image src={imgSrc} alt={hotelName} fill={true} className="object-cover rounded-t-md"/>
            </div>
            <div className="w-full h-[30%] bg-white p-1">
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
                <div className="absolute bottom-0 right-0 p-1 text-2xl text-orange-500">
                    {formatter.format(hotelPrice).replace('฿', 'THB ')}.-
                </div>
            </div>
        </div>
    )
}
