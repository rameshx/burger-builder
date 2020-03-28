import React, { useState, useEffect } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import styles from './Auth.module.css';
import { auth, setAutoRedirectPath } from '../../store/actions';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../shared/utility';

const Auth = props => {

  const [authForm, setAuthForm] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Mail Address'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false,
    },
  })

  const [isSignup, setIsSignUp] = useState(true)

  const { isBuilding, setAutoRedirectPath } = props;
  useEffect(() => {
    if (!isBuilding) {
      setAutoRedirectPath();
    }
  }, [isBuilding, setAutoRedirectPath])

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedControls = {
      ...authForm,
      [inputIdentifier]: {
        ...authForm[inputIdentifier],
        touched: true,
        value: event.target.value,
        valid: checkValidity(event.target.value, authForm[inputIdentifier].validation)
      }
    }
    setAuthForm(updatedControls);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(authForm.email.value, authForm.password.value, isSignup);
  }

  const switchAuthModeHandler = () => {
    setIsSignUp(prevState => !prevState);
  }

  let form = <form onSubmit={submitHandler}>
    {
      Object.entries(authForm).map(([name, properties]) => {
        return <Input changed={(event) => inputChangedHandler(event, name)} key={name} {...properties} />;
      })
    }
    <Button btnType="Success">SUBMIT</Button>
  </form>
  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  let authRedirect = null;
  if (props.isAuth) {
    authRedirect = <Redirect to={props.autoRedirectPath} />
  }

  return (
    <div className={styles.Auth}>
      {authRedirect}
      {errorMessage}
      {form}
      <Button clicked={switchAuthModeHandler} btnType="Danger">SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
    </div>
  );
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuth: state.auth.token !== null,
  isBuilding: state.burgerBuilder.building,
  autoRedirectPath: state.auth.autoRedirectPath
})

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup)),
    setAutoRedirectPath: () => dispatch(setAutoRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);