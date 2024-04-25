import Link from "next/link";

export default function MenuItem({ title, pageRef }: { title: string, pageRef: string }) {
    return (
        <Link href={pageRef} className="w-[120px] text-center my-auto font-sans font-light text-gray-sweet dark:text-white-grayish">
            {title}
        </Link>

    );

}
