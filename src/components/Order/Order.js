import React from 'react';
import styles from './Order.module.css';

const Order = (props) => {
  const ingredientOutput = Object.entries(props.ingredients).map(([name, quantity]) => {
    return <span style={{
      textTransform: 'capitalize',
      display: 'inline-block',
      margin: '0 8px',
      border: '1px solid #ccc',
      padding: '5px'
    }} key={name} >{name} ({quantity})</span>
  })
  return (
    <div className={styles.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
  )
};

export default Order;