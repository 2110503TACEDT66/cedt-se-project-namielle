"use client";

import { removeFromCart } from "@/app/redux/features/cartSlice";
import { AppDispatch, RootState, useAppSelector } from "@/app/redux/store";
import getBookings from "@/libs/getBookings";
import userCreateBooking from "@/libs/userCreateBooking";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { use, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import StripeCheckout from "./StripeCheckout";
import { CartItem, discountJson } from "../../interface";
import Swal from "sweetalert2";
import getDiscounts from "@/libs/getDiscounts";
import { Rating } from "@mui/material";
const dayjs = require("dayjs");

export default function CartPanel() {
    const cartItems = useAppSelector(
        (state) => state.cartSlice.CartBookingItems
    );
    const dispatch = useDispatch<AppDispatch>();
    const { data: session } = useSession();
    const [bookingCount, setBookingCount] = useState<number>(0);
    const [discountCode, setDiscountCode] = useState<discountJson>();
    const [inputCode, setInputCode] = useState<string>("");
    const [discountedPrice, setDiscountedPrice] = useState<number>(0);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const bookings = await getBookings(
                    session?.user.token as string
                );
                setBookingCount(bookings.count + cartItems.length);
            } catch (e) {
                console.log(e);
            }
        };
        fetchBookings();
    });

    useEffect(() => {
        const fetchDiscount = async () => {
            try {
                const result = await getDiscounts();
                setDiscountCode(result);
            } catch (e) {
                console.log(e);
            }
        };
        fetchDiscount();
    }, []);
    let totalPrice = 0;
    cartItems.map((item) => {
        console.log(item);
        totalPrice += item.price;
    });

    const checkValidDiscount = async () => {
        try {
            if (!discountCode) throw new Error("Fail to fetch Discount Code");
            let newDiscountedPrice = totalPrice; // ตั้งค่าเริ่มต้นให้เท่ากับราคาทั้งหมด
            for (const discount of discountCode.data) {
                if (discount.code === inputCode) {
                    // ปรับราคาหลังจากที่ใช้ส่วนลด
                    newDiscountedPrice =
                        (totalPrice * discount.percentage) / 100;
                    setDiscountedPrice(newDiscountedPrice); // อัพเดทค่าของส่วนลดที่ถูกปรับแล้ว
                    return;
                } else {
                    setDiscountedPrice(0);
                }
            }
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid code!",
            });
        } catch (error) {
            console.error("Error fetching discount", error);
        }
    };

    const formatter = new Intl.NumberFormat("th-TH", {
        style: "currency",
        currencyDisplay: "code",
        currency: "THB",
    });

    return cartItems.length > 0 ? (
        <div className="flex flex-row w-full justify-center">
            <div className="w-[55%] h-full">
                {cartItems.map((item) => {
                    const checkInDate = dayjs(item.checkInDate).format(
                        "D MMMM YYYY"
                    );
                    const checkOutDate = dayjs(item.checkOutDate).format(
                        "D MMMM YYYY"
                    );
                    return (
                        <div className="flex flex-row border-solid border-2 border-gray-400 rounded-md mb-3 bg-white dark:bg-midnight-blue">
                            <div className="w-[200px] h-[200px] relative">
                                <Image
                                    src={`${item.picture}`}
                                    alt={item.name}
                                    fill={true}
                                    className="object-cover rounded-sm"
                                />
                            </div>
                            <div className="ml-1 p-2 text-black dark:text-white-grayish">
                                <h1 className="text-2xl font-bold">{item.name}</h1>
                                <h2 className="text-xl">
                                    {item.roomName} room
                                </h2>
                                <div className="flex gap-1">
                                    <Rating
                                        name="read-only"
                                        value={item.review.rating}
                                        precision={0.1}
                                        readOnly
                                    />
                                    <div className="text-bold">({item.review.rating})</div>
                                    <div className="opacity-50">{item.review.count} reviews</div>
                                    
                                </div>
                                <h3 className="text-sm mt-2">
                                    Date: {checkInDate} {`->`} {checkOutDate}
                                </h3>
                                <h3 className="text-sm mt-1">
                                    Address: {item.address}
                                </h3>
                                <h3 className="text-2xl pt-3 text-orange-500">
                                    {formatter.format(item.price)}
                                    .-
                                </h3>
                            </div>
                            <div className="ml-auto">
                                <Image
                                    src={"/img/delete.png"}
                                    className="cursor-pointer m-1 bg-red-error rounded-lg"
                                    width={40}
                                    height={40}
                                    alt="delete"
                                    onClick={() => {
                                        Swal.fire({
                                            title: "Are you sure?",
                                            text: "You won't be able to revert this!",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#d33",
                                            cancelButtonColor: "#3085d6",
                                            confirmButtonText:
                                                "Yes, delete it!",
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                Swal.fire({
                                                    title: "Deleted!",
                                                    text: "Your booking has been deleted.",
                                                    icon: "success",
                                                });
                                                dispatch(
                                                    removeFromCart(item._id)
                                                );
                                            }
                                        });
                                    }}
                                ></Image>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="w-[35%] ">
                <div className="h-full text-black dark:text-white-grayish ml-[10%] border-solid border-2 border-gray-400 rounded-md bg-white dark:bg-midnight-blue">
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
                                                    {formatter.format(
                                                        item.price
                                                    )}
                                                    .-
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
                                            {formatter.format(totalPrice)}.-
                                        </h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-400 px-4 py-2">
                                        <h3 className="text-sm">Discount: </h3>
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2 text-right">
                                        <h3 className="text-sm text-orange-sweet">
                                            -{" "}
                                            {formatter.format(discountedPrice)}
                                            .-
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
                                            {formatter.format(
                                                totalPrice - discountedPrice
                                            )}
                                            .-
                                        </h3>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <form className="mt-4">
                                <label className="font-bold text-lg">
                                    Input your discount code here.
                                </label>
                                <div className="flex">
                                    <input
                                        type="text"
                                        className="border border-gray-400 px-4 py-2 w-full bg-white dark:bg-midnight-dark rounded-lg"
                                        placeholder="Discount Code"
                                        value={inputCode}
                                        onChange={(e) =>
                                            setInputCode(e.target.value)
                                        }
                                    />
                                    <button
                                        type="button"
                                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg ml-2"
                                        onClick={checkValidDiscount}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="flex flex-row justify-center mt-5">
                            {bookingCount > 3 ? (
                                <button
                                    className="bg-slate-400 hover:bg-slate-600 text-white font-semibold py-3 w-full rounded-lg transition duration-300 transform hover:scale-105"
                                    onClick={() => {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Oops...",
                                            text: "You can only book 3 rooms",
                                        });
                                    }}
                                >
                                    Nah
                                </button>
                            ) : (
                                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 w-full rounded-lg transition tracking-wide duration-300 transform hover:scale-105">
                                    <StripeCheckout
                                        cartItems={cartItems}
                                        discountCode={inputCode}
                                    />
                                    <span className="absolute top-0 left-0 w-0 h-full bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                                </button>
                            )}
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
