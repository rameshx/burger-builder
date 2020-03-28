import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = props => {

  const loading = useSelector(state => state.order.loading);
  const orders = useSelector(state => state.order.orders);
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.userId);

  const dispatch = useDispatch();
  const fetchOrders = useCallback((token, userId) => dispatch(actions.fetchOrders(token, userId)), [
    dispatch
  ]);

  useEffect(() => {
    fetchOrders(token, userId);
  }, [fetchOrders, token, userId])

  let userOrders = <Spinner />
  if (!loading) {
    userOrders = orders.map(order =>
      <Order key={order.id} ingredients={order.ingredients} price={order.totalPrice} />)
    if (orders.length < 1) {
      userOrders = <h3>Looks like you haven't ordered anything yet.</h3>
    }
  }
  return (
    <div>
      {userOrders}
    </div>
  );
}

export default withErrorHandler(Orders, axios);