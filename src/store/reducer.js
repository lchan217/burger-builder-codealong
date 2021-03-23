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

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDEINT:
            const addName = action.ingredientName
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [addName]: state.ingredients[addName] + 1
                }
            }
        case actionTypes.DELETE_INGREDEINT:
            const deleteName = action.ingredientName
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [deleteName]: state.ingredients[deleteName] - 1
                }
            }
        default: 
            return state
    }
}

export default reducer