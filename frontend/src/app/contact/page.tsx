import Image from "next/image"

export default function contact() {
    return (
        <main className="text-center m-[3%] item-center justify-center">
            <div className="text-bold text-3xl">Team</div>

            {/* To the next guy who wants to edit this: USE GRID*/}
            <div className="flex flex-row justify-center wrap space-around">
                <div className="flex flex-col mx-10 w-1/5 items-center">
                    <Image src={'/img/yurill.jpg'} alt="rawit" width={400} height={400} className="rounded-full" />
                    <div className="my-4 text-xl">Rawit Pholngam</div>
                </div>
                <div className="flex flex-col mx-10 w-1/5 items-center">
                    <Image src={'/img/useless.png'} alt="nithi" width={400} height={400} className="rounded-full" />
                    <div className="my-4 text-xl">Nithi Panutat</div>
                </div>
                <div className="flex flex-col mx-10 w-1/5 items-center">
                    <Image src={'/img/reo.png'} alt="thamvarut" width={400} height={400} className="rounded-full" />
                    <div className="my-4 text-xl">Thamvarut Wannachetisara</div>
                </div>
            </div>
        </main>
    )
}
