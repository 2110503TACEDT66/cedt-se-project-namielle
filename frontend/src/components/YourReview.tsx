'use client'
import PostReview from "@/libs/postReview";
import { Rating } from "@mui/material"
import { useSession } from "next-auth/react";
import { FormEvent, useRef, useState } from "react"
import { useRouter } from "next/navigation";

export default function YourReview({ hotel }: { hotel: string }) {
    const text = useRef("");
    const [rating, setRating] = useState<number | null>(0);

    const { data: session } = useSession();

    const router = useRouter()
    const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!session || !rating || !text) return;
        await PostReview(hotel, session.user.token, rating, text.current)
        router.refresh();
    }


    return (
        <form className="mx-auto mt-1 mb-5 h-[auto] p-5 w-[95%] border border-solid border-slate-500 rounded-2xl dark:bg-midnight-blue" onSubmit={handleSumbit}>
            <Rating aria-required value={rating} onChange={(e, v) => { setRating(v) }}></Rating>
            <button className="float-right h-[40px] px-3 text-md text-white font-sans font-semibold bg-orange-500 hover:bg-slate-800 hover:text-orange-500 dark:hover:bg-midnight rounded-md"
                onClick={() => {}}>Post Review</button>
            <textarea required className="h-[100px] w-full px-5 py-2 mt-2 dark:text-white-grayish dark:bg-midnight rounded-2xl" onChange={(e) => { text.current = e.target.value }}></textarea>
        </form>

    )

}
