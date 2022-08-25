import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from 'zustand/middleware'
import axios, { AxiosError } from "axios";
import { IAuthStore, IAuth } from "../types/auth";


const user = sessionStorage.getItem('authStore')
const foundUser = user ? JSON.parse(user).user : undefined

const defaultState: IAuth = {
    token: '',
    name: '',
    confirmed: false,
    is_staff: false,
    id: 0,
    contacts: {},
    position: "",
    personal_status: -1,
    ...foundUser
}

export const useAuthStore = create<IAuthStore>()(
    devtools(immer(persist(
        (set, get) => ({
            error: null,
            loading: false,
            user: defaultState,
            logIn: async (username, password) => {
                set({
                    loading: true
                })
                await axios.post('/auth/', { username: username, password: password })
                    .then((responce) => {
                        const data = responce.data
                        set(state => {
                            state.user = { ...state.user, ...data }
                            state.loading = false
                        })

                    })
                    .catch((e: AxiosError) => {
                        set({
                            error: "Произошла ошибка авторизации",
                            loading: false
                        })
                        console.log(JSON.parse(e.request.response))
                    })
            },
            logOut: () => {
                set({
                    user: defaultState
                })
                sessionStorage.clear()
            },
            clearError: () => {
                set(state => {
                    state.error = null
                })
            },
            updateUser: (data) => {
                set(state => {
                    state.user = {
                        ...state.user,
                        ...data
                    }
                })
            }
        }),
        {
            name: "authStore",
            getStorage: () => sessionStorage
        }
    )))
);