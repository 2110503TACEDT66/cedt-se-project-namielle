import TopMenuItem from "./MenuItem";

export default function BottomMenu() {
    return (

        <div className="h-[50px] fixed bg-paper-yellow dark:bg-midnight-dark mt-10 bottom-0 left-0 right-0 z-30 flex flex-row">{/*border-t border-solid border-gray-400*/}
            <TopMenuItem title='About Us' pageRef='/aboutus' />
            <TopMenuItem title='Contact' pageRef='/contact' />
        </div>
    )
}
