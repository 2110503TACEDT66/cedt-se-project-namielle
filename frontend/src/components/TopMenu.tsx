'use client'
import Image from 'next/image'
import TopMenuItem from './MenuItem'
import Link from 'next/link'
import UserDropDown from './UserDropdown'
import getUserProfile from '@/libs/getUserProfile'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useAppSelector } from '@/app/redux/store'

export default function TopMenu() {

    const [userData, setUserData] = useState<any>(null);
    const { data: session } = useSession();

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

    const cartItems = useAppSelector((state) => state.cartSlice.CartBookingItems);

    return (
        <div className="h-[70px] bg-paper fixed top-0 left-0 right-0 z-30 border-b border-t border-solid border-gray-400 flex flex-row">
            <Link href={'/'}>
                <div className="flex h-full w-auto ml-3 my-1 items-center">
                    <Image src={'/img/Teamlogo.png'} className="h-full w-auto" alt='logo' width={0} height={0} sizes='100vh' />
                    <h1 className='text-2xl font-bold bg-gradient-to-b from-violet-800 from-40% to-pink-500 to-70% text-transparent bg-clip-text'>NAMIELLE</h1>
                </div>
            </Link>
            <div className='flex flex-row absolute right-0 h-full mr-3 items-center'>
                <TopMenuItem title='Browse Hotel' pageRef='/hotel' />


                {
                    userData ?
                        <>
                            {
                                userData?.data.role === 'admin' ? <TopMenuItem title='Create Discount' pageRef='/editdiscount' />
                                    : null
                            }
                            {
                                userData?.data.role === 'user' || "admin" ? <TopMenuItem title='Discount Code' pageRef='/discount' /> 
                                    : null
                            }
                            {
                                userData?.data.role === 'admin' ?
                                <>
                                <TopMenuItem title='All Booking' pageRef='/mybooking' />
                                <TopMenuItem title='Add new hotel' pageRef='/hotel/addnewhotel' />
                                </>
                                : <TopMenuItem title='My Booking' pageRef='/mybooking' />
                            }
                            <UserDropDown />
                        </> :
                        <TopMenuItem title='Sign-In' pageRef='/signin' />
                }

                <Link href={'/cart'} className="relative">
                    {cartItems.length > 0 ? 
                    <div className='h-[16px] w-[16px] bg-red-600 rounded-[50%] absolute top-0 right-3'>
                        <div className="m-auto font-bold h-full text-center w-full text-xs text-white">{cartItems.length}</div>
                    </div> 
                    : ""}
                    
                    <Image src={'/img/shopping-cart.png'} alt='profile' width={0} height={0} sizes='3vh' className='h-[100%] w-auto mx-5' />
                </Link>

            </div>
        </div>
    )
}
