import React, { Component } from 'react';
import { connect } from 'react-redux'
import asyncComponent from './hoc/asyncComponent/asyncComponent'
import Layout from '../src/components/Layout/Layout'
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Logout from './containers/auth/Logout/Logout'
import * as actions from './store/actions/index'


const asyncCheckout = asyncComponent(() => {
    return import('./containers/Checkout/Checkout')
})

const asyncOrders = asyncComponent(() => {
    return import('./containers/Orders/Orders')
})

const asyncAuth = asyncComponent(() => {
    return import('./containers/auth/Auth')
})
class App extends Component {
    componentDidMount(){
        this.props.onTryAutoSignup();
    }

  render() {
      let routes = (
          <Switch>
              <Route path="/auth" component={asyncAuth} />
              <Route path="/" exact component={BurgerBuilder} />
              <Redirect to="/" />
          </Switch>
        
      )

      if(this.props.isAuthenticated){
          routes = (
              <Switch>
                <Route path="/checkout" component={asyncCheckout} />
                <Route path="/orders" component={asyncOrders} />
                <Route path="/logout" component={Logout} />
                <Route path="/auth" component={asyncAuth} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
              </Switch>
          )
      }
    return (
      <div>
        <Layout>
            {routes}                
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
