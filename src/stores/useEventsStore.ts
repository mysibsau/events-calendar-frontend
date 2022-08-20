import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from 'zustand/middleware'
import axios, { AxiosError } from "axios";
import { IEventsStore } from "../types/events";


export const useEventsStore = create<IEventsStore>()(
    devtools(immer(
        (set, get) => ({
            error: null,
            loading: false,
            eventList: [],
            fetchEventList: async () => {
                const authStore = sessionStorage.getItem('authStore')
                if (authStore) {
                    const userToken = JSON.parse(authStore).state.user.token
                    await axios.get('/events/', { headers: { Authorization: `Token ${userToken}` } })
                        .then((response) => {
                            const data = response.data
                            set({
                                eventList: data
                            })
                        })
                        .catch((e: AxiosError) => {
                            console.log(JSON.parse(e.request.response))
                        })
                }
            },
            createEvent: async (event) => {
                const authStore = sessionStorage.getItem('authStore')
                if (authStore) {
                    const userToken = JSON.parse(authStore).state.user.token
                    await axios.post('/events/', event, {headers: { Authorization: `Token ${userToken}` } })
                        .then((response) => {
                            const data = response.data
                            console.log(data);
                            
                        })
                        .catch((e: AxiosError) => {
                            console.log(JSON.parse(e.request.response))
                        })
                }
            }
        })
    ))
);