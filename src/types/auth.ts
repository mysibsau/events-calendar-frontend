export interface IAuth{
    token: string;
    name: string;
    confirmed: boolean;
    is_staff: boolean;
    id: number;
}

export interface AuthState {
    user: IAuth;
    loading: boolean;
    error: null | string;
}

export enum AuthActionTypes {
    FETCH_LOGIN = 'FETCH_LOGIN',
    FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS',
    FETCH_LOGIN_ERROR = 'FETCH_LOGIN_ERROR',
    FETCH_LOGOUT = 'FETCH_LOGOUT',
}

interface FetchLoginAction {
    type: AuthActionTypes.FETCH_LOGIN
}
interface FetchLoginSuccessAction {
    type: AuthActionTypes.FETCH_LOGIN_SUCCESS;
    payload: IAuth
}
interface FetchLoginErrorAction {
    type: AuthActionTypes.FETCH_LOGIN_ERROR;
    payload: string
}
interface FetchLogoutAction {
    type: AuthActionTypes.FETCH_LOGOUT
}

export type AuthAction = FetchLoginAction | FetchLoginSuccessAction | FetchLoginErrorAction | FetchLogoutAction