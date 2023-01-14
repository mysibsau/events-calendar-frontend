import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from 'zustand/middleware'
import axios, { AxiosError } from "axios";
import { IPersonalStore } from "../types/personal";


export const useEventStore = create<IPersonalStore>()(
    devtools(immer(
        (set, get) => ({
            loading: true,
            personalList: [],
            inviteLink: undefined,
            getPersonal: async (role, isAll) => {
                const authStore = sessionStorage.getItem('authStore')
                if (authStore) {
                    set((state) => {
                        state.loading = true
                    })
                    const userToken = JSON.parse(authStore).state.user.token
                    const url = role === 0 ? "/users/get_all_authors/" : "users/get_all_moderators/"
                    if (isAll) {
                        await axios.get(url, { headers: { Authorization: `Token ${userToken}` } })
                            .then((response) => {
                                const data = response.data
    
                                set(state => {
                                    state.personalList = data
                                    state.loading = false
                                })
                            })
                            .catch((e: AxiosError) => {
                                set((state) => {
                                    state.loading = false
                                })
                            })
                    } else {
                        await axios.post(`/users/my_invites/`, { role: role }, { headers: { Authorization: `Token ${userToken}` } })
                            .then((response) => {
                                const data = response.data
    
                                set(state => {
                                    state.personalList = data
                                    state.loading = false
                                })
                            })
                            .catch((e: AxiosError) => {
                                set((state) => {
                                    state.loading = false
                                })
                            })
                    }
                }
            },
            addPersonal: async (role, data) => {
                const authStore = sessionStorage.getItem('authStore')
                if (authStore) {
                    const userToken = JSON.parse(authStore).state.user.token
                    await axios.post(`/users/invite/`, { role: role, status: data.status, position: data.position }, { headers: { Authorization: `Token ${userToken}` } })
                        .then((response) => {
                            const data = response.data.code
                            set(state => {
                                state.inviteLink = data
                            })
                        })
                }
            },
            clearInvite: () => {
                set(state => {
                    state.inviteLink = undefined
                })
            }
        })
    ))
);