import getDiscounts from "@/libs/getDiscounts"
import DiscountCatalog from "@/components/DiscountCatalog"

export default function discounts() {
    const discounts = getDiscounts()
    return (
        <main className="text-center p-5">
            <h1 className="text-orange-500 font-sans font-black text-8xl mb-8 center">Today Deal !!!</h1>
            <DiscountCatalog discountJson={discounts} />
        </main>
    )
}
