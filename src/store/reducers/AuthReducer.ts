import {AuthAction, AuthActionTypes, AuthState } from "../../types/auth"

const user = localStorage.getItem('user')
let foundUser = null

if (user) {
    foundUser = JSON.parse(user)
}

const defaultState: AuthState = {
    user: foundUser || {
        token: '',
        name: '',
        confirmed: false,
        is_staff: false,
        id: 0
    },
    loading: false,
    error: null
}

export const authReducer = (state = defaultState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionTypes.FETCH_LOGIN:
            return {...state, loading: true, error: null}
        case AuthActionTypes.FETCH_LOGIN_SUCCESS:
            return {...state, loading: false, error: null, user: {...state.user, ...action.payload}}
        case AuthActionTypes.FETCH_LOGIN_ERROR:
            return {...state, loading: false, error: action.payload}
        case AuthActionTypes.FETCH_LOGOUT:
            return defaultState
        default:
            return state
    }
}
