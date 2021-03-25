import * as actionTypes from './actionTypes'

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const deleteIngredient = (name) => {
    return {
        type: actionTypes.DELETE_INGREDIENT,
        ingredientName: name
    }
}