import getDiscounts from "@/libs/getDiscounts"
import DiscountCatalog from "@/components/DiscountCatalog"

export default function discounts() {
    const discounts = getDiscounts()
    return (
        <main className="text-center p-5">
            <h1 className="text-xl font-medium mt-12 text-black">Today Deal !!!</h1>
            <DiscountCatalog discountJson={discounts}/>
        </main>
    )
}