"use client"

import React, { useState, useEffect } from 'react';
import DiscountCard from "./DiscountCard";
import getDiscounts from '@/libs/getDiscounts';

export default function DiscountCatalog({ discountJson }: { discountJson: any }) {
    const [discountData, setDiscountData] = useState<any>();


    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
                const result = await getDiscounts();
                setDiscountData(result);
            } catch (err) {
                console.error(err);
            }
        };

        fetchDiscounts();
    }, []);

    return (
        <>
        <div style={{margin:"20px", display:"flex", flexDirection:"row", 
        flexWrap:"wrap", justifyContent:"space-around", alignContent:"space-around"}}>
            {
                discountData && discountData.data ? // Check if discountData and discountData.data exist
                discountData.data.map((discountItem: any) => (
                    <div className='w-1/5 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/5 flex flex-wrap gap-4' style={{ margin: '36px' }}>
                    <DiscountCard
                        discountId={discountItem._id} // Assuming each discount has a unique ID
                        discountName={discountItem.name}
                        discountInfo={discountItem.info}
                        discountCode={discountItem.code}
                        discountImage={discountItem.image}
                    />
                    </div>
                ))
                :
                <p>No discounts available</p>
            }
        </div>
        </>
    );
}

/*
<div className="justify-center item-center">
            <div className="container mx-auto my-8 p-4 rounded-lg shadow-md block">
                {
                    discountData && discountData.data ? // Check if discountData and discountData.data exist
                        discountData.data.map((discountItem: any) => (
                            <DiscountCard
                                key={discountItem._id} // Assuming each discount has a unique ID
                                discountName={discountItem.name}
                                discountinfo={discountItem.info}
                                discountcode={discountItem.code}
                            />
                        ))
                        :
                        <p>No discounts available</p>
                }
            </div>
        </div>
*/
