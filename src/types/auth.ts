type TRole = "author" | "moder" | "admin" | "default"

export interface IAuth{
    token: string;
    name: string;
    id: number;
    username: string;
    password: string;
    role: TRole;
}

export interface IAuthStore {
    user: IAuth;
    loading: boolean;
    error: null | string;
    logIn: (username: string, password: string) => void;
    logOut: () => void;
}