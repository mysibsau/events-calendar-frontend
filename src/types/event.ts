export interface IImportantDates{
    name: string;
    date: string;
}

type IEventStatus = "0" | "1" | "2" | "3"

export interface IEvent{
    id: number;
    is_verified: boolean;
    important_dates: Array<IImportantDates>;
    name: string;
    status: IEventStatus;
    free_plan: boolean;
    educational_work_outside_opop: boolean;
    hours_count: number;
    educational_work_in_opop: boolean;
    start_date: string;
    stop_date: string;
    place: string;
    coverage_participants_plan: number;
    // number_organizers: number;
    responsible: string;
    coverage_participants_fact: number;
    links: string;
    verified_date: string;
    direction: number;
    level: number;
    role: number;
    format: number;
    author: string;
    organization: string;
    verified: number;
}

export interface ICreateEvnet {
    responsible: string;
    ///
    contacts: string;
    description: string;
    post: string; // Студент или сотрудник
    ///
    name: string;
    place: string;
    hours_count: number;
    start_date: string;
    stop_date: string;
    important_dates: Array<IImportantDates>;
    educational_work: number;
    coverage_participants_plan: number;
    direction: number;
    level: number;
    role: number;
    format: number;
    organization: string;
}

export interface IEventStore {
    event: IEvent;
    loading: boolean;
    error: null | string;
    getEvent: (eventId: string) => void;
}