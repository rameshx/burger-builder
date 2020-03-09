import React from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends React.Component {

  render() {
    const ingredientSummary = Object.entries(this.props.ingredients)
      .map(([ingredient, quantity]) => {
        return (
          <li key={ingredient}>
            <span style={{ textTransform: 'capitalize' }}>{ingredient}</span>: {quantity}
          </li>);
      })

    return (
      <>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button clicked={this.props.cancel} btnType="Danger">CANCEL</Button>
        <Button clicked={this.props.continue} btnType="Success">CONTINUE</Button>
      </>
    );
  }

};

export default OrderSummary;