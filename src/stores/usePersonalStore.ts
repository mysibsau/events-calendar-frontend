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
            getAuthors: async () => {

            },
            getModerators: async () => {

            },
            addPersonal: async (role) => {
                const authStore = sessionStorage.getItem('authStore')
                if (authStore) {
                    const userToken = JSON.parse(authStore).state.user.token
                    await axios.post(`/users/invite/`, {role: role}, { headers: { Authorization: `Token ${userToken}` } })
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