import React, { Component } from 'react';
import { connect } from 'react-redux'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as burgerBuilderActions from '../../store/actions/index'
class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null
  }

  componentDidMount () {
      this.props.onInitIngredients()
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    
      return sum > 0
  }

  addIngredientHandler = (type) => {
    // const oldCount = this.state.ingredients[type]
    // const updatedCount = oldCount + 1

    // const updatedIngredients = {
    //   ...this.state.ingredients
    // }
  
    // updatedIngredients[type] = updatedCount

    // const priceAddition = INGREDIENT_PRICES[type]
    // const oldPrice = this.state.totalPrice
    // const newPrice = oldPrice + priceAddition

    // this.setState({ 
    //   ingredients: updatedIngredients,
    //   totalPrice: newPrice
    //  })

    // this.updatePurchaseState(updatedIngredients)
  }

  removeIngredientHanlder = (type) => {
    // const oldCount = this.state.ingredients[type]
    // if(oldCount <= 0){
    //   return // can't have negative ingredients
    // }

    // const updatedCount = oldCount - 1

    // const updatedIngredients = {
    //   ...this.state.ingredients
    // }
  
    // updatedIngredients[type] = updatedCount

    // const priceDeduction = INGREDIENT_PRICES[type]
    // const oldPrice = this.state.totalPrice
    // const newPrice = oldPrice - priceDeduction

    // this.setState({ 
    //   ingredients: updatedIngredients,
    //   totalPrice: newPrice
    //  })

    //  this.updatePurchaseState(updatedIngredients)
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    // use redux store to get ingredients now
    // const queryParams = [];
    // for(let ingredient in this.state.ingredients){
    //     queryParams.push(encodeURIComponent(ingredient) + '=' + encodeURIComponent(this.state.ingredients[ingredient]))
    // }
    // // queryParams = ["bacon=2", "cheese=3", "meat=2", "salad=0"]
    // queryParams.push('price=' + this.props.price)
    // const queryString = queryParams.join('&')
    // this.props.history.push({
    //     pathname:'/checkout',
    //     search: '?' + queryString
    // })
    // http://localhost:3000/checkout?bacon=1&cheese=3&meat=1&salad=1
    this.props.history.push('/checkout')
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    }

    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null

    let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />
    
    if(this.props.ings){
        burger = (
            <Aux>
                <Burger ingredients={this.props.ings}/>
                <BuildControls 
                ingredientAdded={this.props.onIngredientAdded}
                ingredientRemoved={this.props.onIngredientDeleted}
                disabled={disabledInfo}
                price={this.props.price}
                purchasable={this.updatePurchaseState(this.props.ings)} 
                ordered={this.purchaseHandler} />
            </Aux>
        ) 
        
        orderSummary = 
            <OrderSummary 
            ingredients={this.props.ings}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.props.price.toFixed(2)} />
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientDeleted: ingName => dispatch(burgerBuilderActions.deleteIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));