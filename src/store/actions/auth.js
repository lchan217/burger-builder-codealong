import * as actionTypes from './actionTypes'
import axios from 'axios' // note this isn't from axios-orders

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        // authenticate user
        // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY] - comes from googling firebase
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDr6wC1ZLf4o-GL47mShLIrY6NiqXqX8tI'
        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDr6wC1ZLf4o-GL47mShLIrY6NiqXqX8tI'
        }
        axios.post(url, authData)
        
            .then(response => {
                console.log(response.data)
                dispatch(authSuccess(response.data))
            })
            .catch(error => {
                console.log(error)
                dispatch(authFail(error))
            })
    }
}