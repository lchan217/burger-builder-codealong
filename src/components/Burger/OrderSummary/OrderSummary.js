import React from 'react';
import Aux from '../../../hoc/Aux'
const orderSummary = (props) => {
  // WANT: <li>salad: 1</li> <li>cheese: 2</li> etc
  // Object.keys(props.ingredients) = ["salad", "bacon", "cheese", "meat"]
  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
      return (
        <li key={igKey}>
          <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
        </li>
      )
    })
  
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>Ingredients</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to Checkout?</p>
    </Aux>
  );
};

export default orderSummary;