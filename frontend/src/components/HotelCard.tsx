import Image from "next/image";
import CardTemplate from "./CardTemplate";
import getHotels from "@/libs/getHotels";
import getHotel from "@/libs/getHotel";

<<<<<<< HEAD
export default function HotelCard({ hotelName, imgSrc, hotelCity, hotelAddress, hotelTel, hotelPrice }: { hotelName: string, imgSrc: string, hotelCity: string, hotelAddress: string, hotelTel: string, hotelPrice: number }) {
=======
export default function HotelCard({ hotelName, imgSrc, hotelAddress, hotelTel, roomType, persons }: { hotelName: string, imgSrc: string, hotelAddress: string, hotelTel: string,  roomType: any, persons: number}) {
>>>>>>> 9e6178d925a01d611578f71c1822b7f1a97890a3

    // const randPrice = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;


    return (
        <CardTemplate contentName={hotelName}>
            <div className="w-1/3 relative rounded-t-lg">
                <Image src={imgSrc} alt={hotelName} fill={true} className="object-cover" />
            </div>
            <div className="block w-full text-black">
                <div className="w-[full] font-bold px-[3%] pt-[3%] text-2xl">
                    {hotelName}
                </div>
<<<<<<< HEAD
                <div className="w-full px-[4%] pt-[2%] ">
                    {hotelCity}
                </div>
                <div className="w-full px-[4%] pt-[2%] ">
=======
                <div className="w-full px-[3%] pt-1">
>>>>>>> 9e6178d925a01d611578f71c1822b7f1a97890a3
                    Address: {hotelAddress}
                </div>
                <div className="w-full px-[3%] pt-1">
                    Tel. {hotelTel}
                </div>
<<<<<<< HEAD
                <div className="w-full px-[4%] pt-[2%] text-2xl r-0 b-0 text-orange-500 font-bold">
                    {hotelPrice} ฿
=======
                <div className="w-[80%] px-[3%] pt-[1%] rounded-lg text-sm">
                    <table className="w-auto table-auto">
                        <thead>
                        <tr className="bg-gray-200 text-gray-700 font-bold">
                            <th className="px-2 py-1">ROOM</th>
                            <th className="px-2 py-1">Persons</th>
                            <th className="px-2 py-1">Price</th>
                            <th className="px-2 py-1">Available Rooms</th>
                        </tr>
                        </thead>
                        <tbody>
                        {roomType.map((room:any) => (
                            (room.personLimit >= persons && room.roomLimit > 0)&& (
                            <tr className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-2 py-1">{room.name}</td>
                                <td className="px-2 py-1">{room.personLimit}</td>
                                <td className="px-2 py-1">{room.price}</td>
                                <td className="px-2 py-1">{room.roomLimit}</td>
                            </tr>
                            )
                        ))}
                        </tbody>
                    </table>
>>>>>>> 9e6178d925a01d611578f71c1822b7f1a97890a3
                </div>

                {/* <div className="w-full px-[4%] pt-[2%] text-2xl r-0 b-0">
                    {imgSrc}
                </div> */}
            </div>

        </CardTemplate>
    )
}
