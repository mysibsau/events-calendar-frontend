import axios, { AxiosError } from "axios"
import {Dispatch} from "redux"
import {AuthAction, AuthActionTypes} from "../../types/auth"


export const fetchAuth = (username: string, password: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        dispatch({type: AuthActionTypes.FETCH_LOGIN})
        await axios.post('/auth/', {username: username, password: password})
            .then((responce) => {
                const data = responce.data
                setTimeout(() => {
                    dispatch({type: AuthActionTypes.FETCH_LOGIN_SUCCESS, payload: data})
                }, 500)
                localStorage.setItem('user', JSON.stringify(data));
            })
            .catch((e: AxiosError) => {
                dispatch({
                    type: AuthActionTypes.FETCH_LOGIN_ERROR,
                    payload: 'Произошла ошибка авторизации'
                })
                console.log(JSON.parse(e.request.response))
            })
    }
}

export const fetchLogout = () => {
    return (dispatch: Dispatch<AuthAction>) => {
        localStorage.removeItem('user');
        dispatch({type: AuthActionTypes.FETCH_LOGOUT})
    }
}
