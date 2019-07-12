import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchasing: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            console.log("reducing PURCHASE_BURGER_SUCCESS");
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            };
        case actionTypes.LOAD_USER_ORDERS_FAIL:
            return {
                ...state,
                loading: false
            };
        case actionTypes.LOAD_USER_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            };
        case actionTypes.LOAD_USER_ORDERS_START:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
};

export default reducer;