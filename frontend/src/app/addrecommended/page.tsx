import AddRecommendedHotel from "@/components/AddRecommendHotel";
import getHotels from "@/libs/getHotels";
import { ContextProvider } from "@/components/ContextProvider";


export default function AddRecommended() {
    const hotels = getHotels();
    return (
        <ContextProvider>
            <div>
                <div className="flex justify-center items-center text-3xl pt-10">
                    Make a Recommendation for a Hotel
                </div>
                <AddRecommendedHotel hotelJson={hotels} />
            </div>  
        </ContextProvider>
    )
}