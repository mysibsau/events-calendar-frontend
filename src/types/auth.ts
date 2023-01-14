export type TRole = 0 | 1 | 2
export type TStatus = 0 | 1

export interface IContacts {
    phone: string;
    messenger_link?: string;
}

export interface IAuth {
    token: string;
    name: string;
    id: number;
    username: string;
    password: string;
    role: TRole;
    personal_status: number;
    position: string;
    contacts: IContacts;
}

export interface IUpdateUser {
    contacts: IContacts;
}

export interface IAuthStore {
    user: IAuth;
    loading: boolean;
    logIn: (username: string, password: string, code?: string) => void;
    logOut: () => void;
    updateUser: (data: IUpdateUser) => void;
}