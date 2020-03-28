import React, { useEffect, Suspense } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Switch, Route } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import { checkAuthState } from './store/actions';

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
})
const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
})
const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
})

const App = (props) => {
  const { checkAuthState } = props;

  useEffect(() => {
    checkAuthState();
  }, [checkAuthState])


  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/" component={BurgerBuilder} />
    </Switch>
  );
  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={Auth} />
        <Route path="/" component={BurgerBuilder} />
      </Switch>
    );
  }
  return (
    <Layout>
      <Suspense fallback={<p>Loading...</p>}>
        {routes}
      </Suspense>
    </Layout>
  );

}

const mapStateToProps = state => ({
  isAuth: state.auth.token !== null
})

const mapDispatchToProps = dispatch => ({
  checkAuthState: () => dispatch(checkAuthState())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
