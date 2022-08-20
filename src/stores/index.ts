import shallow from "zustand/shallow";

import { useAuthStore as useAuthStoreZus } from "./useAuthStore";
import { IAuthStore } from "../types/auth";

import { useEventsStore as useEventsStoreZus } from "./useEventsStore";
import { IEventsStore } from "../types/events";

import { useEventStore as useEventStoreZus } from "./useEventStore";
import { IEventStore } from "../types/event";

const useAuthStore: <T>(selector: (s: IAuthStore) => T) =>
    T = (selector) => useAuthStoreZus(selector, shallow);

const useEventsStore: <T>(selector: (s: IEventsStore) => T) =>
    T = (selector) => useEventsStoreZus(selector, shallow);

const useEventStore: <T>(selector: (s: IEventStore) => T) =>
    T = (selector) => useEventStoreZus(selector, shallow);

export {
    useAuthStore,
    useEventsStore,
    useEventStore
};