import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../../../../interface";

type CartState = {
    CartBookingItems: CartItem[]
}

const initialState: CartState = { CartBookingItems: [] }

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            state.CartBookingItems.push(action.payload)
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const remainCart = state.CartBookingItems.filter((item) => {
                return (item._id !== action.payload)
            })
            state.CartBookingItems = remainCart
        },
        removeAllFromCart: (state) => {
            state.CartBookingItems = []
        }
    }
})

export const { addToCart, removeFromCart, removeAllFromCart } = cartSlice.actions
export default cartSlice.reducer