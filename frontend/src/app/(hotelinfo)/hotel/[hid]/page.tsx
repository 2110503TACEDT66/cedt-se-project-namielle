
import DateBooker from "@/components/DateBooker";
import ReviewBlock from "@/components/ReviewBlock";
import { Rating } from "@mui/material";
import Image from "next/image";
import getHotel from "@/libs/getHotel";
import Link from "next/link";
import getReviewsByHotel from "@/libs/getReviews";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import YourReview from "@/components/YourReview";
import getUserProfile from "@/libs/getUserProfile";

export default async function Detailpage({ params }: { params: { hid: string } }) {




    const hotelDetail = await getHotel(params.hid)

    const review = await getReviewsByHotel(hotelDetail.data.id)
    let AvgReview = 0;
    if (review.count) {
        let sum: number = 0;
        review.data.forEach((item: any) => {
            sum += item.stars
        })
        AvgReview = sum / review.count
    }

    const session = await getServerSession(authOptions);
    var userInfo: any = null;
    if (session) {
        userInfo = await getUserProfile(session.user.token)
    }



    return (
        <main className="h-auto w-full">
            <div className="bg-white h-[500px] w-[90%] mt-5 mx-auto border border-solid border-slate-800 rounded-t-2xl flex">
                <div className="relative h-[100%] w-[35%]">
                    <Image src={`/img/${hotelDetail.data.file}`} alt="bannerImage1" fill={true} priority className="block obj-cover rounded-tl-2xl"></Image>
                </div>

                <div className="p-10">
                    <h1 className="my-2 font-bold text-3xl font-sans">{hotelDetail.data.name}</h1>
                    <div className="h-[20px] w-[100%] flex items-center flex-wrap ">
                        <Rating readOnly value={AvgReview} precision={0.1}></Rating> <span className="text-sm font-light mx-3">reviews by {review.count} persons</span>
                    </div>
                    <p className="m-4 font-medium text-md font-sans">{hotelDetail.data.address}</p>
                    <p className="m-4 font-medium text-md font-sans">Rooms Available: {hotelDetail.data.capacity}</p>
                    <p className="m-4 font-medium text-md font-sans">Tel. {hotelDetail.data.tel}</p>
                </div>

            </div>

            <div className="bg-white h-[80px] w-[90%] mt-5 mx-auto border border-solid border-slate-800 flex  divide-x divide-solid divide-slate-800">
                {/* <div className="leading-none mx-5 w-[35%] flex justify-center items-center">
                    <h1 className="font-semibold text-lg text-slate-800 block mx-5 ">Check In </h1>
                    <DateBooker/> 
                </div> */}
                {/* <div className="leading-none mx-5 w-[35%] flex justify-center items-center">
                    <h1 className="font-semibold text-lg text-slate-800 block mx-5 ">Check Out </h1>
                    <DateBooker/> 
                </div> */}
                <div className="leading-none mx-5 w-[50%] flex justify-center items-center">
                    <h1 className="block font-bold text-green-800 text-4xl">฿ {hotelDetail.data.price}</h1>
                    <h1 className="block text-green-800 text-xl "> /day</h1>
                </div>
                <div className="leading-none mx-5 w-[50%] flex justify-center items-center">
                    <Link href={`/reservation?price=${hotelDetail.data.price}&hid=${params.hid}&name=${hotelDetail.data.name}&file=${hotelDetail.data.file}`} className="flex justify-center items-center">
                        <button className="block p-1 text-2xl text-white font-bold font-sans bg-orange-500 hover:bg-slate-800 hover:text-orange-500 rounded-md">
                            RESERVE
                        </button>
                    </Link>
                </div>

            </div>

            <div className="bg-white h-auto pb-5 w-[90%] mt-5 mx-auto border border-solid border-slate-800 rounded-b-2xl p-2">


                {
                    session && !review.data.some((e: any) => e.user?.email == userInfo?.data.email) ?
                        <>
                            <p className="text-md font-light mx-10 mt-5">Your Review</p>
                            <YourReview hotel={params.hid} />
                        </> : ""
                }



                <p className="text-md font-light mx-10">All reviews</p>
                {
                    review.data.map((item: any) => (

                        <ReviewBlock key={item.user?.name} user={item.user?.name} rating={item.stars} comment={item.description} createdAt={item.createAt.slice(0, 10)} />
                    ))

                }

            </div>
        </main>
    )

}