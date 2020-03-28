import React, { useEffect } from 'react';
import { logout } from '../../../store/actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


const Logout = ({ logout }) => {
  useEffect(() => {
    logout();
  }, [logout])

  return <Redirect to="/" />;
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(null, mapDispatchToProps)(Logout);