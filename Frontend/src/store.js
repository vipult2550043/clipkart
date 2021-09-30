import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getTopProductReducer, createProductReviewReducer,adminCreateProductReducer,adminUpdateProductReducer,productListReducer, productDetailsReducer, adminDeleteProductReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducer';
import { adminListAllOrdersReducer,orderCreateReducer, getOrderDetailsReducer, orderPayReducer, listAllUserOrdersReducer, listPlacedOrderDetailsReducer } from './reducers/orderReducer';
import { adminUpdateUserByIdReducer,adminGetUserByIdReducer,userLoginReducer, userRegisterReducer, userProfileReducer, updateUserProfileReducer, adminUserListReducer, adminUserDeleteReducer } from './reducers/userReducer';
import logger from 'redux-logger';


const reducers = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userProfile: userProfileReducer,
    updateUserProfile: updateUserProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: getOrderDetailsReducer,
    orderPay: orderPayReducer,
    listAllUserOrder: listAllUserOrdersReducer,
    listPlacedOrderDetails: listPlacedOrderDetailsReducer,
    adminUserList: adminUserListReducer,
    adminUserDelete: adminUserDeleteReducer,
    adminGetUserById: adminGetUserByIdReducer,
    adminUpdateUserById: adminUpdateUserByIdReducer,
    adminListAllOrders: adminListAllOrdersReducer,
    adminProductDelete: adminDeleteProductReducer,
    adminUpdateProduct: adminUpdateProductReducer,
    adminCreateProduct: adminCreateProductReducer,
    createProductReview: createProductReviewReducer,
    getTopProducts: getTopProductReducer
});
//Loading from local storage and can be seen in state
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const shippingAddtressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};
const PaymentMethodFromStorage = localStorage.getItem('cartPaymentMethod') ? JSON.parse(localStorage.getItem('cartPaymentMethod')) : {};
//const OrderFromStorage = localStorage.getItem('orderInfo') ? JSON.parse(localStorage.getItem('orderInfo')) : {};


const initial_state = {
    cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddtressFromStorage, paymentMethod: PaymentMethodFromStorage },
    userLogin: { userInfo: userInfoFromStorage }
};

const store = createStore(reducers, initial_state, composeWithDevTools(applyMiddleware(thunk, logger)));
export default store;