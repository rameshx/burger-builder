import React from 'react';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends React.Component {

  state = {
    showSideDrawer: false
  }

  closeSideDrawer = () => {
    this.setState({showSideDrawer: false});
  }

  toggleSideDrawerHandler = () => {
    this.setState((prevState) => ({showSideDrawer: !prevState.showSideDrawer}))
  }

  render() {
    return (
      <>
        <Toolbar isAuth={this.props.isAuth} toggleSideDrawer={this.toggleSideDrawerHandler}/>
        <SideDrawer isAuth={this.props.isAuth} open={this.state.showSideDrawer} closed={this.closeSideDrawer}/>
        <main className={styles.Content}>
          {this.props.children}
        </main>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
} 

export default connect(mapStateToProps)(Layout);