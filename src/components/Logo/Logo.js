import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import styles from './Logo.module.css';

const Logo = (props) => (
  <div className={styles.Logo} style={{height: props.height}}>
    <img alt="burger-builder" src={burgerLogo}></img>
  </div>
);

export default Logo;