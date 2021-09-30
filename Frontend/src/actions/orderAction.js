import { CREATE_ORDER_REQUEST, CREATE_ORDER_FAIL, CREATE_ORDER_SUCCESS, REMOVE_ORDER_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, PAY_ORDER_FAIL, PAY_ORDER_SUCCESS, PAY_ORDER_REQUEST, USER_ALL_ORDERS_REQUEST, USER_ALL_ORDERS_SUCCESS, USER_ALL_ORDERS_FAIL, GET_PLACED_ORDER_DETAILS_REQUEST, GET_PLACED_ORDER_DETAILS_SUCCESS, GET_PLACED_ORDER_DETAILS_FAIL,ADMIN_GET_ORDER_REQUEST, ADMIN_GET_ORDER_SUCCESS, ADMIN_GET_ORDER_FAIL } from "../types/types";
import axios from 'axios';

export const createOrderAction = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_ORDER_REQUEST
        })
        //using getState to take token from userLogin already
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/orders`,order, config);

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })

        //To remove cart items from local storage after order is placed
        localStorage.removeItem('cartItems')
       

    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error
        })
    }
}

//To set success to false after order place so that we can place next order
export const removeOrderSuccess = () => async (dispatch) => {
    dispatch({
        type: REMOVE_ORDER_SUCCESS
    })
}


export const getOrderDetailsAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })
        //using getState to take token from userLogin already
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders/${id}`,config);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

        // localStorage.setItem('orderInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error
        })
    }
}



export const orderPayAction = (orderId,paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PAY_ORDER_REQUEST
        })
        //using getState to take token from userLogin already
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);

        dispatch({
            type: PAY_ORDER_SUCCESS,
            payload: data
        })
       


    } catch (error) {
        dispatch({
            type: PAY_ORDER_FAIL,
            payload: error
        })
    }
}


export const listAllUserOrdersAction = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_ALL_ORDERS_REQUEST
        })
        //using getState to take token from userLogin already
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders/allorder`, config);

        dispatch({
            type: USER_ALL_ORDERS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_ALL_ORDERS_FAIL,
            payload: error
        })
    }
}


/*List placed order details*/
export const listPlacedOrderDetailsAction = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_PLACED_ORDER_DETAILS_REQUEST
        })
        //using getState to take token from userLogin already
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders/${orderId}`, config);

        dispatch({
            type: GET_PLACED_ORDER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: GET_PLACED_ORDER_DETAILS_FAIL,
            payload: error
        })
    }
}

/*ADMIN Get all orders*/
export const adminListAllOrdersAction = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_GET_ORDER_REQUEST
        })
        //using getState to take token from userLogin already
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders/allorder/admin`, config);

        dispatch({
            type: ADMIN_GET_ORDER_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ADMIN_GET_ORDER_FAIL,
            payload: error
        })
    }
}