'use client'
import getUserProfile from "@/libs/getUserProfile";
import hideReview from "@/libs/hideReview";
import { Rating } from "@mui/material"
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function ReviewBlock({ user, rating, comment, createdAt, id, isHidden }: { user: string, rating: number, comment: string, createdAt: string, id: string, isHidden: boolean }) {
    const [userData, setUserData] = useState<any>(null);
    const { data: session } = useSession();
    const [isHiddenClient, setHidden] = useState(isHidden);

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

    const handleClick = async () => {
        if (!session) return;
        setHidden(!isHiddenClient);
        try {
            hideReview(session?.user.token, id);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: `Review ${isHiddenClient ? "unhides" : "hides"} successfully`,
                showConfirmButton: false,
                timer: 1500
            });
            setHidden(!isHiddenClient);
        } catch (error) {
            console.error(error);
        }
    }

    if (isHidden && userData?.data.role !== 'admin') return null;

    return (
        <div className="relative mx-auto mt-1 mb-5 p-5 pb-2 h-[auto] w-[95%] border border-solid border-slate-500 rounded-2xl">
            <p className="font-semibold text-purple-dark dark:text-white-grayish">{user} </p>
            <Rating value={rating} readOnly></Rating>
            <p className="pb-3 text-purple-dark dark:text-white-grayish">{comment}</p>
            <p className="text-orange-500 text-xs ">this comment is created at: {createdAt}</p>


            {
                userData?.data.role === 'admin' ?
                    <button
                        onClick={handleClick}
                        className={isHiddenClient ?
                            "absolute right-16 top-[35%] w-[200px] h-[50px] text-2xl text-slate-900 font-bold font-sans bg-green-500 hover:bg-slate-800 hover:text-green-500 dark:hover:bg-midnight rounded-2xl"
                            : "absolute right-16 top-[35%] w-[200px] h-[50px] text-2xl text-slate-900 font-bold font-sans bg-red-500 hover:bg-slate-800 hover:text-red-500 dark:hover:bg-midnight rounded-2xl"
                        }>
                        {isHiddenClient ? "Unhide" : "Hide"}
                    </button>
                    : null
            }
        </div>
    )
}
