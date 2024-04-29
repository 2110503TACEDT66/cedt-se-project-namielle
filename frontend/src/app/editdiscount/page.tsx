import getDiscounts from "@/libs/getDiscounts"
import EditDiscount from "@/components/EditDiscount"

export default function editdiscounts() {
    const discounts = getDiscounts()
    return (
        <main className="text-center p-5">
            <EditDiscount />
        </main>
    )
}
