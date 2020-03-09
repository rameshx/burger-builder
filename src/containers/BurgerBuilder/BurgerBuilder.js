import React, { Component } from 'react';
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

export class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.initIngredients();
  }
  
  purshaseHandler = () => {
    if (this.props.isAuth) {
      this.setState({ purchasing: true })
    } else {
      this.props.setAutoRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purshaseContinueHandler = () => {
    this.props.purchaseInit();
    this.props.history.push('/checkout');
  }

  render() {
    let burger = this.props.error ? <p>Failed to fetch ingredients.</p> : <Spinner />;
    let orderSummary = null;
    if (this.props.ingredients) {
      const disabledIngredients = {};
      Object.entries(this.props.ingredients).forEach(([ingredient, value]) => {
        disabledIngredients[ingredient] = value === 0;
      });
      burger = (
        <>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            isAuth={this.props.isAuth}
            order={this.purshaseHandler}
            disabledIngredients={disabledIngredients}
            addIngredient={this.props.addIngredient}
            removeIngredient={this.props.removeIngredient}
            price={this.props.totalPrice} />
        </>
      );
      orderSummary = <OrderSummary
        price={this.props.totalPrice}
        cancel={this.purchaseCancelHandler}
        continue={this.purshaseContinueHandler}
        ingredients={this.props.ingredients} />;
    }

    return (
      <>
        <Backdrop show={this.state.purchasing} closeModal={this.purchaseCancelHandler} />
        <Modal show={this.state.purchasing}>
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
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
