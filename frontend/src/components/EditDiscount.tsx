'use client'

import { FormEvent, useRef, useState } from "react"

import PostDiscount from "@/libs/postDiscount";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function EditDiscount() {
    const name = useRef("");
    const info = useRef("");
    const code = useRef("");
    const percentage = useRef("");

    const [errMsg, setErrMsg] = useState("");
    const {data: session} = useSession();

    const router = useRouter()
    const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!session || !info || !name || !code || !percentage) return;
        await PostDiscount( name.current, info.current,code.current ,percentage.current, session.user.token)
        router.push("/discount");
        // router.refresh();
        // window.location.reload();
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="w-[50%] flex flex-col" onSubmit={handleSumbit}>
                <label className="text-orange-500 font-sans font-black text-8xl mb-8 center">Create Discount</label>

                <div className="flex flex-col items-start w-full mb-4">
                    <label htmlFor="name" className="text-slate-900 font-sans mb-2">Name </label>
                    <input
                        required
                        placeholder="Enter name"
                        type="text"
                        id="name"
                        className="border border-slate-500 mb-6 p-2 font-sans w-full h-12"
                        onChange={(e) => { name.current = e.target.value }}
                    />
                </div>

                <div className="flex flex-col items-start w-full mb-4">
                    <label htmlFor="info" className="text-slate-900 font-sans mb-2">Info </label>
                    <input
                        required
                        placeholder="Enter info"
                        type="text"
                        id="info"
                        className="border border-slate-500 mb-2 p-2 font-sans w-full h-12"
                        onChange={(e) => { info.current = e.target.value }}
                    />
                </div>

                <div className="flex flex-col items-start w-full mb-4">
                    <label htmlFor="code" className="text-slate-900 font-sans mb-2">Code </label>
                    <input
                        required
                        placeholder="Enter code"
                        type="text"
                        id="code"
                        className="border border-slate-500 mb-2 p-2 font-sans w-full h-12"
                        onChange={(e) => { code.current = e.target.value }}
                    />
                </div>

                <div className="flex flex-col items-start w-full mb-4">
                    <label htmlFor="percentage" className="text-slate-900 font-sans mb-2">Percentage </label>
                    <input
                        required
                        placeholder="Enter percentage"
                        type="number"
                        id="percentage"
                        className="border border-slate-500 mb-2 p-2 font-sans w-full h-12"
                        onChange={(e) => { percentage.current = e.target.value }}
                    />
                </div>

                <div className="w-full flex justify-center">
                    <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
                    >Create</button>
                    {
                        errMsg && <p className="text-red-700 text-sm mt-5 w-[45%]">{errMsg}</p>
                    }
                </div>
            </form>
        </div>
    )
}