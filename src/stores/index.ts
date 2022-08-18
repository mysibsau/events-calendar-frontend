import shallow from "zustand/shallow";

import { useAuthStore as useAuthStoreZus } from "./useAuthStore";
import { IAuthStore } from "../types/auth";

import { useEventsStore as useEventsStoreZus } from "./useEventsStore";
import { IEventsStore } from "../types/events";

const useAuthStore: <T>(selector: (s: IAuthStore) => T) =>
    T = (selector) => useAuthStoreZus(selector, shallow);

const useEventsStore: <T>(selector: (s: IEventsStore) => T) =>
    T = (selector) => useEventsStoreZus(selector, shallow);

export {
    useAuthStore,
    useEventsStore
};