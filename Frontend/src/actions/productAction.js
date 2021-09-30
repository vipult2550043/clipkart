import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL, ADMIN_DELETE_PRODUCT_REQUEST, ADMIN_DELETE_PRODUCT_SUCCESS, ADMIN_DELETE_PRODUCT_FAIL, ADMIN_UPDATE_PRODUCT_REQUEST, ADMIN_UPDATE_PRODUCT_SUCCESS, ADMIN_UPDATE_PRODUCT_FAIL, ADMIN_CREATE_PRODUCT_REQUEST, ADMIN_CREATE_PRODUCT_SUCCESS, ADMIN_CREATE_PRODUCT_FAIL, CREATE_PRODUCT_REVIEW_REQUEST, CREATE_PRODUCT_REVIEW_SUCCESS, CREATE_PRODUCT_REVIEW_FAIL, GET_TOP_PRODUCT_REQUEST, GET_TOP_PRODUCT_SUCCESS, GET_TOP_PRODUCT_FAIL } from '../types/types';
import axios from 'axios';


//Products List
export const listProducts = (keyword='') => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST,
        })
        const { data } = await axios.get(`/api/products?keyword=${keyword}`);
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error
        })
    }
}

//Get Top Rated Products Carosel
export const getTopProductsAction = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_TOP_PRODUCT_REQUEST,
        })
        const { data } = await axios.get(`/api/products/top`);
        dispatch({
            type: GET_TOP_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_TOP_PRODUCT_FAIL,
            payload: error
        })
    }
}

//Product Detail
export const detailsProduct = (productId) => async (dispatch) => {

    try {
        dispatch({
            type: PRODUCT_DETAIL_REQUEST,
        })
        const { data } = await axios.get(`/api/products/${productId}`);
        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error
        })
    }
}


/*ADMIN Delete Product Action*/
export const adminDeleteProductAction = (productId) => async (dispatch, getState) => {

    try {
        dispatch({
            type: ADMIN_DELETE_PRODUCT_REQUEST
        })

        //using getState to take token from userLogin already
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.delete(`/api/products/admin/${productId}`, config);

        dispatch({
            type: ADMIN_DELETE_PRODUCT_SUCCESS,
            payload: data
        })




    } catch (error) {
        dispatch({
            type: ADMIN_DELETE_PRODUCT_FAIL,
            payload: error
        })
    }
}


/*ADMIN Create Product Action*/
export const adminCreateProductAction = () => async (dispatch, getState) => {

    try {
        dispatch({
            type: ADMIN_CREATE_PRODUCT_REQUEST
        })

        //using getState to take token from userLogin already
        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/products/admin`, {}, config); //Sending empty object {} as we have our sample data comming from api

        dispatch({
            type: ADMIN_CREATE_PRODUCT_SUCCESS,
            payload: data
        })




    } catch (error) {
        dispatch({
            type: ADMIN_CREATE_PRODUCT_FAIL,
            payload: error
        })
    }
}


/*ADMIN Update Product Action*/
export const adminUpdateProductAction = (productId, productUpdate) => async (dispatch, getState) => {

    try {
        dispatch({
            type: ADMIN_UPDATE_PRODUCT_REQUEST
        })

        //using getState to take token from userLogin already
        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/products/admin/${productId}`, productUpdate, config);

        dispatch({
            type: ADMIN_UPDATE_PRODUCT_SUCCESS,
            payload: data
        })




    } catch (error) {
        dispatch({
            type: ADMIN_UPDATE_PRODUCT_FAIL,
            payload: error
        })
    }
}


/*Create Product Review Action*/
export const createProductReviewAction = (productId, review) => async (dispatch, getState) => {

    try {
        dispatch({
            type: CREATE_PRODUCT_REVIEW_REQUEST
        })

        //using getState to take token from userLogin already
        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/products/${productId}/reviews`, review, config);

        //We dont need anything pass in payload as in createReview Reducer we only have success and loading
        dispatch({
            type: CREATE_PRODUCT_REVIEW_SUCCESS

        })

    } catch (error) {
        dispatch({
            type: CREATE_PRODUCT_REVIEW_FAIL,
            payload: error
        })
    }
}