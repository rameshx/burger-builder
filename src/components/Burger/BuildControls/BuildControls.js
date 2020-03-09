import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Meat', type: 'meat' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Bacon', type: 'bacon' }
];

const BuildControls = (props) => {
  const orderButtonState = Object.values(props.disabledIngredients).every(value => value);
  return (
    <div className={styles.BuildControls}>
      <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
      {controls.map(({ label, type }) => <BuildControl
        addIngredient={() => props.addIngredient(type)}
        removeIngredient={() => props.removeIngredient(type)}
        disabled={props.disabledIngredients[type]}
        key={type}
        label={label} />)}
      <button onClick={props.order}
        disabled={orderButtonState}
        className={styles.OrderButton}
      >{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
    </div>
  )
};

export default BuildControls;