
export interface IOrganizators {
    name: string;
    position: string;
    description: string;
}

export interface IReport {
    start_date_fact: string;
    stop_date_fact: string;
    place_fact: string;
    coverage_participants_fact: number;
    links: string;
    organizators: IOrganizators[];
}