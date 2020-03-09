import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { setAutoRedirectPath } from '../../store/actions';

class Checkout extends React.Component {

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  }

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      summary = <div>
        {purchasedRedirect}
        <CheckoutSummary
          checkoutContinued={this.checkoutContinueHandler}
          checkoutCancelled={this.checkoutCancelHandler}
          ingredients={this.props.ingredients} />
        <Route path={this.props.match.path + '/contact-data'}
          component={ContactData} />
      </div>;
    }
    return summary;
  }
}

const mapStateToProps = (state) => ({
  ingredients: state.burgerBuilder.ingredients,
  purchased: state.order.purchased
});

const mapDispatchToprops = dispatch => ({
  setAutoRedirectPath: (path) => dispatch(setAutoRedirectPath(path))
})

export default connect(mapStateToProps, mapDispatchToprops)(Checkout);