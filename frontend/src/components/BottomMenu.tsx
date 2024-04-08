import TopMenuItem from "./MenuItem";

export default function BottomMenu(){
    return(

        <div className="h-[50px] bg-paper mt-10 bottom-0 left-0 right-0 z-30 border-t border-solid border-gray-400 flex flex-row">
            <TopMenuItem title='About Us' pageRef='/aboutus'/>
            <TopMenuItem title='Contact' pageRef='/contact'/>
        </div>
    )
}