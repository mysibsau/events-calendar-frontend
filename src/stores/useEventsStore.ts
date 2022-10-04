import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from 'zustand/middleware'
import axios, { AxiosError } from "axios";
import { IEvent, IEventsStore } from "../types/events";


export const useEventsStore = create<IEventsStore>()(
    devtools(immer(
        (set, get) => ({
            loading: false,
            eventList: [],
            groupList: [],
            directionList: [],
            formatsList: [],
            levelsList: [],
            organizationsList: [],
            rolesList: [],
            isEdited: false,
            setChecked: (eventId) => {
                set(state => {
                    state.eventList = state.eventList.map(item => item.id === eventId ? { ...item, isCheked: !item.isCheked } : item)
                })
            },
            fetchInvitesEventList: async (role) => {
                const authStore = sessionStorage.getItem('authStore')
                if (authStore) {
                    set(state => {
                        state.loading = true
                        state.eventList = []
                        state.groupList = []
                    })
                    const userToken = JSON.parse(authStore).state.user.token
                    const userStatus = JSON.parse(authStore).state.user.status
                    await axios.post(`/events/my_invites/`, { role: role }, { headers: { Authorization: `Token ${userToken}` } })
                        .then(async (response) => {
                            let events: IEvent[] = response.data

                            if (userStatus !== "0") {
                                await axios.get('/event_groups/', { headers: { Authorization: `Token ${userToken}` } })
                                    .then((response) => {
                                        const groups = response.data
                                        events = events.filter(item => !item.group)

                                        set(state => {
                                            state.eventList = events
                                            state.groupList = groups
                                            state.loading = false
                                        })
                                    })
                                    .catch((e: AxiosError) => {
                                        set(state => {
                                            state.eventList = events
                                            state.loading = false
                                        })
                                    })
                            } else {
                                set(state => {
                                    state.eventList = events
                                    state.loading = false
                                })
                            }
                        })
                        .catch((e: AxiosError) => {
                            set(state => {
                                state.loading = false
                            })
                        })
                }
            },
            fetchEventList: async () => {
                const authStore = sessionStorage.getItem('authStore')
                if (authStore) {
                    set(state => {
                        state.loading = true
                        state.eventList = []
                        state.groupList = []
                    })
                    const userToken = JSON.parse(authStore).state.user.token
                    const userStatus = JSON.parse(authStore).state.user.status
                    await axios.get(`/events/my/`, { headers: { Authorization: `Token ${userToken}` } })
                        .then(async (response) => {
                            let events: IEvent[] = response.data

                            if (userStatus !== "0") {
                                await axios.get('/event_groups/', { headers: { Authorization: `Token ${userToken}` } })
                                    .then((response) => {
                                        const groups = response.data
                                        events = events.filter(item => !item.group)

                                        set(state => {
                                            state.eventList = events
                                            state.groupList = groups
                                            state.loading = false
                                        })
                                    })
                                    .catch((e: AxiosError) => {
                                        set(state => {
                                            state.eventList = events
                                            state.loading = false
                                        })
                                    })
                            } else {
                                set(state => {
                                    state.eventList = events
                                    state.loading = false
                                })
                            }
                        })
                        .catch((e: AxiosError) => {
                            set(state => {
                                state.loading = false
                            })
                        })
                }
            },
            createEvent: async (event, isEdited) => {
                const authStore = sessionStorage.getItem('authStore')
                set(state => {
                    state.loading = true
                })
                if (authStore) {
                    const userToken = JSON.parse(authStore).state.user.token
                    if (isEdited.edited) {
                        await axios.patch(`/events/${isEdited.eventId}/`, event, { headers: { Authorization: `Token ${userToken}` } })
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
                    } else {
                        await axios.post('/events/', event, { headers: { Authorization: `Token ${userToken}` } })
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
                    }
                }
            },
            createReport: async (eventId, data) => {
                const authStore = sessionStorage.getItem('authStore')
                set(state => {
                    state.loading = true
                })
                if (authStore) {
                    const userToken = JSON.parse(authStore).state.user.token
                    await axios.patch(`/events/${eventId}/`, data, { headers: { Authorization: `Token ${userToken}` } })
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
                }
            },
            createGroup: async (data) => {
                const authStore = sessionStorage.getItem('authStore')
                set(state => {
                    state.loading = true
                })
                if (authStore) {
                    const userToken = JSON.parse(authStore).state.user.token
                    if (data.events_ids.length > 1) {
                        await axios.post(`/event_groups/`, data, { headers: { Authorization: `Token ${userToken}` } })
                            .then(() => {
                                set(state => {
                                    state.loading = false
                                    state.eventList = state.eventList.map(item => { return { ...item, isCheked: false } })
                                })
                            })
                            .catch((e: AxiosError) => {
                                set(state => {
                                    state.loading = false
                                })
                            })
                    } else {
                        set(state => {
                            state.loading = false
                            state.eventList = state.eventList.map(item => { return { ...item, isCheked: false } })
                        })
                    }
                }
                get().fetchEventList()
            },
            updateGroup: async (eventIds, groupId) => {
                const authStore = sessionStorage.getItem('authStore')
                set(state => {
                    state.loading = true
                })
                if (authStore) {
                    const userToken = JSON.parse(authStore).state.user.token
                    if (eventIds.length > 1) {
                        await axios.patch(`/event_groups/${groupId}/`, { events_ids: eventIds }, { headers: { Authorization: `Token ${userToken}` } })
                            .then(() => {
                                set(state => {
                                    state.loading = false
                                    state.eventList = state.eventList.map(item => { return { ...item, isCheked: false } })
                                })
                            })
                            .catch((e: AxiosError) => {
                                set(state => {
                                    state.loading = false
                                })
                            })
                    } else {
                        set(state => {
                            state.loading = false
                            state.eventList = state.eventList.map(item => { return { ...item, isCheked: false } })
                        })
                    }
                }
                get().fetchEventList()
            },
            deleteGroup: async (groupId) => {
                const authStore = sessionStorage.getItem('authStore')
                set(state => {
                    state.loading = true
                })
                if (authStore) {
                    const userToken = JSON.parse(authStore).state.user.token
                    await axios.delete(`/event_groups/${groupId}/`, { headers: { Authorization: `Token ${userToken}` } })
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
                    get().fetchEventList()
                }
            },
            getEvent: async (eventId) => {
                set(state => {
                    state.loading = true
                })
                const authStore = sessionStorage.getItem('authStore')
                if (authStore) {
                    const userToken = JSON.parse(authStore).state.user.token
                    const resp = await axios.get(`/events/${eventId}/`, { headers: { Authorization: `Token ${userToken}` } })
                        .then((response) => {
                            const data = response.data
                            return data
                        })
                        .catch((e: AxiosError) => {
                            console.log(JSON.parse(e.request.response))
                        })

                    return resp
                }
            },
            deleteEvent: async (eventId) => {
                const authStore = sessionStorage.getItem('authStore')
                set(state => {
                    state.loading = true
                })
                if (authStore) {
                    const userToken = JSON.parse(authStore).state.user.token
                    await axios.delete(`/events/${eventId}/`, { headers: { Authorization: `Token ${userToken}` } })
                        .then(() => {
                            set(state => {
                                state.eventList = state.eventList.filter(item => item.id.toString() !== eventId)
                            })
                        }).catch(() => {
                        })
                }
            },
            getData: async () => {
                const authStore = sessionStorage.getItem('authStore')
                const { directionList, levelsList, formatsList, organizationsList, rolesList } = get()
                if (authStore) {
                    const userToken = JSON.parse(authStore).state.user.token
                    if (!directionList.length) {
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
                    }
                    if (!formatsList.length) {
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
                    }
                    if (!levelsList.length) {
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
                    }
                    if (!organizationsList.length) {
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
                    }
                    if (!rolesList.length) {
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
            }
        })
    ))
);