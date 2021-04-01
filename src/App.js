import React, { Component } from 'react';
import Layout from '../src/components/Layout/Layout'
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import { Route, Switch } from 'react-router-dom'
import Orders from './containers/Orders/Orders'
import Auth from './containers/auth/Auth'
import Logout from './containers/auth/Logout/Logout'

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            <Switch>
                <Route path="/checkout" component={Checkout} />
                <Route path="/orders" component={Orders} />
                <Route path="/auth" component={Auth} />
                <Route path="/logout" component={Logout} />
                <Route path="/" exact component={BurgerBuilder} />
            </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
