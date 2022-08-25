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
            directionList: [],
            formatsList: [],
            levelsList: [],
            organizationsList: [],
            rolesList: [],
            fetchEventList: async () => {
                const authStore = sessionStorage.getItem('authStore')
                if (authStore) {
                    const userToken = JSON.parse(authStore).state.user.token
                    await axios.get('/events/my/', { headers: { Authorization: `Token ${userToken}` } })
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
                    await axios.post('/events/', event, { headers: { Authorization: `Token ${userToken}` } })
                        .then((response) => {
                            const data = response.data
                            console.log(data);
                        })
                        .catch((e: AxiosError) => {
                            console.log(JSON.parse(e.request.response))
                        })
                }
            },
            deleteEvent: async (eventId) => {
                const authStore = sessionStorage.getItem('authStore')
                if (authStore) {
                    const userToken = JSON.parse(authStore).state.user.token
                    await axios.delete(`/events/${eventId}/`, { headers: { Authorization: `Token ${userToken}` } })
                    .then(() =>
                        set(state => {
                            state.eventList = state.eventList.filter(item => item.id.toString() !== eventId)
                        })
                    )
                }
            },
            getData: async () => {
                const authStore = sessionStorage.getItem('authStore')
                if (authStore) {
                    const userToken = JSON.parse(authStore).state.user.token
                    await axios.get('/reference/directions/', { headers: { Authorization: `Token ${userToken}` } })
                        .then((response) => {
                            set(state => {
                                state.directionList = [
                                    {
                                        id: -1,
                                        name: "Выберите направление мероприятия"
                                    },
                                    ...response.data
                                ]
                            })
                        })
                    await axios.get('/reference/formats/', { headers: { Authorization: `Token ${userToken}` } })
                        .then((response) => {
                            set(state => {
                                state.formatsList = [
                                    {
                                        id: -1,
                                        name: "Выберите формат мероприятия"
                                    },
                                    ...response.data,
                                ]
                            })
                        })
                    await axios.get('/reference/levels/', { headers: { Authorization: `Token ${userToken}` } })
                        .then((response) => {
                            set(state => {
                                state.levelsList = [
                                    {
                                        id: -1,
                                        name: "Выберите уровень мероприятия"
                                    },
                                    ...response.data,
                                ]
                            })
                        })
                    await axios.get('/reference/organizations/', { headers: { Authorization: `Token ${userToken}` } })
                        .then((response) => {
                            set(state => {
                                state.organizationsList = [
                                    {
                                        id: -1,
                                        name: "Выберите ответственное подразделение"
                                    },
                                    ...response.data,
                                ]
                            })
                        })
                    await axios.get('/reference/roles/', { headers: { Authorization: `Token ${userToken}` } })
                        .then((response) => {
                            set(state => {
                                state.rolesList = [
                                    {
                                        id: -1,
                                        name: "Выберите роль СибГУ"
                                    },
                                    ...response.data,
                                ]
                            })
                        })
                }
            }
        })
    ))
);