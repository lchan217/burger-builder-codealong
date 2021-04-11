import React, { useState } from 'react';
import Aux from '../../hoc/Aux/Aux'
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux'

const layout = props => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false)

  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false)
  }

  const sideDrawerToggleHandler = () => {  
    setSideDrawerIsVisible(!sideDrawerIsVisible)
  }

  return(
    <Aux>
      <Toolbar 
        isAuth={props.isAuth}
        drawerToggleClicked={sideDrawerToggleHandler} 
      />
      <SideDrawer 
        isAuth={props.isAuth}
        open={sideDrawerIsVisible} 
        closed={sideDrawerClosedHandler} />
      <main className={classes.Content}>
        {props.children}
      </main>
    </Aux>
  )
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(layout);