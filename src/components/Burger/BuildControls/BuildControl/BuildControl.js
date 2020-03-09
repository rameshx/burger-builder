import React from 'react';
import styles from './BuildControl.module.css';

const BuildControl = (props) => (
  
  <div className={styles.BuildControl}>
    <div className={styles.Label}>{ props.label }</div>
    <button disabled={props.disabled} onClick={props.removeIngredient} className={styles.Less}>Less</button>
    <button onClick={props.addIngredient} className={styles.More}>More</button>
  </div>
);

export default BuildControl;