"use client";

import { removeFromCart } from "@/app/redux/features/cartSlice";
import { AppDispatch, RootState, useAppSelector } from "@/app/redux/store";
import getBookings from "@/libs/getBookings";
import userCreateBooking from "@/libs/userCreateBooking";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CheckoutForm from "./StripeCheckout";
import StripeCheckout from "./StripeCheckout";
import { useSelector } from "react-redux";
import getDiscounts from "@/libs/getDiscounts";
import { error } from "console";

export default function CartPanel() {
    const cartItems = useAppSelector(
        (state) => state.cartSlice.CartBookingItems
    );
    const dispatch = useDispatch<AppDispatch>();

    const [discountCode, setDiscountCode] = useState([]);
    const [inputCode, setInputCode] = useState<string>();
    //const [totalPrice,setTotalPrice] = useState(0);
    
    
    useEffect(() => {
        const fetchDiscount = async () => {
            try {
                const result = await getDiscounts();
                setDiscountCode(result.data);
                console.log(result);
            } catch (e) {
                console.log(e);
            }
        };
        fetchDiscount();
    }, []);    

    const { data: session } = useSession();

    let totalPrice = 0;
    cartItems.map((item) => {
        totalPrice += item.price;
    });

    const [discountedPrice, setDiscountedPrice] = useState<number>(0);

    const [bookings, setBookings] = useState();
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                if (!session) return;
                const result = await getBookings(session.user.token);
                setBookings(result);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBookings();
    }, [cartItems]);

    const checkValidDiscount = async () => {
        try {
            const discounts = await getDiscounts();
            let newDiscountedPrice = totalPrice; // ตั้งค่าเริ่มต้นให้เท่ากับราคาทั้งหมด
            for (const discount of discounts.data) {
                if (discount.code === inputCode) {
                    // ปรับราคาหลังจากที่ใช้ส่วนลด
                    newDiscountedPrice = (totalPrice * discount.percentage) / 100;
                    setDiscountedPrice(newDiscountedPrice); // อัพเดทค่าของส่วนลดที่ถูกปรับแล้ว
                    return;
                }
            }
            console.log("Invalid discount code");
        } catch (error) {
            console.error("Error fetching discount", error);
        }
    };
    


    const createBooking = async () => {
        for (const item of cartItems) {
             if (cartItems.length > 3) {

                 alert("You can only book 3 rooms at a time");
                 return; // Exit the function early if the booking limit is exceeded
             }
            try {
                if (!session) return;
                await userCreateBooking(
                    session?.user.token,
                    item.hid,
                    session?.user._id,
                    item.checkInDate,
                    item.checkOutDate,
                    item.picture,
                    item.roomType
                );
            } catch (error) {
                alert("You can only book 3 rooms at a time");
                return; // Exit the function early if the booking creation fails
            }

            dispatch(removeFromCart(item._id));
            // await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for 1000 milliseconds before processing the next item
        }
    };

    return cartItems.length > 0 ? (
        <div className="flex flex-row w-full justify-center">
            <div className="w-[55%]">
                {cartItems.map((item) => {
                    return (
                        <div className="flex flex-row border-solid border-2 border-gray-400 rounded-md mb-3 bg-white">
                            <Image
                                src={`/img/${item.picture}`}
                                alt={item.name}
                                width={200}
                                height={200}
                                className="rounded-sm"
                            />
                            <div className="ml-2 text-black text-">
                                <h1 className="text-2xl">{item.name}</h1>
                                <h2 className="text-xl">
                                    {item.roomName} room
                                </h2>
                                <h3 className="text-sm">
                                    Date: {item.checkInDate} {`->`}{" "}
                                    {item.checkOutDate}
                                </h3>
                                <h3 className="text-2xl pt-3 text-orange-500">
                                    {item.price}.-{" "}
                                </h3>
                            </div>
                            <div className="ml-auto">
                                <button
                                    className="bg-red-500 text-white rounded-lg p-1 m-1"
                                    onClick={() =>
                                        dispatch(removeFromCart(item._id))
                                    }
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="w-[35%]">
                <div className="h-fit text-black ml-[10%] border-solid border-2 border-gray-400 rounded-md bg-white">
                    <div className="p-4 mx-8">
                        <div className="text-xl font-bold text-center mt-3 mb-5">
                            Your Cart
                        </div>
                        <table className="border-collapse w-full">
                            <tbody>
                                <tr>
                                    <td
                                        colSpan={2}
                                        className="border border-gray-400 px-4 py-2"
                                    ></td>
                                </tr>
                                {cartItems.map((item) => {
                                    return (
                                        <tr>
                                            <td className="border border-gray-400 px-4 py-2">
                                                <h3 className="text-md">
                                                    {item.name}
                                                </h3>
                                            </td>
                                            <td className="border border-gray-400 px-4 py-2 text-right">
                                                <h3 className="text-md">
                                                    ฿ {item.price.toFixed(2)}.-
                                                </h3>
                                            </td>
                                        </tr>
                                    );
                                })}
                                <tr>
                                    <td
                                        colSpan={2}
                                        className="border border-gray-400 px-4 py-2"
                                    ></td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-400 px-4 py-2">
                                        <h3 className="text-sm">Price: </h3>
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2 text-right">
                                        <h3 className="text-sm">
                                            ฿ {totalPrice.toFixed(2)}.-
                                        </h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-400 px-4 py-2">
                                        <h3 className="text-sm">
                                            Service Fee:{" "}
                                        </h3>
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2 text-right">
                                        <h3 className="text-sm">
                                            ฿ {(totalPrice * 0.3).toFixed(2)}.-
                                        </h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-400 px-4 py-2">
                                        <h3 className="text-sm">Discount: </h3>
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2 text-right">
                                        <h3 className="text-sm">
                                           - ฿ {discountedPrice.toFixed(2)}.-
                                        </h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-400 px-4 py-2">
                                        <h3 className="text-md font-bold">
                                            Total Price:{" "}
                                        </h3>
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2 text-right">
                                        <h3 className="text-sm">
                                            ฿ {((totalPrice * 1.3)-discountedPrice).toFixed(2)}.-
                                        </h3>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <form className="mt-4">
                                <input
                                    type="text"
                                    className="border border-gray-400 px-4 py-2 w-full"
                                    placeholder="Discount Code"
                                    value={inputCode}
                                    onChange={(e) => setInputCode(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg mt-2"
                                    onClick={checkValidDiscount}
                                >
                                    Apply
                                </button>
                            </form>
                        </div>
                        <div className="text-lg mt-4 font-bold">
                            Choose Your Payment Method
                            <div className="flex flex-row item-center">
                                <Image
                                    src="/img/bitcoin.png"
                                    alt="bitcoin"
                                    width={40}
                                    height={40}
                                    className="mr-2 transition ease-in-out hover:scale-110"
                                />
                                <Image
                                    src="/img/visa.png"
                                    alt="visa"
                                    width={40}
                                    height={40}
                                    className="mr-2 transition ease-in-out hover:scale-110"
                                />
                                <Image
                                    src="/img/mastercard.png"
                                    alt="mastercard"
                                    width={40}
                                    height={40}
                                    className="mr-2 transition ease-in-out hover:scale-110"
                                />
                                <Image
                                    src="/img/paypal.png"
                                    alt="paypal"
                                    width={40}
                                    height={40}
                                    className="mr-2 transition ease-in-out hover:scale-110"
                                />
                            </div>
                        </div>

                        <div className="flex flex-row justify-center mt-5">
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
                                onClick={createBooking}
                            >
                                Book Now
                            </button>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <StripeCheckout cartItems={cartItems} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="flex flex-row w-full justify-center">
            <div className="text-center flex flex-row justify-center">
                No item in cart
            </div>
        </div>
    );
}
