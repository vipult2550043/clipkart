import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, SAVED_SHIPPING_ADDRESS, CART_PAYMENT_METHOD } from "../types/types";


//getState is used to get all the states in actions present in store
export const addToCart = (id, qty) => async (dispatch, getState) => {
    
    const { data } = await axios.get(`/api/products/${id}`);
        dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
          
        }
        })
    //Setting cart items to local storage cartItems we are getting from reducers and cart is comming from store 
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => async (dispatch,getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload:id
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const shippingAddressAction = (data) => async (dispatch) => {
    dispatch({
        type: SAVED_SHIPPING_ADDRESS,
        payload: data
    })
        //Sasving shipping address to local storage
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const paymentMethodAction = (data) => async (dispatch) => {
    dispatch({
        type: CART_PAYMENT_METHOD,
        payload: data
    })
    localStorage.setItem('cartPaymentMethod', JSON.stringify(data))

}


