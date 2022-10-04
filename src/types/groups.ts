import { IEvent } from "./events";


export interface IEventsGroup {
    id: number;
    events: IEvent[];
    name: string;
    start_date: string;
    stop_date: string;
    description: string;
}

export interface ICreateEventsGroup {
    name: string;
    start_date: string;
    stop_date: string;
    description: string;
    events_ids: string[];
}



export interface IGroupsStore {
    groupList: IEventsGroup[];
    loading: boolean;
    createGroup: (data: ICreateEventsGroup) => void; 
    deleteGroup: () => void;
}