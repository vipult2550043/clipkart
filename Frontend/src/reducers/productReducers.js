import { ADMIN_RESET_PRODUCT_DETAILS, PRODUCT_LIST_REQUEST, PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL, ADMIN_DELETE_PRODUCT_REQUEST, ADMIN_DELETE_PRODUCT_SUCCESS, ADMIN_DELETE_PRODUCT_FAIL, ADMIN_UPDATE_PRODUCT_REQUEST, ADMIN_UPDATE_PRODUCT_SUCCESS, ADMIN_UPDATE_PRODUCT_FAIL, ADMIN_CREATE_PRODUCT_RESET, ADMIN_CREATE_PRODUCT_FAIL, ADMIN_CREATE_PRODUCT_SUCCESS, ADMIN_CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_REVIEW_REQUEST, CREATE_PRODUCT_REVIEW_SUCCESS, CREATE_PRODUCT_REVIEW_FAIL, CREATE_PRODUCT_REVIEW_RESET, GET_TOP_PRODUCT_REQUEST, GET_TOP_PRODUCT_SUCCESS, GET_TOP_PRODUCT_FAIL } from '../types/types';

const initial_state = { products: [], loading: false, error: '' }

export const productListReducer = (state = initial_state, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                products: []

            }
        case PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload
            }
        case PRODUCT_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }


        default:
            return state
    }

}

export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,

            }
        case PRODUCT_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload
            }
        case PRODUCT_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ADMIN_RESET_PRODUCT_DETAILS:
            return {
                product: { reviews: [] }
            }
        default:
            return state
    }

}

/*ADMIN Delete Product */

export const adminDeleteProductReducer = (state = { product: [] }, action) => {
    switch (action.type) {
        case ADMIN_DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,

            }
        case ADMIN_DELETE_PRODUCT_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        case ADMIN_DELETE_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }

}


/*ADMIN Product Update*/
export const adminCreateProductReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_CREATE_PRODUCT_REQUEST:
            return {
                ...state,
                createdProductloading: true,

            }
        case ADMIN_CREATE_PRODUCT_SUCCESS:
            return {
                createdProductloading: false,
                successCreate: true,
                createdProduct: action.payload
            }
        case ADMIN_CREATE_PRODUCT_FAIL:
            return {
                createdProductloading: false,
                createdProductError: action.payload
            }

        case ADMIN_CREATE_PRODUCT_RESET:
            return {}

        default:
            return state
    }

}

/*ADMIN Product Update*/
export const adminUpdateProductReducer = (state = { product: [] }, action) => {
    switch (action.type) {
        case ADMIN_UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,

            }
        case ADMIN_UPDATE_PRODUCT_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        case ADMIN_UPDATE_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }

}


/* Product Review Create */
export const createProductReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_PRODUCT_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,

            }
        case CREATE_PRODUCT_REVIEW_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case CREATE_PRODUCT_REVIEW_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CREATE_PRODUCT_REVIEW_RESET:
            return {}
        default:
            return state
    }

}


/* Get Top Products Carosel */
export const getTopProductReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case GET_TOP_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,

            }
        case GET_TOP_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }
        case GET_TOP_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }

}