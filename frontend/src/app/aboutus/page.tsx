import Image from "next/image"

export default function aboutus(){
    return(
        <main className="text-center items-center p-5 bg-white mx-20 my-10 border rounded-lg border-black">
            <h1 className="font-bold text-2xl mb-4">John Book</h1>
            <p className="mx-[15%]">
            Welcome to John Book, your premier destination for seamless hotel bookings and unforgettable stays. At John Book, we understand the importance of finding the perfect accommodation for your travels. With our user-friendly platform and extensive selection of hotels worldwide, we strive to make your booking experience effortless and enjoyable. Whether you're planning a relaxing beach getaway, a business trip, or a romantic escape, we've got you covered. Our team is dedicated to providing exceptional service and ensuring that every aspect of your stay meets your expectations. Trust John Book to help you find the ideal hotel for your next adventure, and let us make your travel dreams a reality.
            </p>
            <h2 className="ml-[70%] mt-[2%] text-l">
                John 'Hotel' Book, Founder of John Book™
            </h2>
            <Image src={'/img/johnbook.png'} alt={'johnbook'} width={700} height={700} className="ml-[30%]"/>
        </main>
    )
}