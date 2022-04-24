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
    important_dates: Array<ImportantDates>;
}

export interface EventsState {
    events: Array<IMyEvent>;
    loading: boolean;
    error: null | string;
}

export enum AuthActionTypes {
    FETCH_EVENTS = 'FETCH_EVENTS',
    FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS',
    FETCH_EVENTS_ERROR = 'FETCH_EVENTS_ERROR',
}

interface FetchEventsAction {
    type: AuthActionTypes.FETCH_EVENTS
}
interface FetchEventsSuccessAction {
    type: AuthActionTypes.FETCH_EVENTS_SUCCESS;
    payload: Array<IMyEvent>;
}
interface FetchEventsErrorAction {
    type: AuthActionTypes.FETCH_EVENTS_ERROR;
    payload: string
}

export type EventsAction = FetchEventsAction | FetchEventsSuccessAction | FetchEventsErrorAction