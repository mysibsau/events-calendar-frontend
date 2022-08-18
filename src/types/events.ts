interface ImportantDates{
    name: string;
    date: string;
}

export interface IMyEvent{
    id: number;
    name: string;
    start_date: string;
    stop_date: string;
    is_verified: boolean;
    educational_work_in_opop: boolean;
    hours_count: number;
    educational_work_outside_opop: boolean;
    place: string;
    coverage_participants_plan: number;
    responsible: string;
    direction: number;
    format: number;
    author: string;
    organization: string;
    verified: number;
    important_dates: Array<ImportantDates>;
    level: number;
}

export interface IEventsStore {
    eventList: Array<IMyEvent>;
    loading: boolean;
    error: null | string;
    fetchEventList: () => void;
    fetchEvent: (eventId: string) => void;
}