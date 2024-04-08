'use client'
import React from 'react'
import Link from 'next/link'
import { useRef } from 'react'
import { signIn } from 'next-auth/react'

export default function Login({error}: {error: string|undefined}){
    const username = useRef("");
    const password = useRef("");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signIn("credentials", {
            email: username.current,
            password: password.current,
            redirect: true,
            callbackUrl: "http://localhost:3000"
        })
    }


    return (
        <form className="mt-[6%] mx-[5%] h-auto w-[50%] flex flex-col" onSubmit={onSubmit}>
            <label className="text-orange-500 font-sans font-black text-8xl mb-10">Signing in...</label>
            <input required className="h-12 w-[80%] mt-10 mb-8 border border-slate-500 p-2 font-sans" placeholder="Email" type="text"
            onChange={(e)=>{username.current = e.target.value}}/>
            <input required className="h-12 w-[80%] mb-16 border border-slate-500 p-2 font-sans" placeholder="Password" type="password"
            onChange={(e)=>{password.current = e.target.value}}/>

            <div className="w-[80%] h-auto flex items-center">
            <button type="submit" className="w-[45%] h-[100%] my-5 mx-[5%] text-xl text-slate-900 font-bold font-sans bg-orange-500 hover:bg-slate-800 hover:text-orange-400 rounded-2xl"
            >Sign In</button>
            <span className="whitespace-pre-line text-lg">Don't have an account?<Link className="font-black" href={"/signup"}> create one</Link></span>
            
            </div>
            {
                !!error && <p className="text-red-700 text-sm mt-5 mx-5">Authentication failed. Check Username or Password</p> 
            }
        </form>
    )
}