import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseSuccess = (orderId, orderData) => ({
  type: actionTypes.PURCHASE_SUCCESS,
  orderData,
  orderId
})

export const purchaseFailed = (error) => ({
  type: actionTypes.PURCHASE_FAILED,
  error
})

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START
})

export const purchaseBurger = (orderData, token) => dispatch => {
  dispatch(purchaseBurgerStart())
  axios.post('/orders.json?auth=' + token, orderData)
    .then(({ data }) => {
      dispatch(purchaseSuccess(data.name, orderData))
    })
    .catch((error) => {
      dispatch(purchaseFailed(error))
    })
}

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT
})

export const fetchOrdersSuccess = (orders) => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders
})

export const fetchOrdersFailed = (error) => ({
  type: actionTypes.FETCH_ORDERS_FAILED,
  error
})

export const fetchOrdersInit = () => ({
  type: actionTypes.FETCH_ORDERS_INIT
})

export const fetchOrders = (token, userId) => dispatch => {
  dispatch(fetchOrdersInit())
  const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
  axios.get('/orders.json'+ queryParams)
    .then(({ data }) => {
      const fetchedOrders = Object.entries(data).map(([id, value]) => ({ id, ...value }));
      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch(error => {
      dispatch(fetchOrdersFailed(error))
    })
}
