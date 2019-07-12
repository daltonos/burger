import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    console.log("purchaseSuccess");
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post("/orders.json", orderData)
        .then(res => {
            console.log(res.data);
            dispatch(purchaseBurgerSuccess(res.data.name, orderData));
        })
        .catch(err => {
            dispatch(purchaseBurgerFail(err));
            console.error(err);
        });
        console.log(orderData);
    };
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
}

export const loadUserOrders = () => {
    return dispatch => {
        dispatch(loadUserOrdersStart());
        axios.get("/orders.json")
        .then(res => {
            const orders = [];
            for (let key in res.data) {
                orders.push({
                    id: key,
                    ...res.data[key]
                });
            }
            console.log(orders);
            dispatch(loadUserOrdersSuccess(orders));
        })
        .catch(err => {
            dispatch(loadUserOrdersFail(err));
            console.error(err);
        });
    };
}

export const loadUserOrdersStart = () => {
    return {
        type: actionTypes.LOAD_USER_ORDERS_START
    }
}

export const loadUserOrdersSuccess = (orders) => {
    return {
        type: actionTypes.LOAD_USER_ORDERS_SUCCESS,
        orders: orders
    }
}

export const loadUserOrdersFail = (err) => {
    return {
        type: actionTypes.LOAD_USER_ORDERS_FAIL
    }
}