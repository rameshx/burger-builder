import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';
import { setIngredients, fetchIngredientsFailed } from '../actions';

export function* initIngredientsSaga(action) {
  try {
    const { data } = yield axios.get('/ingredients.json');
    yield put(setIngredients(data));
  } catch (error) {
    yield put(fetchIngredientsFailed());
  }
}