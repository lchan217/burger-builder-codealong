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

export const setIngredients = (allIngredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: allIngredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return {
        type: actionTypes.INIT_INGREDIENTS
    }
}