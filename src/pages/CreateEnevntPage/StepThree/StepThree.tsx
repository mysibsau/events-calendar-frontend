import React, { useEffect, useState } from 'react'
import MyInput from '../../../components/UI/MyInput';
import MySelect from '../../../components/UI/MySelect';
import { ICreateEvnet } from '../../../types/event';
import "./StepThree.scss";


interface IProps {
    data: ICreateEvnet;
    setData: React.Dispatch<React.SetStateAction<ICreateEvnet>>;
}

const directionOptions = [
    {
        value: "-1",
        label: "Выберите направление мероприятия"
    },
    {
        value: "0",
        label: "Культурно-творческое"
    },
    {
        value: "1",
        label: "Добровольческое"
    },
    {
        value: "2",
        label: "Научно-образовательное"
    },
    {
        value: "3",
        label: "Гражданско-патриотическое"
    },
    {
        value: "4",
        label: "Духовно-нравственное"
    },
    {
        value: "5",
        label: "Здоровьесберегающее"
    },
    {
        value: "6",
        label: "Профессионально-трудовое"
    },
    {
        value: "7",
        label: "Социально-культурное"
    },
    {
        value: "8",
        label: "Студенческое самоуправление"
    }
]

const levelOptions = [
    {
        value: "-1",
        label: "Выберите уровень мероприятия"
    },
    {
        value: "0",
        label: "Институтский"
    },
    {
        value: "1",
        label: "Университетский"
    },
    {
        value: "2",
        label: "Городской"
    },
    {
        value: "3",
        label: "Региональный"
    },
    {
        value: "4",
        label: "Федеральный"
    }
]

const rasioButtons: Record<string, Record<string, number>> = {
    educationalWork: {
        in: 0,
        out: 1
    },
    role: {
        organizer: 0,
        coOrganizer: 1
    },
    format: {
        online: 0,
        offline: 1
    }
}

const StepThree: React.FC<IProps> = ({ data, setData }) => {
    const [educationalWork, setEducationalWork] = useState<number>(-1)
    const [role, setRole] = useState<number>(-1)
    const [format, setFormat] = useState<number>(-1)

    const [direction, setDirection] = useState("")
    const [level, setLevel] = useState("")
    const [organization, setOrganization] = useState("")

    const radioHandler = (val: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = val.target
        
        if (name === "educationalWork") {
            setEducationalWork(rasioButtons[`${name}`][`${value}`])
        } else if (name === "role") {
            setRole(rasioButtons[`${name}`][`${value}`])
        } else if (name === "format") {
            setFormat(rasioButtons[`${name}`][`${value}`])
        }
    }

    useEffect(() => {
        setEducationalWork(data.educational_work)
        setRole(data.role)
        setFormat(data.format)
        setDirection(data.direction.toString())
        setLevel(data.level.toString())
        setOrganization(data.organization)
    }, [])

    useEffect(() => {
        setData(prev => ({
            ...prev,
            educational_work: educationalWork,
            role: role,
            format: format,
            direction: parseInt(direction),
            level: parseInt(level),
            organization: organization
        }))
    }, [educationalWork, role, format, direction, level, organization])

    return (
        <div className={"stepThree-container"}>
            <div>
                <label htmlFor={""}>Воспитательная работа: </label>
                <div className={"radio-container"}>
                    <div>
                        <label htmlFor="educationalWorkIn">В рамках ОПОП</label>
                        <input
                            id="educationalWorkIn"
                            type="radio"
                            name="educationalWork"
                            onChange={(e) => radioHandler(e)}
                            value={"in"}
                            checked={educationalWork === 0}
                        />
                    </div>
                    <div>
                        <label htmlFor="educationalWorkOut">За пределами ОПОП</label>
                        <input
                            id="educationalWorkOut"
                            type="radio"
                            name="educationalWork"
                            onChange={(e) => radioHandler(e)}
                            value={"out"}
                            checked={educationalWork === 1}
                        />
                    </div>
                </div>
            </div>
            <div>
                <label htmlFor={""}>Направление воспитательных работ: </label>
                <MySelect options={directionOptions} value={direction} setValue={setDirection} />
            </div>
            <div>
                <label htmlFor={""}>Роль СибГУ: </label>
                <div className={"radio-container"}>
                    <div>
                        <label htmlFor="roleOrganizer">Организатор</label>
                        <input
                            id="roleOrganizer"
                            type="radio"
                            name="role"
                            onChange={(e) => radioHandler(e)}
                            value={"organizer"}
                            checked={role === 0}
                        />
                    </div>
                    <div>
                        <label htmlFor="roleCoOrganizer">Соорганизатор</label>
                        <input
                            id="roleCoOrganizer"
                            type="radio"
                            name="role"
                            onChange={(e) => radioHandler(e)}
                            value={"coOrganizer"}
                            checked={role === 1}
                        />
                    </div>
                </div>
            </div>
            <div>
                <label htmlFor={""}>Уровень мероприятия: </label>
                <MySelect options={levelOptions} value={level} setValue={setLevel} />
            </div>
            <div>
                <label htmlFor={""}>Формат мероприятия: </label>
                <div className={"radio-container"}>
                    <div>
                        <label htmlFor="formatOnline">Онлайн</label>
                        <input
                            id="formatOnline"
                            type="radio"
                            name="format"
                            onChange={(e) => radioHandler(e)}
                            value={"online"}
                            checked={format === 0}
                        />
                    </div>
                    <div>
                        <label htmlFor="formatOffline">Оффлайн</label>
                        <input
                            id="formatOffline"
                            type="radio"
                            name="format"
                            onChange={(e) => radioHandler(e)}
                            value={"offline"}
                            checked={format === 1}
                        />
                    </div>
                </div>
            </div>
            <div>
                <label htmlFor={""}>Ответственное подразделение: </label>
                <MyInput value={organization} onChange={setOrganization} type={"text"} placeholder={"Введите ответственное подразделение"} />
            </div>
        </div>
    )
}

export default StepThree