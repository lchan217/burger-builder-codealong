import * as actionTypes from './actions'

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
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
        case actionTypes.ADD_INGREDEINT:
            const nameForAdding = action.ingredientName
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [nameForAdding]: state.ingredients[nameForAdding] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[nameForAdding]
            }
        case actionTypes.DELETE_INGREDEINT:
            const nameForDeleting = action.ingredientName
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [nameForDeleting]: state.ingredients[nameForDeleting] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[nameForDeleting]
            }
        default: 
            return state
    }
}

export default reducer