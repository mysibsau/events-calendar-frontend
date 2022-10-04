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
            loading: false,
            user: defaultState,
            logIn: async (username, password, code) => {
                set({
                    loading: true
                })
                await axios.post('/auth/', { username: username, password: password, code: code })
                    .then((responce) => {
                        const data = responce.data
                        set(state => {
                            state.user = { ...state.user, ...data }
                            state.loading = false
                        })

                    })
                    .catch((e: AxiosError) => {
                        set({
                            loading: false
                        })
                    })
            },
            logOut: () => {
                set({
                    user: defaultState
                })
                sessionStorage.clear()
            },
            updateUser: async (data) => {
                const authStore = sessionStorage.getItem('authStore')
                if (authStore) {
                    const userToken = JSON.parse(authStore).state.user.token
                    await axios.put(`/users/${get().user.id}`, data, { headers: { Authorization: `Token ${userToken}` } })
                        .then(() => {
                            set(state => {
                                state.loading = false
                            })
                        })
                        .catch((e: AxiosError) => {
                            set(state => {
                                state.loading = false
                            })
                        })
                    set(state => {
                        state.user = {
                            ...state.user,
                            ...data
                        }
                    })
                }
            }
        }),
        {
            name: "authStore",
            getStorage: () => sessionStorage
        }
    )))
);