"use client";

import Image from "next/image";
import getBookings from "@/libs/getBookings";
import { BookingItem } from "../../../interface";
import userDeleteBooking from "@/libs/userDeleteBooking";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import DateBooker from "@/components/DateBooker";
import dayjs, { Dayjs } from "dayjs";
import EditBooking from "@/components/EditBooking";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { removeAllFromCart } from "../redux/features/cartSlice";
import getRoomType from "@/libs/getRoomType";
import getUserProfile from "@/libs/getUserProfile";
import getReviewsByHotel from "@/libs/getReviews";
import { Rating } from "@mui/material";
import Swal from "sweetalert2";

export default function mybooking() {
    const params = useSearchParams();
    const successfulCheckout = params.get("success");
    // console.log(successfulCheckout);
    const dispatch = useDispatch<AppDispatch>();
    const { data: session } = useSession();

    if (successfulCheckout == "true") {
        dispatch(removeAllFromCart());
        // console.log("Cart is cleared");
    }

    // console.log(session);
    if (!session) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div>
                    <h1 className="text-3xl text-center">
                        You are not logged in
                    </h1>
                    <p className="text-center">
                        Please log in to view your bookings.
                    </p>
                </div>
            </div>
        );
    }

    const [bookings, setBookings] = useState<any>();
    const [deleteBooking, setDeleteBooking] = useState<string | null>(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingBooking, setEditingBooking] = useState<BookingItem | null>(
        null
    );

    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            // console.log(session)
            if (session) {
                const userData = await getUserProfile(session?.user.token);
                setUserData(userData);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const result = await getBookings(session.user.token);
                for (let i = 0; i < result.data.length; i++) {
                    const room = await getRoomType(
                        session.user.token,
                        result.data[i].roomType
                    );
                    result.data[i].roomDetail = room;

                    // const review = String (result.data[i].hotel.object);
                    const review = await getReviewsByHotel(
                        result.data[i].hotel.id
                    );
                    let AvgReview = 0;
                    if (review.count) {
                        let sum: number = 0;
                        review.data.forEach((item: any) => {
                            sum += item.stars;
                        });
                        AvgReview = sum / review.count;
                    }
                    result.data[i].review = {};
                    result.data[i].review.rating = AvgReview.toFixed(1);
                    result.data[i].review.count = review.count;
                }
                // console.log(result);
                setBookings(result);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBookings();
    }, [deleteBooking, showEditForm]);

    useEffect(() => {
        const fetchDeleteBooking = async () => {
            try {
                if (deleteBooking === null) return;
                const result = await userDeleteBooking(
                    session.user.token,
                    deleteBooking
                );
                setDeleteBooking(result);
            } catch (error) {
                console.error(error);
            }
        };
        if (deleteBooking) {
            fetchDeleteBooking();
        }
    }, [deleteBooking]);

    const handleEditClick = (booking: BookingItem) => {
        setEditingBooking(booking);
        setShowEditForm(true);
    };

    const handleCancelEdit = () => {
        setShowEditForm(false);
        setEditingBooking(null);
    };

    const handleSaveEdit = () => {
        // Logic to save the edited booking
        Swal.fire({
            title: "Do you want to save the changes?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText:
                "Save",
        }).then((result) => {
            if(result.isConfirmed){
                Swal.fire({
                    title: "Save!",
                    icon: "success",
                });
                setShowEditForm(false);
                setEditingBooking(null);
            }
        });
    };

    return (
        <div>
            <div className="flex justify-center items-center text-3xl pt-10 text-purple-dark dark:text-white-grayish">
                {
                    userData?.data.role === "admin"
                    ? <span>All Booking</span>
                    : <span>My Booking</span>
                }
                <Image
                    src="/img/hotel-logo.png"
                    alt="hotel-logo"
                    width={40}
                    height={40}
                    className="ml-2 dark:bg-white dark:rounded-md"
                />
            </div>

            <div className="flex flex-row px-20 pt-10 h-full justify-center items-center">
                <div className="w-[80%] h-full">
                    {bookings?.count > 0 ? (
                        bookings?.data.map((booking: BookingItem) => {
                            const checkInDate = dayjs(
                                booking.checkInDate
                            ).format("D MMMM YYYY");
                            const checkOutDate = dayjs(
                                booking.checkOutDate
                            ).format("D MMMM YYYY");
                            return (
                                <div
                                    key={booking._id}
                                    className="flex flex-row border-solid border-2 border-gray-400 rounded-md mb-3 bg-white dark:bg-midnight-blue"
                                >
                                    <div className="w-[200px] h-[200px] relative">
                                        <Image
                                            src={`${booking.hotel.file}`}
                                            alt={booking.hotel.name}
                                            fill={true}
                                            className="object-cover rounded-sm"
                                        />
                                    </div>
                                    <div className="ml-1 p-2 text-black dark:text-white-grayish">
                                        <h1 className="text-2xl font-bold">
                                            {booking.hotel.name}
                                        </h1>
                                        <h2 className="text-xl">
                                            {booking.roomDetail.data.name} room
                                        </h2>
                                        <div className="flex gap-1">
                                            <Rating
                                                name="read-only"
                                                value={booking.review.rating}
                                                precision={0.1}
                                                readOnly
                                            />
                                            <div className="text-bold">
                                                ({booking.review.rating})
                                            </div>
                                            <div className="opacity-50">
                                                {booking.review.count} reviews
                                            </div>
                                        </div>
                                        <h3 className="text-sm mt-2">
                                            Date: {checkInDate} {`->`}{" "}
                                            {checkOutDate}
                                        </h3>
                                        <h3 className="text-lg mt-1">
                                            Address: {booking.hotel.address}
                                        </h3>
                                    </div>
                                    <div className="ml-auto flex flex-row h-[80%]">
                                        <button
                                            className="bg-blue-500 w-[50%] text-white rounded-lg p-1 m-1 hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                                            onClick={() =>
                                                handleEditClick(booking)
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="bg-red-500 w-[50%] text-white rounded-lg p-1 m-1 hover:bg-red-700 transition duration-300 transform hover:scale-105"
                                            onClick={() => {
                                                Swal.fire({
                                                    title: "Are you sure?",
                                                    text: "You won't be able to revert this!",
                                                    icon: "warning",
                                                    showCancelButton: true,
                                                    confirmButtonColor: "#d33",
                                                    cancelButtonColor:
                                                        "#3085d6",
                                                    confirmButtonText:
                                                        "Yes, Cancel it!",
                                                }).then((result) => {
                                                    if(result.isConfirmed){
                                                        Swal.fire({
                                                            title: "Cancel!",
                                                            text: "Your booking has been canceled.",
                                                            icon: "success",
                                                        });
                                                        setDeleteBooking(
                                                            booking._id
                                                        );
                                                    }
                                                });
                                            }}
                                        >
                                            Cancel Booking
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="flex justify-center h-auto m-10 dark:text-white-grayish">
                            No Booking D:
                        </div>
                    )}
                </div>
            </div>

            {showEditForm && editingBooking && (
                <EditBooking
                    booking={editingBooking}
                    onCancel={handleCancelEdit}
                    onSave={handleSaveEdit}
                />
            )}
        </div>
    );
}
