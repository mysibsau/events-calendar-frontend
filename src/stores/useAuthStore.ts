import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from 'zustand/middleware'
import axios, { AxiosError } from "axios";
import { IAuthStore, IAuth } from "../types/auth";


const user = sessionStorage.getItem('authStore')
let foundUser = null

if (user) {
    foundUser = JSON.parse(user).user
}

const defaultState: IAuth = foundUser || {
    token: '',
    name: '',
    confirmed: false,
    is_staff: false,
    id: 0
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
                        setTimeout(() => {
                            set(state => {
                                state.user = {...state.user, ...data}
                                state.loading = false
                            })
                        }, 500)

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
            }
        }),
        {
            name: "authStore",
            getStorage: () => sessionStorage
        }
    )))
);