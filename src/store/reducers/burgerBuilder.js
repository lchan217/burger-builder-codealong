import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
  }  

const reducer = (state = initialState, action) => {
    // optional - inc/dec price as own action, currently we chose to update
    // it with ingredients
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            const nameForAdding = action.ingredientName
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [nameForAdding]: state.ingredients[nameForAdding] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[nameForAdding]
            }
        case actionTypes.DELETE_INGREDIENT:
            const nameForDeleting = action.ingredientName
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [nameForDeleting]: state.ingredients[nameForDeleting] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[nameForDeleting]
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false // clear out if it was set to true before
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default: 
            return state
    }
}

export default reducer