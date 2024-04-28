'use client'

import { FormEvent, useRef, useState } from "react"

import PostDiscount from "@/libs/postDiscount";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";


export default function EditDiscount() {
    const name = useRef("");
    const info = useRef("");
    const code = useRef("");
    const percentage = useRef("");
    const image = useRef("");

    const [errMsg, setErrMsg] = useState("");
    const { data: session } = useSession();

    const router = useRouter()
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Swal.fire({
            title: "Created!",
            icon: "success",
        });
        if (!session || !info || !name || !code || !image || !percentage) return;
        await PostDiscount( name.current, info.current,code.current ,percentage.current, image.current, session.user.token)
        router.push("/discount");
        // router.refresh();
        // window.location.reload();
    }

    return (
        <div className="flex justify-center items-center h-full">
            <form className="w-[50%] flex flex-col" onSubmit={handleSubmit}>
                <label className="text-violet-500 font-sans font-black text-8xl mb-8 center">Create Discount</label>

                <div className="flex flex-col items-start w-full mb-4">
                    <label htmlFor="name" className="text-purple-dark dark:text-white-grayish font-sans mb-2">Name </label>
                    <input
                        required
                        placeholder="Enter name"
                        type="text"
                        id="name"
                        className="border border-slate-500 p-2 font-sans w-full h-12 dark:bg-midnight-blue dark:text-white-grayish"
                        onChange={(e) => { name.current = e.target.value }}
                    />
                </div>
    
                <div className="flex flex-col items-start w-full mb-4">
                    <label htmlFor="info" className="text-purple-dark dark:text-white-grayish font-sans mb-2">Info </label>
                    <input
                        required
                        placeholder="Enter info"
                        type="text"
                        id="info"
                        className="border border-slate-500 p-2 font-sans w-full h-12 dark:bg-midnight-blue dark:text-white-grayish"
                        onChange={(e) => { info.current = e.target.value }}
                    />
                </div>
    
                <div className="flex flex-col items-start w-full mb-4">
                    <label htmlFor="code" className="text-purple-dark dark:text-white-grayish font-sans mb-2">Code </label>
                    <input
                        required
                        placeholder="Enter code"
                        type="text"
                        id="code"
                        className="border border-slate-500 p-2 font-sans w-full h-12 dark:bg-midnight-blue dark:text-white-grayish"
                        onChange={(e) => { code.current = e.target.value }}
                    />
                </div>
    
                <div className="flex flex-col items-start w-full mb-4">
                    <label htmlFor="percentage" className="text-purple-dark dark:text-white-grayish font-sans mb-2">Percentage </label>
                    <input
                        required
                        placeholder="Enter percentage"
                        type="number"
                        id="percentage"
                        className="border border-slate-500 p-2 font-sans w-full h-12 dark:bg-midnight-blue dark:text-white-grayish"
                        onChange={(e) => { percentage.current = e.target.value }}
                    />
                </div>
                
                <div className="flex flex-col items-start w-full mb-4">
                    <label htmlFor="image" className="text-purple-dark dark:text-white-grayish font-sans mb-2">Image link </label>
                    <input
                        required
                        placeholder="Enter image link"
                        type="text"
                        id="image"
                        className="border border-slate-500 p-2 font-sans w-full h-12 dark:bg-midnight-blue dark:text-white-grayish"
                        onChange={(e) => { image.current = e.target.value }}
                    />
                </div>

                <div className="w-full flex justify-center">
                    <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
                    style={{
                        color: 'white',
                        background: 'linear-gradient(to right, #B892FF, #8A1DFF)',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    >Create</button>
                    {
                        errMsg && <p className="text-red-700 text-sm mt-5 w-[45%]">{errMsg}</p>
                    }
                </div>
            </form>
        </div>
    );
}
