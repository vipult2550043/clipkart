import {CREATE_ORDER_REQUEST, CREATE_ORDER_FAIL, CREATE_ORDER_SUCCESS, REMOVE_ORDER_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, PAY_ORDER_FAIL, PAY_ORDER_SUCCESS, PAY_ORDER_REQUEST, PAY_ORDER_RESET, USER_ALL_ORDERS_REQUEST, USER_ALL_ORDERS_SUCCESS, USER_ALL_ORDERS_FAIL, GET_PLACED_ORDER_DETAILS_SUCCESS, GET_PLACED_ORDER_DETAILS_REQUEST, GET_PLACED_ORDER_DETAILS_FAIL, GET_PLACED_ORDER_DETAILS_RESET, ORDER_DETAILS_RESET,ADMIN_GET_ORDER_REQUEST, ADMIN_GET_ORDER_SUCCESS, ADMIN_GET_ORDER_FAIL } from "../types/types";

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {

                loading: true
            }

        case CREATE_ORDER_SUCCESS:
            return {

                loading: false,
                success: true,
                orderInfo: action.payload

            }

        case CREATE_ORDER_FAIL:
            return {

                loading: false,
                error: action.payload
            }
        case REMOVE_ORDER_SUCCESS:
            return {
                ...state,
                success: false
            }
        default:
            return state;
    }
}

export const getOrderDetailsReducer = (state = { loading: true, shippingAddress: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ORDER_DETAILS_SUCCESS:
            return {

                loading: false,
                order: action.payload

            }

        case ORDER_DETAILS_FAIL:
            return {

                loading: false,
                error: action.payload
            }
        case ORDER_DETAILS_RESET:
            return {}

        default:
            return state;
    }
}


export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case PAY_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PAY_ORDER_SUCCESS:
            return {

                loading: false,
                success: true

            }

        case PAY_ORDER_FAIL:
            return {

                loading: false,
                error: action.payload
            }

        case PAY_ORDER_RESET:
            return {}

        default:
            return state;
    }
}

export const listAllUserOrdersReducer = (state = { ordersList: [] }, action) => {
    switch (action.type) {
        case USER_ALL_ORDERS_REQUEST:
            return {

                loading: true
            }

        case USER_ALL_ORDERS_SUCCESS:
            return {

                loading: false,
                ordersList: action.payload

            }

        case USER_ALL_ORDERS_FAIL:
            return {

                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}

export const listPlacedOrderDetailsReducer = (state = { ordersPlaced: [] }, action) => {
    switch (action.type) {
        case GET_PLACED_ORDER_DETAILS_REQUEST:
            return {

                loading: true
            }

        case GET_PLACED_ORDER_DETAILS_SUCCESS:
            return {

                loading: false,
                ordersPlaced: action.payload

            }

        case GET_PLACED_ORDER_DETAILS_FAIL:
            return {

                loading: false,
                error: action.payload
            }
        case GET_PLACED_ORDER_DETAILS_RESET:
            return {
                ordersPlaced:[]
            }
        default:
            return state;
    }
}


/*ADMIN Get all orders*/

export const adminListAllOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ADMIN_GET_ORDER_REQUEST:
            return {

                loading: true
            }

        case ADMIN_GET_ORDER_SUCCESS:
            return {

                loading: false,
                orders: action.payload

            }

        case ADMIN_GET_ORDER_FAIL:
            return {

                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}