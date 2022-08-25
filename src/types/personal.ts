import { IAuth, TRole } from "./auth";

export interface IPersonalStore {
    personalList: IAuth[];
    inviteLink: string | undefined;
    getAuthors: () => void;
    getModerators: () => void;
    addPersonal: (role: TRole) => void;
    clearInvite: () => void;
}