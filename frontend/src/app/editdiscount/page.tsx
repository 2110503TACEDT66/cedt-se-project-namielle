import getDiscounts from "@/libs/getDiscounts"
import EditDiscount from "@/components/EditDiscount"

export default function editdiscounts() {
    const discounts = getDiscounts()
    return (
        <main className="text-center px-5 pt-20">
            <EditDiscount/>
        </main>
    )
}
