import React, { useState } from 'react';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

const Layout = (props) => {

  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const closeSideDrawer = () => {
    setShowSideDrawer(false);
  }

  const toggleSideDrawerHandler = () => {
    setShowSideDrawer((prevState) => !prevState)
  }


  return (
    <>
      <Toolbar isAuth={props.isAuth} toggleSideDrawer={toggleSideDrawerHandler} />
      <SideDrawer isAuth={props.isAuth} open={showSideDrawer} closed={closeSideDrawer} />
      <main className={styles.Content}>
        {props.children}
      </main>
    </>
  );

}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);