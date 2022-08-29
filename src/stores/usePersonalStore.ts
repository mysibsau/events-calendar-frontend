import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from 'zustand/middleware'
import axios, { AxiosError } from "axios";
import { IPersonalStore } from "../types/personal";
import { stat } from "fs";


export const useEventStore = create<IPersonalStore>()(
    devtools(immer(
        (set, get) => ({
            personalList: [],
            inviteLink: undefined,
            getPersonal: async (role) => {
                const authStore = sessionStorage.getItem('authStore')
                if (authStore) {
                    const userToken = JSON.parse(authStore).state.user.token
                    await axios.post(`/users/my_invites/`, { role: role }, { headers: { Authorization: `Token ${userToken}` } })
                        .then((response) => {
                            const data = response.data
                            
                            set(state => {
                                state.personalList = data
                            })
                        })
                        .catch((e: AxiosError) => {
                            console.log(JSON.parse(e.request.response))
                        })
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
                        .catch((e: AxiosError) => {
                            console.log(JSON.parse(e.request.response))
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