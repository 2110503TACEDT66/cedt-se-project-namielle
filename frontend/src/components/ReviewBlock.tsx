import { Rating } from "@mui/material"

export default function ReviewBlock( {user,rating, comment, createdAt} : {user:string, rating:number, comment: string, createdAt: string}) {
    return (
        <div className="mx-auto mt-1 mb-5 p-5 pb-2 h-[auto] w-[95%] border border-solid border-slate-500 rounded-2xl">
                <p className="font-semibold">{user} </p>
                <Rating value={rating} readOnly></Rating>
                <p className="pb-3">{comment}</p>

                <p className="text-orange-500 text-xs ">this comment is created at: {createdAt}</p>

        </div>
    )


}