import React from 'react';
import styles from './Input.module.css';

const Input = (props) => {

  let inputElement = null;
  const inputClasses = [styles.InputElement];
  if((!props.valid) && props.validation && props.touched) {
    inputClasses.push(styles.Invalid);
  }
  switch (props.elementType) {
    case 'input':
      inputElement = <input onChange={props.changed} className={inputClasses.join(' ')} value={props.value} {...props.elementConfig} />;
      break;
    case 'textarea':
      inputElement = <textarea onChange={props.changed} className={inputClasses.join(' ')} value={props.value} {...props.elementConfig} />;
      break;
    case 'select':
      inputElement = (
        <select onChange={props.changed} className={inputClasses.join(' ')} value={props.value} >
          {props.elementConfig.options.map(({ value, displayValue }) => {
            return <option key={value} value={value} >{displayValue}</option>
          })}
        </select>
      );
      break;
    default:
      inputElement = <input onChange={props.changed} className={inputClasses.join(' ')} value={props.value} {...props.elementConfig} />;
      break;
  }
  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
}

export default Input