import getHotels from "@/libs/getHotels"
import HotelCatalog from "@/components/HotelCatalog"

export default function Hotels(){
    const hotels = getHotels()
    return(
        <main className="p-5">
            <h1 className="text-xl font-medium text-center item-center">Hotel</h1>
            <HotelCatalog hotelJson={hotels} />
        </main>
    )
}