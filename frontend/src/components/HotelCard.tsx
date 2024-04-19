import Image from "next/image";
import CardTemplate from "./CardTemplate";
import getHotels from "@/libs/getHotels";
import getHotel from "@/libs/getHotel";

export default function HotelCard({ hotelName, imgSrc, hotelCity, hotelAddress, hotelTel, roomType, persons }: { hotelName: string, imgSrc: string, hotelCity: string, hotelAddress: string, hotelTel: string, roomType: any, persons: number }) {

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
                <div className="w-full px-[3%] pt-1">
                    Address: {hotelAddress}
                </div>
                <div className="w-full px-[3%] pt-1">
                    Tel. {hotelTel}
                </div>
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
                            {roomType.map((room: any) => (
                                (room.personLimit >= persons && room.roomLimit > 0) && (
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
                </div>

                {/* <div className="w-full px-[4%] pt-[2%] text-2xl r-0 b-0">
                    {imgSrc}
                </div> */}
            </div>

        </CardTemplate>
    )
}
