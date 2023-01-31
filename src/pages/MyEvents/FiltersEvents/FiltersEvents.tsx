import React, { CSSProperties, SetStateAction, useEffect, useState } from 'react';

import Select, { MultiValue } from 'react-select';
import { useEventsStore } from '../../../stores';
import {
    IFiltersOption,
    GroupedOption,
} from './data';

const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
};
const groupBadgeStyles: CSSProperties = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
};

const formatGroupLabel = (data: GroupedOption) => (
    <div style={groupStyles}>
        <span>{data.name}</span>
        <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
);

interface IProps {
    searchParams: URLSearchParams;
    setSearchParams: (nextInit: URLSearchParams, navigateOptions?: { replace?: boolean | undefined; state?: any; } | undefined) => void;
}

const FiltersEvents: React.FC<IProps> = ({ searchParams, setSearchParams }) => {
    const {
        rolesList,
        levelsList,
        formatsList,
        directionList,
        organizationsList
    } = useEventsStore(state => state)

    const options: GroupedOption[] = [
        {
            name: "Уровень мероприятия",
            options: levelsList.map(item => ({ value: item.name + "-level", label: item.name }))
        },
        {
            name: "Роль СибГУ",
            options: rolesList.map(item => ({ value: item.name + "-role", label: item.name }))
        },
        {
            name: "Формат мероприятия",
            options: formatsList.map(item => ({ value: item.name + "-event_format", label: item.name }))
        },
        {
            name: "Направление воспитательных работ",
            options: directionList.map(item => ({ value: item.name + "-direction", label: item.name }))
        },
        {
            name: "Ответственное подразделение",
            options: organizationsList.map(item => ({ value: item.name + "-organizations", label: item.name }))
        }
    ]

    const [val, setVal] = useState<MultiValue<IFiltersOption>>();

    useEffect(() => {
        const params = new URLSearchParams()

        if (!val) {
            return
        }

        for (const item of val) {
            let param = item.value.split("-")
            params.append(param[1], param[0])
        }

        setSearchParams(params)
    }, [val])

    useEffect(() => {
        const newVal: IFiltersOption[] = [];
        newVal.push(...levelsList.filter(item => searchParams.getAll("level").includes(item.id + "")).map(item => ({ value: item.name + "-level", label: item.name })));
        newVal.push(...rolesList.filter(item => searchParams.getAll("role").includes(item.id + "")).map(item => ({ value: item.name + "-role", label: item.name })));
        newVal.push(...formatsList.filter(item => searchParams.getAll("event_format").includes(item.id + "")).map(item => ({ value: item.name + "-event_format", label: item.name })));
        newVal.push(...directionList.filter(item => searchParams.getAll("direction").includes(item.id + "")).map(item => ({ value: item.name + "-direction", label: item.name })));
        newVal.push(...organizationsList.filter(item => searchParams.getAll("organizations").includes(item.id + "")).map(item => ({ value: item.name + "-organizations", label: item.name })));

        setVal(newVal)
    }, [])

    return (
        <Select<IFiltersOption, true, GroupedOption>
            options={options}
            formatGroupLabel={formatGroupLabel}
            isMulti
            closeMenuOnSelect={false}
            value={val}
            onChange={setVal}
            placeholder={"Фильтры мероприятий"}
            noOptionsMessage={() => ""}
        />
    )
}

export default FiltersEvents