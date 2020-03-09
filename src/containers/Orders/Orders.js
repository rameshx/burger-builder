import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

  componentDidMount() {
    this.props.fetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders = <Spinner />
    if(!this.props.loading) {
      orders = this.props.orders.map(order =>
        <Order key={order.id} ingredients={order.ingredients} price={order.totalPrice} />)
      if(orders.length < 1) {
        orders = <h3>Looks like you haven't ordered anything yet.</h3>
      }
    }
    return (
      <div>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.order.loading,
  orders: state.order.orders,
  token: state.auth.token,
  userId: state.auth.userId
})

const mapDispatchToProps = dispatch => ({
  fetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));