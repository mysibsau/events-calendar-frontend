import { TRole } from "./auth";
import { ICreateEventsGroup, IEventsGroup, IUpdateEventsGroup } from "./groups";
import { IReport } from "./report";

export type IEventStatus = "0" | "1" | "2" | "3" | "4" | "5";
export type TEventType = "my" | "invites";

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
    organization: number;
    description: string;

    author_id: number;
    author_name: string;

    group?: number;

    coverage_participants_fact: number;
    links: string;
    organizators: IOrganizators[];

    status: IEventStatus;
    verified: number;
    verified_date: string;

    isChecked: boolean;
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

export interface IObjects {
    id: number;
    name: string;
}

interface IEdit {
    edited: boolean;
    eventId: string;
}

export interface IEventsStore {
    currentEventType: TEventType;
    eventList: Array<IEvent>;
    groupList: IEventsGroup[];
    loading: boolean;
    directionList: IObjects[];
    formatsList: IObjects[];
    levelsList: IObjects[];
    organizationsList: IObjects[];
    rolesList: IObjects[];

    getEvent: (eventId: string) => Promise<IEvent>;
    getData: () => void;

    fetchEventList: () => void;
    fetchInvitesEventList: (role: TRole) => void;
    createEvent: (event: ICreateEvnet, isEdited: IEdit) => void;
    verifiedEvent: (eventId: number, isVerified: boolean, msg?: string) => void;
    deleteEvent: (eventId: string) => void;
    setChecked: (eventId: number) => void;

    createReport: (eventId: string, data: IReport) => void;
    getReport: (eventId: string) => Promise<IReport>;
    generateReport: (eventId: number) => void;

    generateTotalReport: () => void;

    createGroup: (data: ICreateEventsGroup) => void;
    deleteGroup: (groupId: number) => void;
    updateGroup: (data: IUpdateEventsGroup, groupId: number) => void;
}