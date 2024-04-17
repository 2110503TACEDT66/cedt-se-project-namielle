import Image from "next/image"

export default function contact() {
    return (
        <main className="text-center m-[3%] item-center justify-center">
            <h1 className="mb-8 text-bold text-5xl">Team</h1>

            <div className="my-4 flex flex-wrap items-baseline justify-center gap-x-5">
                <div className="my-4 flex w-3/4 flex-col sm:w-2/5 lg:w-1/4">
                    <div className="relative h-[400px]">
                        <Image src={'/img/yurill.jpg'} alt="rawit" fill={true} className="rounded-lg object-cover shadow-md absolute h-full" />
                    </div>
                    <p className="my-4 text-xl">Rawit Pholngam</p>
                </div>
                <div className="my-4 flex w-3/4 flex-col sm:w-2/5 lg:w-1/4">
                    <div className="relative h-[400px]">
                        <Image src={'/img/useless.png'} alt="nithi" fill={true} className="rounded-lg object-cover shadow-md absolute h-full" />
                    </div>
                    <p className="my-4 text-xl">Nithi Panutat</p>
                </div>
                <div className="my-4 flex w-3/4 flex-col sm:w-2/5 lg:w-1/4">
                    <div className="relative h-[400px]">
                        <Image src={'/img/reo.png'} alt="thamvarut" fill={true} className="rounded-lg object-cover shadow-md absolute h-full" />
                    </div>
                    <p className="my-4 text-xl text-left">Thamvarut Wannachetisara</p>
                </div>
            </div>
        </main>
    )
}
