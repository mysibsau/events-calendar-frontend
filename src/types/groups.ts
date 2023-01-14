import { IEvent } from "./events";


export interface IEventsGroup {
    id: number;
    events: IEvent[];
    name: string;
}

export interface ICreateEventsGroup {
    name: string;
    events_ids: number[];
}

export interface IUpdateEventsGroup {
    events_ids?: number[];
    name?: string;
}
