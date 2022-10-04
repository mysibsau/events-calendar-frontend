import { TRole } from "./auth";

type IEventStatus = "0" | "1" | "2" | "3" | "4"
export type TEventType = "my" | "invites"

export interface IEvent {
    id: number;
    name: string;
    free_plan: boolean;
    hours_count: number;
    educational_work_in_opop: boolean;
    start_date: string;
    stop_date: string;
    place: string;
    coverage_participants_plan: number;
    direction: number;
    level: number;
    role: number;
    format: number;
    author: string;
    organization: number;
    description: string;

    group?: number;

    coverage_participants_fact: number;
    links: string;
    organizators: IOrganizators[];

    status: IEventStatus;
    verified: number;
    verified_date: string;

    isCheked: boolean;
}

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
    events_ids: number[];
}

export interface ICreateEvnet {
    description: string;
    name: string;
    place: string;
    hours_count: number;
    start_date: string;
    stop_date: string;
    educational_work_in_opop: boolean;
    coverage_participants_plan: number;
    direction: number;
    level: number;
    role: number;
    format: number;
    organization: number;
}

export interface IOrganizators {
    name: string;
    position: string;
    description: string;
}

export interface ICreateReport {
    coverage_participants_fact: number;
    links: string;
    organizators: IOrganizators[];
}

interface IObjects {
    id: number;
    name: string;
}

interface IEdit {
    edited: boolean;
    eventId: string;
}

export interface IEventsStore {
    eventList: Array<IEvent>;
    groupList: IEventsGroup[];
    loading: boolean;
    directionList: IObjects[];
    formatsList: IObjects[];
    levelsList: IObjects[];
    organizationsList: IObjects[];
    rolesList: IObjects[];
    getEvent: (eventId: string) => Promise<IEvent>;
    fetchEventList: () => void;
    fetchInvitesEventList: (role: TRole) => void;
    getData: () => void;
    createEvent: (event: ICreateEvnet, isEdited: IEdit) => void;
    deleteEvent: (eventId: string) => void;
    createReport: (eventId: string, data: ICreateReport) => void;
    setChecked: (eventId: number) => void;
    createGroup: (data: ICreateEventsGroup) => void;
    deleteGroup: (groupId: number) => void;
    updateGroup: (event_ids: number[], groupId: number) => void;
}