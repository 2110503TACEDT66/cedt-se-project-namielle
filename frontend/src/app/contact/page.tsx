import Image from "next/image"

export default function contact(){
    return(
        <main className="text-center m-[3%] item-center justify-center">
            <div className="text-bold text-3xl">Team</div>
            <div className="m-20 ml-[20%] flex flex-row wrap space-around ">
                <div className="mx-10 w-1/5">
                    <Image src={'/img/yurill.jpg'} alt="rawit" width={400} height={400} className=""/>
                    <div className="my-4 text-xl">Rawit Pholngam</div>
                </div>
                <div className="mx-10 w-1/5">
                <Image src={'/img/useless.png'} alt="rawit" width={400} height={400} className=""/>
                    <div className="my-4 text-xl">Nithi Panutat</div>
                </div>
                <div className="mx-10 w-1/5">
                <Image src={'/img/reo.png'} alt="rawit" width={400} height={400} className=""/>
                    <div className="my-4 text-xl">Thamvarut Wannachetisara</div>
                </div>
            </div>
        </main>
    )
}