import Link from "next/link";

export default function MenuItem( {title, pageRef} : {title:string, pageRef:string}) {
    return (
        <Link href={pageRef} className="w-[120px] text-center my-auto font-sans text-l text-gray-500">
            {title}
        </Link>
        
    );

}
