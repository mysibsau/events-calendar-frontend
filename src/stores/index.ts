import shallow from "zustand/shallow";

import { useAuthStore as useAuthStoreZus } from "./useAuthStore";
import { IAuthStore } from "../types/auth";

import { useEventsStore as useEventsStoreZus } from "./useEventsStore";
import { IEventsStore } from "../types/events";

import { useEventStore as usePersonalStoreZus } from "./usePersonalStore";
import { IPersonalStore } from "../types/personal";

const useAuthStore: <T>(selector: (s: IAuthStore) => T) =>
    T = (selector) => useAuthStoreZus(selector, shallow);

const useEventsStore: <T>(selector: (s: IEventsStore) => T) =>
    T = (selector) => useEventsStoreZus(selector, shallow);

const usePersonalStore: <T>(selector: (s: IPersonalStore) => T) =>
    T = (selector) => usePersonalStoreZus(selector, shallow);

export {
    useAuthStore,
    useEventsStore,
    usePersonalStore
};