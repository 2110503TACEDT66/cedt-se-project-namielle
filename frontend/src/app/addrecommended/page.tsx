import AddRecommendedHotel from "@/components/AddRecommendHotel";
import getHotels from "@/libs/getHotels";
import { ContextProvider } from "@/components/ContextProvider";


export default function AddRecommended() {
    const hotels = getHotels();
    return (
        <ContextProvider>
            <div>
                <h1 className="text-center text-3xl font-black pt-10 text-purple-dark dark:text-white-grayish">
                    Make a Recommendation for a Hotel
                </h1>
                <AddRecommendedHotel hotelJson={hotels} />
            </div>  
        </ContextProvider>
    )
}
