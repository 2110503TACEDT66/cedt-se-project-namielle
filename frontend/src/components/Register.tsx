'use client'
import { useRef, useState } from "react"
import OTPTextfield from "./OTPTextfield";
import sentOTP from "@/libs/sentOTP";
import * as EmailValidator from 'email-validator';
import getValidEmail from "@/libs/getValidEmail";
export default function Register() {
    const firstname = useRef("");
    const lastname = useRef("");
    const email = useRef("");
    const tel = useRef("");
    const password = useRef("");
    const confirmpassword = useRef("");

    const [errMsg, setErrMsg] = useState("");


    const [showOTP, setShowOTP] = useState(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        
        if(tel.current.length != 10){
            setErrMsg("the phone number is not valid");
            return;
        }

        if (!EmailValidator.validate(email.current)) {
            // console.log(email.current);
            // console.log(EmailValidator.validate(email.current))
            setErrMsg("the email is not valid");
            return;
        }
        
        const usedEmail = await getValidEmail(email.current);
        if (usedEmail) {
            setErrMsg("the email is already used");
            return;
        }

        if (password.current.length < 6) {
            setErrMsg("the password need to have atleast 6 characters");
            return;
        }
        
        if (password.current !== confirmpassword.current) {
            setErrMsg("the password doesn't not match.");
            return;
        }
        
        setErrMsg("");
        sentOTP(email.current)
        setShowOTP(true);

    }

    return (
        <>
            {
                !showOTP ?
                    <form className="mt-[2%] mx-[5%] h-auto w-[50%] flex flex-col" onSubmit={onSubmit}>
                        <label className="text-purple-dark dark:text-white-grayish font-sans font-black text-8xl mb-5">Create your account</label>

                        <div className="h-12 w-[80%] mb-8 font-sans flex divide-slate-500">
                            <div className="w-[50%]">
                                <label className="text-purple-dark dark:text-white-grayish font-sans font-black text-base mb-1">First Name</label>
                                <input required placeholder="First Name" type="text" className="h-[100%] w-full p-2 dark:bg-midnight-blue text-black dark:text-white-grayish border border-slate-500"
                                    onChange={(e) => { firstname.current = e.target.value }} />
                            </div>
                            <div className="w-[50%]">
                                <label className="text-purple-dark dark:text-white-grayish font-sans font-black text-base mb-1">Last Name</label>
                                <input required placeholder="Last Name" type="text" className="h-full w-full p-2 dark:bg-midnight-blue text-black dark:text-white-grayish border border-slate-500"
                                    onChange={(e) => { lastname.current = e.target.value }} />
                            </div>
                        </div>

                        <label className="text-purple-dark dark:text-white-grayish font-sans font-black text-base mb-1">Tel</label>
                        <input required className=" border border-slate-500 mb-2 p-2 font-sans w-[80%] h-12 dark:bg-midnight-blue text-black dark:text-white-grayish" placeholder="Tel" type="text"
                            onChange={(e) => { tel.current = e.target.value }}/>
                        <label className="text-purple-dark dark:text-white-grayish font-sans font-black text-base mb-1">Email</label>
                        <input required className=" border border-slate-500 mb-2 p-2 font-sans w-[80%] h-12 dark:bg-midnight-blue text-black dark:text-white-grayish" placeholder="Email" type="text"
                            onChange={
                                (e) => {
                                    email.current = e.target.value
                                }
                            } />

                        <div className="h-12 w-[80%] mb-12 font-sans flex">
                            <div className="w-[50%] flex-col">
                                <label className="text-purple-dark dark:text-white-grayish font-sans font-black text-base mb-1">Password</label>
                                <input required placeholder="Password" type="password" className="h-[100%] w-full p-2 dark:bg-midnight-blue text-black dark:text-white-grayish border border-slate-500"
                                    onChange={(e) => { password.current = e.target.value }} />
                            </div>
                            <div className="w-[50%] flex-col">
                                <label className="text-purple-dark dark:text-white-grayish font-sans font-black text-base mb-1">Password</label>
                                <input required placeholder="Confirm Password" type="password" className="h-full w-full p-2 dark:bg-midnight-blue text-black dark:text-white-grayish border border-slate-500"
                                    onChange={(e) => { confirmpassword.current = e.target.value }} />
                            </div>
                        </div>

                        <div className="w-[80%] h-auto flex items-center">

                            <button type="submit" className="w-[45%] h-[100%] my-5 mx-[20px] text-xl text-purple-dark dark:text-white-grayish font-bold font-sans bg-pink-sweet hover:bg-purple-dark dark:hover:bg-white-grayish hover:text-pink-sweet rounded-2xl duration-150"
                            >Sign Up</button>

                            {
                                errMsg && <p className="text-red-700 text-sm mt-5 mx-4 w-[45%]">{errMsg}</p>
                            }

                        </div>

                    </form> :

                    <div className="mt-[4%] mx-[5%] h-auto w-[50%] flex flex-col">
                        <label className="text-orange-500 font-sans font-black text-8xl">Almost there!</label>
                        <label className="text-slate-700 font-sans text-lg font-semibold m-2">We have sent you the OTP at your email {email.current}. please confirm it below</label>
                        <OTPTextfield firstname={firstname.current} lastname={lastname.current} tel={tel.current} password={password.current} email={email.current} />

                    </div>

            }
        </>
    )

}
