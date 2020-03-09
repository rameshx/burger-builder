import React from 'react';
import styles from './Spinner.module.css';

const Spinner = () => (
  <div style={{textAlign: 'center'}}>
    <div className={styles['Lds-ring']} ><div></div><div></div><div></div><div></div></div>
  </div>
);

export default Spinner;