import React, { useEffect, useState } from 'react';
import DateBooker from './DateBooker';
import dayjs, { Dayjs } from 'dayjs';
import { BookingItem } from '../../interface';
import userUpdateBooking from '@/libs/userUpdateBooking';
import { useSession } from 'next-auth/react';

const EditBooking = ({ booking, onCancel, onSave }: { booking: BookingItem, onCancel: () => void, onSave: ()=> void }) => {
    const {data:session} = useSession();

    const [checkInDate, setCheckInDate] = useState<Dayjs>(booking.checkInDate ? dayjs(booking.checkInDate) : dayjs());
    const [checkOutDate, setCheckOutDate] = useState<Dayjs>(booking.checkOutDate ? dayjs(booking.checkOutDate) : dayjs());

    const [updateBooking, setUpdateBooking] = useState<BookingItem | null>(null);

    useEffect(() => {
        const fetchUpdateBookings = async () => {
            
            try {
                if(!session) return;
                const result = await userUpdateBooking(session?.user.token, booking._id, checkInDate.format('YYYY-MM-DD'), checkOutDate.format('YYYY-MM-DD'));
                setUpdateBooking(result);
            } catch (error) {
                console.error(error);
            }
        }
        fetchUpdateBookings();
    },[updateBooking, onSave]
    )


    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="modal-content bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Edit: {booking.hotel.name}</h2>
                <h2 className="text-md font-semibold text-gray-800 mb-2">Current Booking: {booking.checkInDate} to {booking.checkOutDate}</h2>
                <h2 className="text-sm text-gray-800 mb-2">User: {booking.user}</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Check In</h2>
                        <DateBooker onDateChange={(value: Dayjs) => { setCheckInDate(value) }} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Check Out</h2>
                        <DateBooker onDateChange={(value: Dayjs) => { setCheckOutDate(value) }} />
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-4"  onClick={onSave}>Save</button>
                    <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EditBooking;
