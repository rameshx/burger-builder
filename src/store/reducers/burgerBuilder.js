import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 1.3,
  bacon: 0.7,
  cheese: 0.4
};

const addIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: updateObject(state.ingredients, { [action.ingredient]: state.ingredients[action.ingredient] + 1 }),
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
    building: true
  })
}

const removeIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: updateObject(state.ingredients, { [action.ingredient]: state.ingredients[action.ingredient] - 1 }),
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
    building: true
  })
}

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, { error: true });
}

const setIngredients = (state, action) => {
  return updateObject(state, { ingredients: action.ingredients, error: false, totalPrice: 4, building: false });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    default: return state;
  }
}

export default reducer;