export interface IFiltersOption {
    value: string;
    label: string;
}

export interface GroupedOption {
    name: string;
    options: IFiltersOption[];
}

export const groupedOptions: readonly GroupedOption[] = [];

