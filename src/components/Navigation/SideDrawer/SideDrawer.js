import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';


const SideDrawer = (props) => {

  return (
    <>
      <Backdrop sideDrawerClosed closeModal={props.closed} show={props.open} />
      <div onClick={props.closed} className={`${styles.SideDrawer} ${props.open ? styles.Open : styles.Close}`}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={props.isAuth}/>
        </nav>
      </div>
    </>
  );
}

export default SideDrawer;