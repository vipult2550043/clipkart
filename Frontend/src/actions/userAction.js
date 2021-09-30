import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL, UPDATE_USER_PROFILE_FAIL, UPDATE_USER_PROFILE_SUCCESS, UPDATE_USER_PROFILE_REQUEST, USER_PROFILE_RESET, ADMIN_USER_LIST_FAIL, ADMIN_USER_LIST_SUCCESS, ADMIN_USER_LIST_REQUEST, ADMIN_USER_LIST_RESET, ADMIN_USER_DELETE_REQUEST, ADMIN_USER_DELETE_SUCCESS, ADMIN_USER_DELETE_FAIL, ADMIN_GET_USER_BY_ID_REQUEST, ADMIN_GET_USER_BY_ID_SUCCESS, ADMIN_GET_USER_BY_ID_FAIL, ADMIN_USER_UPDATE_REQUEST, ADMIN_USER_UPDATE_SUCCESS, ADMIN_USER_UPDATE_FAIL, ADMIN_GET_USER_BY_ID_RESET } from '../types/types'
import axios from 'axios';


/*Login User*/
export const userLoginAction = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/users/login', { email, password }, config);

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error
        })
    }
}

export const userLogout = () => async (dispatch) => {
    /*Removing from Local Strorage*/
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    dispatch({
        type: USER_LOGOUT
    })
    /*Reserting user profile info*/
    dispatch({ type: USER_PROFILE_RESET })

    /*Removing User list after admin logout*/
    dispatch({ type: ADMIN_USER_LIST_RESET })
}

/*Register new User*/
export const userRegisterAction = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/users', { name, email, password }, config);

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error
        })
    }
}

/* Get User Profile*/
export const getUserProfileAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_PROFILE_REQUEST
        })
        //using getState to take token from userLogin already
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/users/${id}`, config);

        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: data
        })



    } catch (error) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: error
        })
    }
}



/*Update User*/
export const userUpdateAction = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_USER_PROFILE_REQUEST
        })

        //using getState to take token from userLogin already
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put('/api/users/profile', user, config);

        dispatch({
            type: UPDATE_USER_PROFILE_SUCCESS,
            payload: data
        })

        //calling again login action after update
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        /*Resetting user profile after update*/
        dispatch({
            type: USER_PROFILE_RESET
        })


    } catch (error) {
        dispatch({
            type: UPDATE_USER_PROFILE_FAIL,
            payload: error
        })
    }
}


/*Admin Get user list*/
export const adminGetUserListAction = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_USER_LIST_REQUEST
        })
        //using getState to take token from userLogin already
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/users/admin`, config);

        dispatch({
            type: ADMIN_USER_LIST_SUCCESS,
            payload: data
        })



    } catch (error) {
        dispatch({
            type: ADMIN_USER_LIST_FAIL,
            payload: error
        })
    }
}

/*Admin Delete user*/

export const adminDeleteUserAction = (userId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_USER_DELETE_REQUEST
        })
        //using getState to take token from userLogin already
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.delete(`/api/users/admin/${userId}`, config);

        dispatch({
            type: ADMIN_USER_DELETE_SUCCESS,
            payload: data
        })



    } catch (error) {
        dispatch({
            type: ADMIN_USER_DELETE_FAIL,
            payload: error
        })
    }
}


/*Admin Get user by id*/
export const adminGetUserProfileByIdAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_GET_USER_BY_ID_REQUEST
        })
        //using getState to take token from userLogin already
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/users/admin/${id}`, config);

        dispatch({
            type: ADMIN_GET_USER_BY_ID_SUCCESS,
            payload: data
        })



    } catch (error) {
        dispatch({
            type: ADMIN_GET_USER_BY_ID_FAIL,
            payload: error
        })
    }
}

/*Admin Update user by id*/
export const adminUpdateUserProfileByIdAction = (userId,userUpdates) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_USER_UPDATE_REQUEST
        })

        //using getState to take token from userLogin already
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/users/admin/update/${userId}`, userUpdates, config);

        dispatch({
            type: ADMIN_USER_UPDATE_SUCCESS,
            payload: data
        })

       
        /*Resetting user profile after update*/
        dispatch({
            type: ADMIN_GET_USER_BY_ID_RESET
        })


    } catch (error) {
        dispatch({
            type: ADMIN_USER_UPDATE_FAIL,
            payload: error
        })
    }
}