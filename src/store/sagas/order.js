import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';
import { purchaseBurgerStart, purchaseSuccess, purchaseFailed, fetchOrdersInit, fetchOrdersSuccess, fetchOrdersFailed } from '../actions';

export function* purchaseBurgerSaga(action) {
  yield put(purchaseBurgerStart())
  try {
    const { data } = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
    yield put(purchaseSuccess(data.name, action.orderData))
  } catch (error) {
    yield put(purchaseFailed(error))
  }
}

export function* fetchOrdersSaga(action) {
  yield put(fetchOrdersInit());
  const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
  try {
    const { data } = yield axios.get('/orders.json'+ queryParams);
    const fetchedOrders = Object.entries(data).map(([id, value]) => ({ id, ...value }));
    yield put(fetchOrdersSuccess(fetchedOrders));
  } catch(error) {
    yield put(fetchOrdersFailed(error))
  }
}