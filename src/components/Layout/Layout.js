import React, { Component} from 'react';
import Aux from '../../hoc/Aux/Aux'
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux'

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  SideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false })
  }

  sideDrawerToggleHanldler = () => {  
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer }
    })
  }

  render(){
    return(
      <Aux>
        <Toolbar 
            isAuth={this.props.isAuth}
            drawerToggleClicked={this.sideDrawerToggleHanldler} />
        <SideDrawer 
            isAuth={this.props.isAuth}
            open={this.state.showSideDrawer} 
            closed={this.SideDrawerClosedHandler} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);