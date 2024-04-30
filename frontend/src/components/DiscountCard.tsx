import Image from "next/image";
import CardTemplate2 from "./CardTemplate2";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import deleteDiscount from "@/libs/deleteDiscount";
import getUserProfile from "@/libs/getUserProfile";
import Swal from "sweetalert2";

export default function DiscountCard({
    discountId,
    discountName,
    /* imgSrc,*/ discountCode,
    discountInfo,
    discountImage,
}: {
    discountId: string;
    discountName: string;
    /* imgSrc: string,*/ discountCode: string;
    discountInfo: string;
    discountImage: string;
}) {
    const [userData, setUserData] = useState<any>(null);
    const { data: session } = useSession();
    const router = useRouter();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!session) return;
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your discount code has been deleted.",
                    icon: "success",
                }).then(async () => {
                    await deleteDiscount(discountId, session.user.token);
                    router.refresh();
                    window.location.reload();
                });
            }
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            if (session) {
                const userData = await getUserProfile(session?.user.token);
                setUserData(userData);
            }
        };

        fetchData();
    }, []);

    return (
        <CardTemplate2 contentName={discountName}>
            <div className="w-full h-[70%] relative rounded-t-lg">
                <Image
                    src={discountImage}
                    fill={true}
                    className="object-cover rounded-sm"
                    alt="discount image"
                ></Image>
            </div>
            <div className="w-full h-[30%] p-[10px]">
                <div className="gap-[1%]">
                    <div className="text-lg font-bold">{discountName}</div>
                    <div className="w-full">Info: {discountInfo}</div>
                    <div className="w-full flex justify-center">
                        Code:
                        <div className="text-purple-namielle ml-1">
                            {discountCode}
                        </div>
                        <div className="ml-1 flex items-center">
                            <Image
                            src={"/img/copy.png"}
                            alt="copy"
                            width={20}
                            height={20}
                            onClick={() => {
                                Swal.fire({
                                    title: "Copy Success",
                                    icon: "success",
                                    showConfirmButton: false,
                                    timer: 1000
                                  });
                                navigator.clipboard.writeText(discountCode)
                            }}
                            className="cursor-pointer"
                            ></Image>
                        </div>
                    </div>
                </div>
            </div>
            {userData?.data.role === "admin" ? (
                <form onSubmit={handleSubmit}>
                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 "
                        style={{
                            color: 'white',
                            background: 'linear-gradient(to right, #B892FF, #8A1DFF)',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            margin: "10px"
                          }}
                          id={discountCode}
                    >
                        Delete
                    </button>
                </form>
            ) : null}
        </CardTemplate2>
    );
}
