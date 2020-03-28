import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../store/actions/index';
import { checkValidity } from '../../../shared/utility';


const ContactData = props => {

  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Eg: Ramesh'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      label: 'Name'
    },
    email: {
      value: '',
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'test@test.com'
      },
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false,
      label: 'Email'
    },
    country: {
      value: '',
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'INDIA'
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      label: 'Country'
    },
    street: {
      value: '',
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Eg: grove street'
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      label: 'Street'
    },
    zipCode: {
      value: '',
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Eg: 530027'
      },
      validation: {
        required: true,
        minLength: 5,
        maxLength: 6
      },
      valid: false,
      touched: false,
      label: 'ZIP CODE'
    },
    delivery: {
      value: 'fastest',
      elementType: 'select',
      elementConfig: {
        options: [{ value: 'cheapest', displayValue: 'Cheapest' }, { value: 'fastest', displayValue: 'Fastest' }]
      },
      validation: {},
      valid: true,
      label: 'Delivery Mode'
    },
  })

  const [formIsValid, setFormIsValid] = useState(false);

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    const isFormValid = Object.values(updatedOrderForm).every(({ valid }) => valid);
    setOrderForm(updatedOrderForm);
    setFormIsValid(isFormValid)
  }

  const orderHandler = (event) => {
    event.preventDefault();
    const formData = Object.entries(orderForm).reduce((acc, [name, { value }]) => {
      return (acc[name] = value, acc);
    }, {})
    const order = {
      ingredients: props.ingredients,
      totalPrice: props.totalPrice,
      orderData: formData,
      userId: props.userId
    };
    props.purchaseBurger(order, props.token);
  }


  let form = <Spinner />;
  if (!props.loading) {
    form = <form onSubmit={orderHandler}>
      {
        Object.entries(orderForm).map(([name, properties]) => {
          return <Input changed={(event) => inputChangedHandler(event, name)} key={name} {...properties} />;
        })
      }
      <Button disabled={!formIsValid} btnType="Success">SUBMIT</Button>
    </form>;
  }
  return (
    <div className={styles.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
}

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  purchaseBurger: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
