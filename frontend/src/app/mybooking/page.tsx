'use client'

import Image from "next/image"
import getBookings from "@/libs/getBookings"
import { BookingItem } from "../../../interface";
import userDeleteBooking from "@/libs/userDeleteBooking";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import DateBooker from "@/components/DateBooker";
import dayjs, { Dayjs } from "dayjs";
import EditBooking from "@/components/EditBooking";

export default function mybooking() {
    const {data:session} = useSession();
    // console.log(session);
    if (!session) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div>
                    <h1 className="text-3xl text-center">You are not logged in</h1>
                    <p className="text-center">Please log in to view your bookings.</p>
                </div>
            </div>
        );
    }

    const [bookings, setBookings] = useState<any>();
    const [deleteBooking, setDeleteBooking] = useState<string | null>(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingBooking, setEditingBooking] = useState<BookingItem | null>(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const result = await getBookings(session.user.token);
                setBookings(result);

            } catch (error) {
                console.error(error);
            }
        }
        fetchBookings();
    }, [deleteBooking, showEditForm])

    useEffect(() => {
        const fetchDeleteBooking = async () => {
            try {
                if(deleteBooking === null) return;
                const result = await userDeleteBooking(session.user.token, deleteBooking);
                setDeleteBooking(result);
            } catch (error) {
                console.error(error);
            }
        }
        if (deleteBooking) {
            fetchDeleteBooking();
        }
    }, [deleteBooking])

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
        setShowEditForm(false);
        setEditingBooking(null);
    };

    return (
        <div>
            <div className="flex justify-center items-center text-3xl pt-10">
                My Booking
                <Image
                    src="/img/hotel-logo.png"
                    alt="hotel-logo"
                    width={40}
                    height={40}
                    className="ml-2"
                />
            </div>

            <div className="flex flex-row pl-20 pr-20 pt-10 h-auto bg-paper justify-center items-center">
                <div className="w-[80%] h-auto">
                    {bookings?.count > 0 ? (
                        bookings?.data.map((booking: BookingItem) => (
                            <div key={booking._id} className="flex flex-row border-solid border-2 border-gray-400 rounded-md mb-3 bg-white ">
                                <Image
                                    src={`/img/${booking.hotel.file}`}
                                    alt={booking.hotel.name}
                                    width={200}
                                    height={200}
                                    className="rounded-sm w-[20%] h-[80%]"
                                />
                                <div className="ml-2 text-black">
                                    <h1 className="text-2xl font-bold">{booking.hotel.name}</h1>
                                    <h3 className="text-xl text-gray-700">
                                        Date: {booking.checkInDate} {`->`} {booking.checkOutDate}
                                    </h3>
                                    <h4 className="text-md text-gray-600">User ID: {booking.user}</h4>
                                </div>
                                <div className="ml-auto flex flex-row h-[80%]">
                                    <button className="bg-blue-500 w-[50%] text-white rounded-lg p-1 m-1 hover:bg-blue-700 text-white rounded-lg transition duration-300 transform hover:scale-105" onClick={() => handleEditClick(booking)}>
                                        Edit
                                    </button>

                                    <button className="bg-red-500 w-[50%] text-white rounded-lg p-1 m-1 hover:bg-red-700 text-white rounded-lg transition duration-300 transform hover:scale-105" onClick={() => { setDeleteBooking(booking._id); }}>
                                        Cancel Booking
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex justify-center h-auto bg-paper m-10">
                            No Booking D:
                        </div>
                    )}
                </div>
            </div>

            {showEditForm && editingBooking && (
                <EditBooking booking={editingBooking} onCancel={handleCancelEdit} onSave={handleSaveEdit} />
            )}
        </div>
    );
}
