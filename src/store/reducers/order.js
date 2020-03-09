import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const purchaseSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: [...state.orders, updateObject(action.orderData, { id: action.orderId })]
  })
}

const purchaseFailed = (state, action) => {
  return updateObject(state, { loading: false })
}

const purchaseBurgerStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false })
}

const fetchOrdersInit = (state, action) => {
  return updateObject(state, { loading: true })
}

const fetchOrdersFailed = (state, action) => {
  return updateObject(state, { loading: false })
}

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, { loading: false, orders: action.orders })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_SUCCESS: return purchaseSuccess(state, action);
    case actionTypes.PURCHASE_FAILED: return purchaseFailed(state, action);
    case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
    case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
    case actionTypes.FETCH_ORDERS_INIT: return fetchOrdersInit(state, action);
    case actionTypes.FETCH_ORDERS_FAILED: return fetchOrdersFailed(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
    default: return state
  }
}

export default reducer;