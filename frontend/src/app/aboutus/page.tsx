import Image from "next/image"

export default function aboutus() {
    return (
        <main className="text-center items-center p-5 bg-white dark:bg-midnight-blue mx-20 my-10 border rounded-lg border-black">
            <h1 className="font-bold text-2xl mb-4 text-purple-dark dark:text-white-grayish">NAMIELLE</h1>
            <p className="mx-[15%] text-purple-dark dark:text-white-grayish">
            Welcome to Namielle, your ultimate destination for streamlined hotel bookings and memorable experiences. 
            At Namielle, we prioritize the importance of securing the perfect accommodation for your travels. Our intuitive platform 
            and broad range of hotels worldwide are designed to simplify your booking process and enhance your travel experience. Whether 
            you’re embarking on a leisurely beach vacation, a business journey, or a romantic getaway, we’re here to support you. Our team 
            is committed to delivering outstanding service and ensuring that every detail of your stay exceeds your expectations. Choose Namielle 
            for your next adventure, and let us turn your travel dreams into reality.</p>
            <h2 className="ml-[70%] mt-[2%] text-lg text-purple-dark dark:text-white-grayish">
            Namielle 'Hotel' Book, Founder of NAMIELLE™
            </h2>
            <Image src={'/img/johnbook.png'} alt={'johnbook'} width={700} height={700} className="ml-[30%]" />
        </main>
    )
}
