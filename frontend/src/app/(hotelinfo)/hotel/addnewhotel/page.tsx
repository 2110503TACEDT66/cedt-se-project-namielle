'use client'
import React, { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import adminAddHotel from '@/libs/adminAddHotel';
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation';
import getUserProfile from '@/libs/getUserProfile';

export default function AddNewHotel() {
    const router = useRouter();
    const [userData, setUserData] = useState<any>(null);
    const { data: session } = useSession();

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

    const name = useRef("");
    const address = useRef("");
    const telephone = useRef("");
    const capacity = useRef(0);
    const file = useRef("");
    const price = useRef(0);
    const city = useRef("");

    if (userData?.data.role !== 'admin') {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <div className="text-3xl text-black font-semibold">You are not authorized to access this page</div>
            </div>
        );
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // console.log('submitting form');
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
                title: 'Add Hotel Successful',
                text: 'Your Hotel has been successfully created',
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
            <div className="w-full max-w-lg p-8 rounded-lg shadow-2xl" style={{ backgroundColor: "black" }}>
                <div className="flex justify-center mb-8">
                    <h1 className="text-3xl font-bold" style={{
                        background: "linear-gradient(to right, #B892FF, #8A1DFF)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}>
                        Add New Hotel
                    </h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="w-full h-12 px-3 py-2 text-white bg-gray-900 border-2 border-purple-500 rounded
                             focus:outline-none focus:border-purple-700 hover:border-purple-700 hover:bg-gray-800 hover:scale-105 
                             transition-transform duration-300"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Hotel Name"
                            onChange={(e) => { name.current = e.target.value }}
                            required />
                    </div>
                    <div>
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="address">
                            Address
                        </label>
                        <input
                            className="w-full h-12 px-3 py-2 text-white bg-gray-900 border-2 border-purple-500 rounded
                             focus:outline-none focus:border-purple-700 hover:border-purple-700 hover:bg-gray-800 hover:scale-105
                              transition-transform duration-300"
                            id="address"
                            name="address"
                            type="text"
                            placeholder="Address"
                            onChange={(e) => { address.current = e.target.value }}
                            required />
                    </div>
                    <div>
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="telephone">
                            Telephone (e.g. 091-868-3450)
                        </label>
                        <input
                            className="w-full h-12 px-3 py-2 text-white bg-gray-900 border-2 border-purple-500 
                            rounded focus:outline-none focus:border-purple-700 hover:border-purple-700 hover:bg-gray-800
                             hover:scale-105 transition-transform duration-300"
                            id="telephone"
                            name="telephone"
                            type="text"
                            placeholder="Telephone"
                            pattern='^0\d{2}-\d{3}-\d{4}$'
                            onChange={(e) => { telephone.current = e.target.value }}
                            required />
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="capacity">
                            Capacity
                        </label>
                        <input
                            className="w-full h-12 px-3 py-2 text-white bg-gray-900 border-2 border-purple-500
                             rounded focus:outline-none focus:border-purple-700 hover:border-purple-700 hover:bg-gray-800 
                             hover:scale-105 transition-transform duration-300"
                            id="capacity"
                            name="capacity"
                            type="number"
                            min="0"
                            placeholder="Capacity"
                            onChange={(e) => { capacity.current = parseInt(e.target.value) }}
                            required />
                    </div>
                    <div>
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="city">
                            City
                        </label>
                        <input
                            className="w-full h-12 px-3 py-2 text-white bg-gray-900 border-2 border-purple-500 rounded 
                            focus:outline-none focus:border-purple-700 hover:border-purple-700 hover:bg-gray-800 
                            hover:scale-105 transition-transform duration-300"
                            id="city"
                            name="city"
                            type="text"
                            placeholder="City"
                            onChange={(e) => { city.current = e.target.value }}
                            required />
                    </div>
                    <div>
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="file">
                            Image
                        </label>
                        <input
                            className="w-full h-12 px-3 py-2 text-white bg-gray-900 border-2 border-purple-500 rounded 
                            focus:outline-none focus:border-purple-700 hover:border-purple-700 hover:bg-gray-800 
                            hover:scale-105 transition-transform duration-300"
                            id="file"
                            name="file"
                            type="text"
                            placeholder="Image.png"
                            onChange={(e) => { file.current = e.target.value }}
                            required />
                    </div>
                    <div className="flex justify-center">
                        <button className="w-1/2 py-2 px-6 text-lg rounded focus:outline-none focus:shadow-outline 
                        transition duration-300 ease-in-out transform hover:scale-105" type="submit"
                                style={{
                                    color: 'white',
                                    background: 'linear-gradient(to right, #B892FF, #8A1DFF)',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                }}>
                            Add Hotel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
    
    


}    
