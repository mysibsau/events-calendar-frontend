import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from 'zustand/middleware'
import axios, { AxiosError } from "axios";
import { IEvent, IEventsStore } from "../types/events";
import { IEventsGroup } from "../types/groups";


export const useEventsStore = create<IEventsStore>()(
    devtools(immer(
        (set, get) => ({
            currentEventType: "my",
            loading: true,
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
                    state.eventList = state.eventList.map(item => item.id === eventId ? { ...item, isChecked: !item.isChecked } : item)
                })
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
                                    state.directionList = response.data
                                })
                            })
                    }
                    if (!formatsList.length) {
                        await axios.get('/reference/formats/', { headers: { Authorization: `Token ${userToken}` } })
                            .then((response) => {
                                set(state => {
                                    state.formatsList = response.data
                                })
                            })
                    }
                    if (!levelsList.length) {
                        await axios.get('/reference/levels/', { headers: { Authorization: `Token ${userToken}` } })
                            .then((response) => {
                                set(state => {
                                    state.levelsList = response.data
                                })
                            })
                    }
                    if (!organizationsList.length) {
                        await axios.get('/reference/organizations/', { headers: { Authorization: `Token ${userToken}` } })
                            .then((response) => {
                                set(state => {
                                    state.organizationsList = response.data
                                })
                            })
                    }
                    if (!rolesList.length) {
                        await axios.get('/reference/roles/', { headers: { Authorization: `Token ${userToken}` } })
                            .then((response) => {
                                set(state => {
                                    state.rolesList = response.data
                                })
                            })
                    }
                }
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
                    const userRole = JSON.parse(authStore).state.user.role
                    await axios.post(`/events/my_invites/`, { role: role }, { headers: { Authorization: `Token ${userToken}` } })
                        .then(async (response) => {
                            let events: IEvent[] = response.data

                            if (userRole !== 0) {
                                await axios.get<IEventsGroup[]>('/event_groups/', { headers: { Authorization: `Token ${userToken}` } })
                                    .then((response) => {
                                        let groups = response.data
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
                let url = "";
                const authStore = sessionStorage.getItem('authStore')
                if (authStore) {
                    set(state => {
                        state.loading = true
                        state.eventList = []
                        state.groupList = []
                    })
                    const userToken = JSON.parse(authStore).state.user.token
                    const userRole = JSON.parse(authStore).state.user.role

                    userRole !== 2 ? url = `/events/my/` : url = `/events/`;

                    await axios.get(url, { headers: { Authorization: `Token ${userToken}` } })
                        .then(async (response) => {
                            let events: IEvent[] = response.data

                            if (userRole === 1) {
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
                                state.eventList = state.eventList.filter(item => item.id.toString() !== eventId);
                                state.loading = false
                            })
                        }).catch(() => {
                            set(state => {
                                state.loading = false
                            })
                        })
                }
            },
            verifiedEvent: async (eventId, isVerified) => {
                const { eventList, fetchEventList, fetchInvitesEventList, currentEventType } = get()
                const event = eventList.filter(item => item.id === eventId)[0]
                const authStore = sessionStorage.getItem('authStore')
                let url = isVerified ? `/events/${eventId}/verificate/` : `/events/${eventId}/reject/`
                set(state => {
                    state.loading = true
                })
                if (authStore) {
                    const userToken = JSON.parse(authStore).state.user.token
                    await axios.post(url, event, { headers: { Authorization: `Token ${userToken}` } }).finally(() => {
                        if (currentEventType === "my") {
                            fetchEventList()
                        } else {
                            fetchInvitesEventList(0)
                        }
                    })
                }
            },
            createReport: async (eventId, data) => {
                const authStore = sessionStorage.getItem('authStore')
                set(state => {
                    state.loading = true
                })
                if (authStore) {
                    const userToken = JSON.parse(authStore).state.user.token
                    await axios.post(`/events/${eventId}/generate_report/`, data, { headers: { Authorization: `Token ${userToken}`} })
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
            getReport: async (eventId) => {
                const authStore = sessionStorage.getItem('authStore')
                if (authStore) {
                    const userToken = JSON.parse(authStore).state.user.token
                    const resp = await axios.get(`/events/${eventId}/get_report/`, { headers: { Authorization: `Token ${userToken}` } })
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
            generateReport: async (eventId) => {
                const authStore = sessionStorage.getItem('authStore')
                set(state => {
                    state.loading = true
                })
                if (authStore) {
                    const userToken = JSON.parse(authStore).state.user.token
                    await axios({
                        url: `/events/${eventId}/export_report/`,
                        method: "GET",
                        headers: { Authorization: `Token ${userToken}`},
                        responseType: "blob"
                    }).then(resp => {
                        const href = window.URL.createObjectURL(new Blob([resp.data]))

                        const link = document.createElement("a")

                        link.href = href
                        link.setAttribute("download", "file.docx");

                        document.body.appendChild(link)
                        link.click()
                        link.remove()
                        
                        set(state => {
                            state.loading = false
                        })
                    })
                }
            },
            generateTotalReport: async () => {
                const authStore = sessionStorage.getItem('authStore')
                set(state => {
                    state.loading = true
                })
                if (authStore) {
                    const userToken = JSON.parse(authStore).state.user.token
                    await axios({
                        url: `/events/get_reports_csv/`,
                        method: "GET",
                        headers: { Authorization: `Token ${userToken}`},
                        responseType: "blob"
                    }).then(resp => {
                        const href = window.URL.createObjectURL(new Blob([resp.data]))

                        const link = document.createElement("a")

                        link.href = href
                        link.setAttribute("download", "file.csv");

                        document.body.appendChild(link)
                        link.click()
                        link.remove()
                        
                        
                        set(state => {
                            state.loading = false
                        })
                    })
                }
            },
            createGroup: async (data) => {
                const authStore = sessionStorage.getItem('authStore')
                if (authStore) {
                    const userToken = JSON.parse(authStore).state.user.token
                    if (data.events_ids.length > 1) {
                        await axios.post(`/event_groups/`, data, { headers: { Authorization: `Token ${userToken}` } })
                            .then(() => {
                                get().fetchEventList()
                            })
                    } else {
                        set(state => {
                            state.eventList = state.eventList.map(item => { return { ...item, isChecked: false } })
                        })
                    }
                }
            },
            updateGroup: async (data, groupId) => {
                const authStore = sessionStorage.getItem('authStore')
                if (authStore) {
                    const userToken = JSON.parse(authStore).state.user.token
                    await axios.patch(`/event_groups/${groupId}/`, { ...data }, { headers: { Authorization: `Token ${userToken}` } })
                        .then(() => {
                            get().fetchEventList()
                        })
                }
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
        })
    ))
);