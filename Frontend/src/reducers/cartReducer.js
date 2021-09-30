import { CART_ADD_ITEM, CART_REMOVE_ITEM, SAVED_SHIPPING_ADDRESS, CART_PAYMENT_METHOD, RESET_CART_ITEM_AFTER_ORDER } from "../types/types";

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.product === item.product);
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.product !== action.payload)
            }

        case SAVED_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        
        case CART_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod:action.payload
     
            }
        case RESET_CART_ITEM_AFTER_ORDER:
            return {
                ...state,
                cartItems:[]
            }
        default:
            return state;
    }
}