import { ICreateEvnet, IEvent } from "./event";

interface IObjects {
    id: number;
    name: string;
}

export interface IEventsStore {
    eventList: Array<IEvent>;
    loading: boolean;
    error: null | string;
    directionList: IObjects[],
    formatsList: IObjects[],
    levelsList: IObjects[],
    organizationsList: IObjects[],
    rolesList: IObjects[],
    fetchEventList: () => void;
    createEvent: (event: ICreateEvnet) => void;
    deleteEvent: (eventId: string) => void;
    getData: () => void;
}