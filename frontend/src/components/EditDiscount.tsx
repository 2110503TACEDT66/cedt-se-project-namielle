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
    const { data: session } = useSession();

    const router = useRouter()
    const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!session || !info || !name || !code || !percentage) return;
        await PostDiscount(name.current, info.current, code.current, percentage.current, session.user.token)
        router.refresh();
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="w-[50%] flex flex-col" onSubmit={handleSumbit}>
                <label className="text-orange-500 font-sans font-black text-8xl mb-8 center">Create Discount</label>

                <div className="h-12 w-full mb-6 border border-slate-500 font-sans divide-x divide-slate-500">
                    <input required placeholder="Name" type="text" className="border border-slate-500 mb-6 p-2 font-sans w-full h-12"
                        onChange={(e) => { name.current = e.target.value }} />
                </div>

                <input required className="border border-slate-500 mb-6 p-2 font-sans w-full h-12" placeholder="Info" type="text"
                    onChange={(e) => { info.current = e.target.value }} />

                <div className="h-12 w-full mb-10 border border-slate-500 font-sans divide-x divide-slate-500">
                    <input required placeholder="Code" type="text" className="border border-slate-500 mb-6 p-2 font-sans w-full h-12"
                        onChange={(e) => { code.current = e.target.value }} />
                </div>

                <div className="h-12 w-full mb-10 border border-slate-500 font-sans divide-x divide-slate-500">
                    <input required placeholder="Percentage" type="number" className="border border-slate-500 mb-6 p-2 font-sans w-full h-12"
                        onChange={(e) => { percentage.current = e.target.value }} />
                </div>

                <div className="w-full flex justify-center">
                    <button type="submit" className="w-[45%] h-[100%] my-5 text-xl text-slate-900 font-bold font-sans bg-orange-500 hover:bg-slate-800 hover:text-orange-400 rounded-2xl"
                    >Create</button>

                    {
                        errMsg && <p className="text-red-700 text-sm mt-5 w-[45%]">{errMsg}</p>
                    }
                </div>
            </form>
        </div>
    )
}
