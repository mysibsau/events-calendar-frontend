import { IAuth, TRole } from "./auth";

interface ICreatePersonal {
    status: number;
    position: string;
}

export interface IPersonal {
    id: string;
    first_name: string;
    last_name: string;
    contacts_info: string;
    role: TRole;
    status: number;
    position: string;
}

export interface IPersonalStore {
    personalList: IPersonal[];
    inviteLink: string | undefined;
    getPersonal: (role: TRole) => void;
    addPersonal: (role: TRole, data: ICreatePersonal) => void;
    clearInvite: () => void;
}