import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { setAutoRedirectPath } from '../../store/actions';

const Checkout = props => {

  const checkoutContinueHandler = () => {
    props.history.replace('/checkout/contact-data');
  }

  const checkoutCancelHandler = () => {
    props.history.goBack();
  }

  let summary = <Redirect to="/" />;
  if (props.ingredients) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
    summary = <div>
      {purchasedRedirect}
      <CheckoutSummary
        checkoutContinued={checkoutContinueHandler}
        checkoutCancelled={checkoutCancelHandler}
        ingredients={props.ingredients} />
      <Route path={props.match.path + '/contact-data'}
        component={ContactData} />
    </div>;
  }
  return summary;
}

const mapStateToProps = (state) => ({
  ingredients: state.burgerBuilder.ingredients,
  purchased: state.order.purchased
});

const mapDispatchToprops = dispatch => ({
  setAutoRedirectPath: (path) => dispatch(setAutoRedirectPath(path))
})

export default connect(mapStateToProps, mapDispatchToprops)(Checkout);