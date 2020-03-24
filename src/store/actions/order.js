import * as actionTypes from './actionTypes';

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

export const purchaseBurger = (orderData, token) => ({
  type: actionTypes.PURCHASE_BURGER_INIT,
  token, orderData
})

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

export const fetchOrders = (token, userId) => ({
  type: actionTypes.FETCH_ORDERS,
  token, userId
})
