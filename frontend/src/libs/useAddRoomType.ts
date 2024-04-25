import { useSession } from "next-auth/react";

interface RoomTypeData {
  hotel: string;
  name: string;
  personLimit: number;
  price: number;
  roomLimit: number;
}

const useAddRoomType = () => {
  const { data: session } = useSession();

  const addRoomType = async (roomTypeData: RoomTypeData) => {
    if (!session?.user?.token) {
      throw new Error('Session token is not available');
    }

    const endpoint = `${process.env.BACKEND_URL}/api/v1/roomTypes`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.user.token}`,
      },
      body: JSON.stringify(roomTypeData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Add room type failed");
    }
    
    return await response.json();
  };

  return addRoomType;
};

export default useAddRoomType;
