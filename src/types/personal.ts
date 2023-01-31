import { TRole } from "./auth";

interface ICreatePersonal {
    status: number;
    position: string;
    contact_info: string;
}

export interface IPersonal {
    id: string;
    first_name: string;
    last_name: string;
    contact_info: string;
    role: TRole;
    status: number;
    position: string;
    creation_date: string;
}

export interface IPersonalStore {
    personalList: IPersonal[];
    inviteLink: string | undefined;
    loading: boolean;
    getPersonal: (role: TRole, isAll?: boolean) => void;
    addPersonal: (role: TRole, data: ICreatePersonal) => void;
    deletePersonal: (id: string, user_for_transfer: string) => void;
    clearInvite: () => void;
}