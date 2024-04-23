import Image from "next/image";
import CardTemplate2 from "./CardTemplate2";

export default function DiscountCard({ discountName,/* imgSrc,*/ discountcode, discountinfo }: { discountName: string,/* imgSrc: string,*/ discountcode: string, discountinfo: string}) {

    return (
        <CardTemplate2 contentName={discountName}>
            
            <div className='w-full h-[60%] relative rounded-t-lg'>
                
            </div>
            <div className='w-full h-[40%] p-[10px]'>
                {discountName}
                <div>
                    <div className="w-full px-[5%] pt-[2%] ">
                        Info: {discountinfo}
                    </div>
                    <div className="w-full px-[5%] pt-[2%] ">
                        Code: {discountcode}
                    </div>
                </div>
            </div>
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 "
            style={{ margin: '10px' }}
                    >Delete</button>
        </CardTemplate2 >
    )
}

/*<div className="w-1/3 relative rounded-t-lg">
<Image src={imgSrc} alt={discountName} fill={true} className="object-cover" />
</div>*/

