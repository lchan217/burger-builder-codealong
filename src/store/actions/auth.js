import * as actionTypes from './actionTypes'
import axios from 'axios' // note this isn't from axios-orders

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime*1000)
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
                console.log(response)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(error => {
                console.log(error.response.data.error)
                dispatch(authFail(error.response.data.error))
            })
    }
}