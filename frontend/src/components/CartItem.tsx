// //Temporary Cart Item Component will be remove soon
// import Image from "next/image";

// export default function CartItem({ hotelName, imgSrc, price, buttonName, checkInDate, checkOutDate }: { hotelName: string, imgSrc: string, price: number, buttonName: string, checkInDate: string, checkOutDate: string }) {
//     return (
//         <div className="flex flex-row border-solid border-2 border-gray-400 rounded-md mb-3 bg-white">
//             <Image src={imgSrc} alt={hotelName} width={200} height={200} className="rounded-sm" />
//             <div className="ml-2 text-black text-">
//                 <h1 className="text-xl">{hotelName}</h1>
//                 <h3 className="text-sm">Date: {checkInDate} {`->`} {checkOutDate}</h3>
//                 <h3 className="text-2xl pt-3 text-orange-500">{price}.- </h3>
//             </div>
//             <div className="ml-auto">
//                 <button className="bg-red-500 text-white rounded-lg p-1 m-1">{buttonName}</button>
//             </div>
//         </div>
//     )
// }