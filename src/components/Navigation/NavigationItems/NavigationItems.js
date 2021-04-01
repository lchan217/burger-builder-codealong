import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    {/* active is a boolean prop - do not need to pass like active={true} */}
    <NavigationItem link="/" exact>Burger Builder</NavigationItem>
    {props.isAuthenticated
        ? <NavigationItem link="/orders">Orders</NavigationItem>
        : null}
    {props.isAuthenticated 
        ? <NavigationItem link="/logout">Log Out</NavigationItem> 
        : <NavigationItem link="/auth">Authenticate</NavigationItem>}
    
  </ul>
)

// notice we're not connecting to store here because this is a dumb component

export default navigationItems;