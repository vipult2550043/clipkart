import { ADMIN_USER_LIST_REQUEST, ADMIN_USER_LIST_SUCCESS, ADMIN_USER_LIST_FAIL, ADMIN_USER_LIST_RESET, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, UPDATE_USER_PROFILE_RESET, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL, UPDATE_USER_PROFILE_REQUEST, UPDATE_USER_PROFILE_SUCCESS, UPDATE_USER_PROFILE_FAIL, USER_PROFILE_RESET, ADMIN_USER_DELETE_REQUEST, ADMIN_USER_DELETE_SUCCESS, ADMIN_USER_DELETE_FAIL, ADMIN_GET_USER_BY_ID_REQUEST, ADMIN_GET_USER_BY_ID_SUCCESS, ADMIN_GET_USER_BY_ID_FAIL, ADMIN_GET_USER_BY_ID_RESET, ADMIN_USER_UPDATE_REQUEST, ADMIN_USER_UPDATE_SUCCESS, ADMIN_USER_UPDATE_FAIL } from '../types/types'

const initial_state = {};

export const userLoginReducer = (state = initial_state, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                userInfo: action.payload
            }
        case USER_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case USER_LOGOUT:
            return initial_state
        default:
            return state
    }

}

export const userRegisterReducer = (state = initial_state, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                userInfo: action.payload
            }
        case USER_REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case USER_LOGOUT:
            return initial_state
        default:
            return state
    }

}


export const userProfileReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case USER_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case USER_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case USER_PROFILE_RESET:
            return {
                user: initial_state
            }

        default:
            return state
    }

}


export const updateUserProfileReducer = (state = { userInfo: {} }, action) => {
    switch (action.type) {
        case UPDATE_USER_PROFILE_REQUEST:
            return {
                loading: true,
            }
        case UPDATE_USER_PROFILE_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload,
                success: true
            }
        case UPDATE_USER_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case UPDATE_USER_PROFILE_RESET:
            return {

            }

        default:
            return state
    }

}

/*ADIM*/

export const adminUserListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case ADMIN_USER_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ADMIN_USER_LIST_SUCCESS:
            return {

                loading: false,
                users: action.payload
            }
        case ADMIN_USER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ADMIN_USER_LIST_RESET:
            return {
                users: []
            }
        default:
            return state
    }

}


export const adminUserDeleteReducer = (state = { user: [] }, action) => {
    switch (action.type) {
        case ADMIN_USER_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ADMIN_USER_DELETE_SUCCESS:
            return {

                loading: false,
                user: action.payload

            }
        case ADMIN_USER_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }

}

export const adminGetUserByIdReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case ADMIN_GET_USER_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ADMIN_GET_USER_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case ADMIN_GET_USER_BY_ID_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ADMIN_GET_USER_BY_ID_RESET:
            return {
                user: initial_state
            }

        default:
            return state
    }

}


export const adminUpdateUserByIdReducer = (state = { userInfo: {} }, action) => {
    switch (action.type) {
        case ADMIN_USER_UPDATE_REQUEST:
            return {
                loading: true,
            }
        case ADMIN_USER_UPDATE_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload,
                success: true
            }
        case ADMIN_USER_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
       

        default:
            return state
    }

}
