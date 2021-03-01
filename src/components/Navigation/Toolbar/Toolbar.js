import React from 'react';
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'

const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <div>Menu</div>
      <div><Logo /></div>
      <nav>
        <ul>link 1</ul>
        <ul>link 2</ul>
        <ul>link 3</ul>
      </nav>
    </header>
  );
};

export default toolbar;