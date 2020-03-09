import React from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import styles from './Auth.module.css';
import { auth, setAutoRedirectPath } from '../../store/actions';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../shared/utility';

class Auth extends React.Component {

  state = {
    controls: {
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
    },
    isSignup: true
  }

  componentDidMount() {
    if(!this.props.isBuilding) {
      this.props.setAutoRedirectPath();
    }
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedControls = {
      ...this.state.controls,
      [inputIdentifier]: {
        ...this.state.controls[inputIdentifier],
        touched: true,
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[inputIdentifier].validation)
      }
    }
    this.setState({ controls: updatedControls });
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => ({ isSignup: !prevState.isSignup }));
  }

  render() {
    let form = <form onSubmit={this.submitHandler}>
      {
        Object.entries(this.state.controls).map(([name, properties]) => {
          return <Input changed={(event) => this.inputChangedHandler(event, name)} key={name} {...properties} />;
        })
      }
      <Button btnType="Success">SUBMIT</Button>
    </form>
    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if(this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;
    if(this.props.isAuth) {
      authRedirect = <Redirect to={this.props.autoRedirectPath} />
    }

    return (
      <div className={styles.Auth}>
        {authRedirect}
        {errorMessage}
        {form}
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
      </div>
    );
  }
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