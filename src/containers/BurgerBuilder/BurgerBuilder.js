import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

const BurgerBuilder = props => {

  const [purchasing, setPurchasing] = useState(false);

  const { initIngredients } = props;

  useEffect(() => {
    initIngredients();
  }, [initIngredients])

  const purshaseHandler = () => {
    if (props.isAuth) {
      setPurchasing(true)
    } else {
      props.setAutoRedirectPath('/checkout');
      props.history.push('/auth');
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false)
  }

  const purshaseContinueHandler = () => {
    props.purchaseInit();
    props.history.push('/checkout');
  }

  let burger = props.error ? <p>Failed to fetch ingredients.</p> : <Spinner />;
  let orderSummary = null;
  if (props.ingredients) {
    const disabledIngredients = {};
    Object.entries(props.ingredients).forEach(([ingredient, value]) => {
      disabledIngredients[ingredient] = value === 0;
    });
    burger = (
      <>
        <Burger ingredients={props.ingredients} />
        <BuildControls
          isAuth={props.isAuth}
          order={purshaseHandler}
          disabledIngredients={disabledIngredients}
          addIngredient={props.addIngredient}
          removeIngredient={props.removeIngredient}
          price={props.totalPrice} />
      </>
    );
    orderSummary = <OrderSummary
      price={props.totalPrice}
      cancel={purchaseCancelHandler}
      continue={purshaseContinueHandler}
      ingredients={props.ingredients} />;
  }

  return (
    <>
      <Backdrop show={purchasing} closeModal={purchaseCancelHandler} />
      <Modal show={purchasing}>
        {orderSummary}
      </Modal>
      {burger}
    </>
  );
}

const mapStateToProps = (state) => {
  const { ingredients, totalPrice, error } = state.burgerBuilder;
  return { ingredients, totalPrice, error, isAuth: state.auth.token !== null };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (ingredient) => dispatch(actions.addIngredient(ingredient)),
    removeIngredient: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
    initIngredients: () => dispatch(actions.initIngredients()),
    purchaseInit: () => dispatch(actions.purchaseInit()),
    setAutoRedirectPath: (path) => dispatch(actions.setAutoRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
