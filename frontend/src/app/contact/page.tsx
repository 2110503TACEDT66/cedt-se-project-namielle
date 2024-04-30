import Image from "next/image"

export default function contact() {
    return (
        <main className="text-center m-[3%] item-center justify-center text-black font-bold dark:text-white-grayish">
            <h1 className="mb-8 text-bold text-5xl">Team</h1>

            <div className="my-4 flex flex-wrap items-baseline justify-center gap-x-5">
                <div className="my-4 flex w-3/4 flex-col sm:w-2/5 lg:w-1/4">
                    <div className="relative h-[400px]">
                        <Image src={'https://avatars.githubusercontent.com/u/139625660?v=4'} alt="rawit" fill={true} className="rounded-lg object-cover shadow-md absolute h-full" />
                    </div>
                    <p className="my-4 text-xl">Rawit Pholngam</p>
                </div>
                <div className="my-4 flex w-3/4 flex-col sm:w-2/5 lg:w-1/4">
                    <div className="relative h-[400px]">
                        <Image src={'https://avatars.githubusercontent.com/u/67043780?v=4'} alt="nithi" fill={true} className="rounded-lg object-cover shadow-md absolute h-full" />
                    </div>
                    <p className="my-4 text-xl">Nithi Panutat</p>
                </div>
                <div className="my-4 flex w-3/4 flex-col sm:w-2/5 lg:w-1/4">
                    <div className="relative h-[400px]">
                        <Image src={'https://avatars.githubusercontent.com/u/66747259?v=4'} alt="thamvarut" fill={true} className="rounded-lg object-cover shadow-md absolute h-full" />
                    </div>
                    <p className="my-4 text-xl">Thamvarut Wannachetisara</p>
                </div>



                <div className="my-4 flex w-3/4 flex-col sm:w-2/5 lg:w-1/4">
                    <div className="relative h-[400px]">
                        <Image src={'https://avatars.githubusercontent.com/u/141068821?v=4'} alt="ikkyu" fill={true} className="rounded-lg object-cover shadow-md absolute h-full" />
                    </div>
                    <p className="my-4 text-xl">Kittiphop Khankaew</p>
                </div>
                <div className="my-4 flex w-3/4 flex-col sm:w-2/5 lg:w-1/4">
                    <div className="relative h-[400px]">
                        <Image src={'https://avatars.githubusercontent.com/u/108358070?v=4'} alt="webbalaka" fill={true} className="rounded-lg object-cover shadow-md absolute h-full" />
                    </div>
                    <p className="my-4 text-xl">Pasit Khumsena</p>
                </div>
                <div className="my-4 flex w-3/4 flex-col sm:w-2/5 lg:w-1/4">
                    <div className="relative h-[400px]">
                        <Image src={'https://avatars.githubusercontent.com/u/156435841?v=4'} alt="9natthaphong" fill={true} className="rounded-lg object-cover shadow-md absolute h-full" />
                    </div>
                    <p className="my-4 text-xl">Natthaphong Sanubon</p>
                </div>
                


                <div className="my-4 flex w-3/4 flex-col sm:w-2/5 lg:w-1/4">
                    <div className="relative h-[400px]">
                        <Image src={'https://avatars.githubusercontent.com/u/77188526?v=4'} alt="kcopyk" fill={true} className="rounded-lg object-cover shadow-md absolute h-full" />
                    </div>
                    <p className="my-4 text-xl">Nutchapuk Apiwong</p>
                </div>
                <div className="my-4 flex w-3/4 flex-col sm:w-2/5 lg:w-1/4">
                    <div className="relative h-[400px]">
                        <Image src={'https://avatars.githubusercontent.com/u/153883365?v=4'} alt="idinmaster" fill={true} className="rounded-lg object-cover shadow-md absolute h-full" />
                    </div>
                    <p className="my-4 text-xl">Peeradon Kulanunyapisit</p>
                </div>
                <div className="my-4 flex w-3/4 flex-col sm:w-2/5 lg:w-1/4">
                    <div className="relative h-[400px]">
                        <Image src={'https://avatars.githubusercontent.com/u/155932832?v=4'} alt="spacer16871" fill={true} className="rounded-lg object-cover shadow-md absolute h-full" />
                    </div>
                    <p className="my-4 text-xl">Kittiphon Kusonsong</p>
                </div>
            </div>
        </main>
    )
}
