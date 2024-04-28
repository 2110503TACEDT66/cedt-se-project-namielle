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
        <div className="h-[70px] bg-paper-yellow dark:bg-midnight-dark fixed top-0 left-0 right-0 z-30 flex flex-row">{/*border-b border-t border-solid border-gray-400*/}
            <Link href={'/'}>
                <div className="flex h-full w-auto ml-3 items-center">
                    <Image src={'/img/Teamlogo.png'} className="h-full w-auto" alt='logo' width={0} height={0} sizes='100vh' />
                    <h1 className='text-3xl font-black tracker-widest bg-gradient-to-b from-violet-800 from-40% to-pink-500 to-70% text-transparent bg-clip-text mt-3 fixed left-[87px]'>NAMIELLE</h1>
                </div>
            </Link>

            <div className='flex flex-row-reverse absolute right-0 h-full mr-3 items-center'>
                <Link href={'/cart'} className="relative">
                    {cartItems.length > 0 ?
                        <div className='h-[16px] w-[16px] bg-red-600 rounded-[50%] absolute top-0 right-3 z-[10]'>
                            <div className="m-auto font-bold h-full text-center w-full text-xs text-white">{cartItems.length}</div>
                        </div>
                        : ""}

                    <Image src={'/img/shopping-cart.png'} alt='profile' width={0} height={0} sizes='3vh' className='h-[100%] w-auto mx-5 dark:invert' />
                </Link>

                {
                    userData ?
                        <>
                            <UserDropDown />
                            <TopMenuItem title='Discount Code' pageRef='/discount' />
                            {
                                userData?.data.role === 'admin' ?
                                    <>
                                        {/* <TopMenuItem title='Create Discount' pageRef='/editdiscount' /> */}
                                        <TopMenuItem title='All Booking' pageRef='/mybooking' />
                                        {/* <TopMenuItem title='Add new hotel' pageRef='/hotel/addnewhotel' />
                                        <TopMenuItem title='Add new roomtype' pageRef='/hotel/addnewroomtype' />
                                        <TopMenuItem title='Recommended Management' pageRef='/addrecommended' /> */}
                                    </>
                                    : <TopMenuItem title='My Booking' pageRef='/mybooking' />
                            }
                        </> :
                        <TopMenuItem title='Sign-In' pageRef='/signin' />
                }
                <TopMenuItem title='Browse Hotel' pageRef='/hotel' />
            </div>
        </div>
    )
}
