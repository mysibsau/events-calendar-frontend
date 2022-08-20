import { ICreateEvnet, IEvent } from "./event";

export interface IEventsStore {
    eventList: Array<IEvent>;
    loading: boolean;
    error: null | string;
    fetchEventList: () => void;
    createEvent: (event: ICreateEvnet) => void;
}