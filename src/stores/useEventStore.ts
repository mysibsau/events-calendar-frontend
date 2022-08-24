import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from 'zustand/middleware'
import axios, { AxiosError } from "axios";
import { IEvent, IEventStore } from "../types/event";


const defaultState: IEvent = {
    id: 0,
    name: "",
    start_date: "",
    stop_date: "",
    is_verified: false,
    educational_work_in_opop: false,
    hours_count: 0,
    place: "",
    coverage_participants_plan: 0,
    responsible: "",
    direction: 0,
    format: 0,
    author: "",
    organization: -1,
    verified: 0,
    important_dates: [],
    level: 0,
    coverage_participants_fact: 0,
    free_plan: false,
    links: "",
    status: "0",
    verified_date: "",
    role: 0,
    description: ""
}

export const useEventStore = create<IEventStore>()(
    devtools(immer(
        (set, get) => ({
            error: null,
            loading: false,
            event: defaultState,
            getEvent: async (eventId) => {
                const authStore = sessionStorage.getItem('authStore')
                if (authStore) {
                    const userToken = JSON.parse(authStore).state.user.token
                    await axios.get(`/events/${eventId}/`, { headers: { Authorization: `Token ${userToken}` } })
                        .then((response) => {
                            const data = response.data
                            set({
                                event: data
                            })
                        })
                        .catch((e: AxiosError) => {
                            console.log(JSON.parse(e.request.response))
                        })
                }
            }
        })
    ))
);