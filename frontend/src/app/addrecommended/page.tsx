import AddRecommendedHotel from "@/components/AddRecommendHotel";
import getHotels from "@/libs/getHotels";


export default function AddRecommended() {
    const hotels = getHotels();
    return (
        <div>
            <div className="flex justify-center items-center text-3xl pt-10">
                Make a Recommendation for a Hotel
            </div>
            <AddRecommendedHotel hotelJson={hotels} />
        </div>
    )
}