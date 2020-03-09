import React from 'react';
import styles from './Backdrop.module.css';

const Backdrop = (props) => (
  props.show ? <div onClick={props.closeModal} className={`${styles.Backdrop} ${props.sideDrawerClosed ? styles.Close : ''}`}></div> : null
);


export default Backdrop;