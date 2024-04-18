'use client'
import React, { useRef } from 'react';
import { useSession } from 'next-auth/react';
import adminAddHotel from '@/libs/adminAddHotel';
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation';

export default function AddNewHotel() {
    const router = useRouter();
    const { data: session } = useSession();

    if (session?.user.role !== 'admin') {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <div className="text-3xl text-black font-semibold">You are not authorized to access this page</div>
            </div>
        );
    }

    const name = useRef("");
    const address = useRef("");
    const telephone = useRef("");
    const capacity = useRef(0);
    const file = useRef("");
    const price = useRef(0);
    const city = useRef("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('submitting form');
        try {
            if (!session) return;
            
            const response = await adminAddHotel(
                session?.user.token,
                name.current,
                address.current,
                telephone.current,
                capacity.current,
                file.current,
                price.current,
                city.current
            );
            router.push("/hotel");
            Swal.fire({
                icon: 'success',
                title: 'Booking Successful',
                text: 'Your booking has been successfully created',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            console.error('Error adding hotel:', error);
            Swal.fire({
                icon: 'error',
                title: 'Add Hotel Failed',
                text: 'Your hotel has failed to be added',
                confirmButtonText: 'OK'
            });
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-lg p-8 bg-black rounded-lg shadow-xl">
                <div className="flex justify-center mb-8">
                    <div className="text-3xl text-white font-semibold">Add New Hotel</div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-blue-500"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Hotel Name"
                            onChange={(e) => { name.current = e.target.value }}
                            required/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="address">
                            Address
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-blue-500"
                            id="address"
                            name="address"
                            type="text"
                            placeholder="Address"
                            onChange={(e) => { address.current = e.target.value }}
                            required/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="telephone">
                            Telephone
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-blue-500"
                            id="telephone"
                            name="telephone"
                            type="text"
                            placeholder="Telephone"
                            onChange={(e) => { telephone.current = e.target.value }}
                            required/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="price">
                            Price
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-blue-500"
                            id="price"
                            name="price"
                            type="text"
                            placeholder="Price"
                            onChange={(e) => { price.current = parseInt(e.target.value) }}
                            required/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="capacity">
                            Capacity
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-blue-500"
                            id="capacity"
                            name="capacity"
                            type="number"
                            min="0"
                            placeholder="Capacity"
                            onChange={(e) => { capacity.current = parseInt(e.target.value) }}
                            required/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="city">
                            City
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-blue-500"
                            id="city"
                            name="city"
                            type="text"
                            placeholder="City"
                            onChange={(e) => { city.current = e.target.value }}
                            required/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="file">
                            Image URL
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-blue-500"
                            id="file"
                            name="file"
                            type="text"
                            placeholder="Image URL"
                            onChange={(e) => { file.current = e.target.value }}
                            required/>
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Add Hotel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
