export interface IImportantDates{
    name: string;
    date: string;
}

type IEventStatus = "0" | "1" | "2" | "3" | "4"

export interface IEvent{
    id: number;
    important_dates: Array<IImportantDates>;
    name: string;
    free_plan: boolean;
    hours_count: number;
    educational_work_in_opop: boolean;
    start_date: string;
    stop_date: string;
    place: string;
    coverage_participants_plan: number;
    coverage_participants_fact: number;
    links: string;
    direction: number;
    level: number;
    role: number;
    format: number;
    author: string;
    organization: number;
    description: string;
    
    status?: IEventStatus;
    verified?: number;
    verified_date?: string;
}

export interface ICreateEvnet {
    id: number;
    description: string;
    name: string;
    place: string;
    hours_count: number;
    start_date: string;
    stop_date: string;
    important_dates: Array<IImportantDates>;
    educational_work_in_opop: boolean;
    coverage_participants_plan: number;
    direction: number;
    level: number;
    role: number;
    format: number;
    organization: number;
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
    loading: boolean;
    directionList: IObjects[];
    formatsList: IObjects[];
    levelsList: IObjects[];
    organizationsList: IObjects[];
    rolesList: IObjects[];
    getEvent: (eventId: string) => Promise<IEvent>;
    fetchEventList: () => void;
    getData: () => void;
    createEvent: (event: ICreateEvnet, isEdited: IEdit) => void;
    deleteEvent: (eventId: string) => void;
}