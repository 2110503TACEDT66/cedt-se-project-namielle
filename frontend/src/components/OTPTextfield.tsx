'use client'
import userRegister from "@/libs/userRegister";
import { signIn } from "next-auth/react";
import { useState, useRef } from "react";
export default function OTPTextfield({firstname, lastname, email, password, tel} : {firstname: string, lastname: string, password: string, tel: string, email: string}) {

    const [OTP, setOTP] = useState<string[]>(Array(6).fill(''));
    const [verifiedOTP, setVerifiedOTP] = useState('');
    const inputRefs = useRef<HTMLInputElement[]>([]);

    const handleChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;
        const newOTP = [...OTP];
        newOTP[index] = value;
        setOTP(newOTP);
        if (index < OTP.length - 1 && value !== '') {
            inputRefs.current[index+1]?.focus();
        }

    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const otpValue = OTP.join('');
        setVerifiedOTP(otpValue);
        setOTP(Array(6).fill(''));


        try {
            await userRegister(email, password,(firstname + ' ' + lastname), tel, otpValue)
            await signIn("credentials", {
                email: email,
                password: password,
                redirect: true,
                callbackUrl: "http://localhost:3000"
            })
            
        } catch(err) {
            alert(err);
        };

        

        
        
    }


    return (
        <form className="flex flex-col justify-center items-center my-5" onSubmit={handleSubmit}>
            <div className='flex flex-row justify-center h-[130px] flex-wrap gap-x-5'>
            {
                OTP.map((digit, index) => (
                    <input value={digit} className="border border-slate-500 h-[100%] w-[12%] text-center text-4xl rounded-2xl text-orange-500 font-black"  
                    maxLength={1} onChange={(e)=> {handleChange(index, e.target.value)}}
                    ref = {(ref)=> (inputRefs.current[index] = ref as HTMLInputElement)} ></input>
                ))
            }
            </div>
            
            <button className="mt-10 h-[50px] w-[120px] my-5 mx-[5%] text-xl text-slate-900 font-bold font-sans bg-orange-500 hover:bg-slate-800 hover:text-orange-400 rounded-2xl" type="submit">Verify</button>

        </form>
    )
}