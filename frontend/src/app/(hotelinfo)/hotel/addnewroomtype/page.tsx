'use client'
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import useAddRoomType from '@/libs/useAddRoomType'; 
import getHotels from '@/libs/getHotels'; 
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation'; 


interface Hotel {
  _id: string;
  name: string;
}

export default function AddNewRoomType() {
  const router = useRouter();
  const { data: session } = useSession();
  const addRoomType = useAddRoomType();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [formData, setFormData] = useState({
    hotel: '',
    name: '',
    personLimit: '',
    price: '',
    roomLimit: '',
  });

  useEffect(() => {
    
    async function loadHotels() {
      try {
        const { data } = await getHotels();
        setHotels(data); 
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    }
    loadHotels();
  }, []);

 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    const personLimitNumber = parseInt(formData.personLimit, 10);
    const priceNumber = parseFloat(formData.price);
    const roomLimitNumber = parseInt(formData.roomLimit, 10);

    
    if (!formData.hotel || !formData.name || isNaN(personLimitNumber) || isNaN(priceNumber) || isNaN(roomLimitNumber)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Form Data',
        text: 'Please provide all required fields correctly.',
        confirmButtonText: 'OK'
      });
      return;
    }

   
    try {
      await addRoomType({
        ...formData,
        personLimit: personLimitNumber,
        price: priceNumber,
        roomLimit: roomLimitNumber,
      });
      router.push('/hotel'); 
      Swal.fire({
        icon: 'success',
        title: 'Successfully added room type',
        text: 'Room type has been added successfully',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error('Error adding room type:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to add room type',
        text: 'There was a problem adding the room type.',
        confirmButtonText: 'OK'
      });
    }
  };

 
  if (!session) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="text-3xl text-black font-semibold">Please sign in to access this page</div>
      </div>
    );
  }


  return (
    <div className="flex justify-center items-center h-screen"
    style={{
        backgroundColor: "hsla(0,100%,50%,1)",
        backgroundImage: `
          radial-gradient(at 40% 20%, hsla(290,72%,45%,1) 0px, transparent 50%),
          radial-gradient(at 80% 0%, hsla(266,61%,45%,0.96) 0px, transparent 50%),
          radial-gradient(at 0% 50%, hsla(289,19%,52%,1) 0px, transparent 50%),
          radial-gradient(at 80% 50%, hsla(319,70%,53%,1) 0px, transparent 50%),
          radial-gradient(at 0% 100%, hsla(267,60%,74%,1) 0px, transparent 50%),
          radial-gradient(at 80% 100%, hsla(287,72%,54%,1) 0px, transparent 50%),
          radial-gradient(at 0% 0%, hsla(307,38%,86%,1) 0px, transparent 50%)
        `
      }}
    >
       <div className="w-full max-w-lg p-8 rounded-lg shadow-2xl" style={{ backgroundColor: "#1E1E1E" }}>
       <div className="flex justify-center mb-8">
                    <h1 
                        className="text-3xl font-bold" 
                        style={{
                            background: "linear-gradient(to right, #B892FF, #8A1DFF)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}
                    >
                        Add New Roomtype
                    </h1>
      
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="hotel" className="block text-white text-sm font-bold mb-2">Hotel</label>
            <select
              id="hotel"
              name="hotel"
              value={formData.hotel}
              onChange={handleChange}
              className="w-full h-12 px-3 py-2 text-white bg-gray-900 border-2 border-purple-500 rounded focus:outline-none focus:border-purple-700"
              required
            >
              <option value="">Select a Hotel</option>
              {hotels.map(hotel => (
                <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="name" className="block text-white text-sm font-bold mb-2">Room Type Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Room Type Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-12 px-3 py-2 text-white bg-gray-900 border-2 border-purple-500 rounded focus:outline-none focus:border-purple-700"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="personLimit" className="block text-white text-sm font-bold mb-2">Person Limit</label>
            <input
              id="personLimit"
              name="personLimit"
              type="number"
              min="1"
              placeholder="Person Limit"
              value={formData.personLimit}
              onChange={handleChange}
              className="w-full h-12 px-3 py-2 text-white bg-gray-900 border-2 border-purple-500 rounded focus:outline-none focus:border-purple-700"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="price" className="block text-white text-sm font-bold mb-2">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full h-12 px-3 py-2 text-white bg-gray-900 border-2 border-purple-500 rounded focus:outline-none focus:border-purple-700"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="roomLimit" className="block text-white text-sm font-bold mb-2">Room Limit</label>
            <input
              id="roomLimit"
              name="roomLimit"
              type="number"
              min="1"
              placeholder="Room Limit"
              value={formData.roomLimit}
              onChange={handleChange}
              className="w-full h-12 px-3 py-2 text-white bg-gray-900 border-2 border-purple-500 rounded focus:outline-none focus:border-purple-700"
              required
            />
          </div>
          <div className="flex justify-center">
          <button className="w-1/2 py-2 px-6 text-lg rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"type="submit"
                            style={{
                                     color: 'white',
                                     background: 'linear-gradient(to right, #B892FF, #8A1DFF)',
                                     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                   }}
>
                         Add Roomtype
                    </button>
          </div>
        </form>
      </div>
    </div>
  );
  
}