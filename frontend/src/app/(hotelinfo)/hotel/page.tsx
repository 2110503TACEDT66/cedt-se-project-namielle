import getHotels from "@/libs/getHotels"
import HotelCatalog from "@/components/HotelCatalog"
import RecommendBanner from "@/components/RecommendBanner"

export default function Hotels() {
    const hotels = getHotels();

    return (
        <main className="p-5">
            <RecommendBanner></RecommendBanner>
            <HotelCatalog hotelJson={hotels} />
        </main>
    )
}
