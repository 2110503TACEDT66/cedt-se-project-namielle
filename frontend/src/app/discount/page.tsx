"use client"
import getDiscounts from "@/libs/getDiscounts"
import DiscountCatalog from "@/components/DiscountCatalog"
import { useEffect, useState } from "react";


export default function discounts() {
    const [discounts, setDiscounts] = useState<any>(null);

    useEffect(() => {
      const fetchDiscounts = async () => {
        const fetchedDiscounts = await getDiscounts();
        setDiscounts(fetchedDiscounts);
      };
  
      fetchDiscounts();
    }, []);

    return (
        <main className="text-center p-5">
            <h1 className="text-violet-500 font-sans font-black text-8xl mb-8 center">Today Deal !!!</h1>
            {(discounts && discounts.capacity)?
                <DiscountCatalog discountJson={discounts} />:
                <p className="text-purple-dark dark:text-white-grayish text-3xl font-semibold">So sad No code for day</p>
            }
        </main>
    )
}
