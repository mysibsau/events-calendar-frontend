import React, { useEffect, useState } from 'react'
import MyInput from '../../../components/UI/MyInput'
import MyTextarea from '../../../components/UI/MyTextarea'
import { ICreateEvnet } from '../../../types/event';
import "./StepOne.scss"


interface IProps {
    data: ICreateEvnet;
    setData: React.Dispatch<React.SetStateAction<ICreateEvnet>>;
}

const StepOne: React.FC<IProps> = ({data, setData}) => {
    const [name, setName] = useState(data.name)
    const [place, setPlace] = useState(data.place)
    const [coverageParticipants, setCoverageParticipants] = useState("")
    const [hoursCount, setHoursCount] = useState("")
    const [description, setDescription] = useState(data.description)

    useEffect(() => {
        setData(prev => ({
            ...prev,
            name: name,
            place: place,
            coverage_participants_plan: parseInt(coverageParticipants),
            hours_count: parseInt(hoursCount),
            description: description
        }))
    }, [name, place, coverageParticipants, hoursCount, description])

    useEffect(() => {
        if (data.coverage_participants_plan > 0) {
            setCoverageParticipants(data.coverage_participants_plan.toString())
        }
        if (data.hours_count > 0) {
            setHoursCount(data.hours_count.toString())
        }
    }, [])

    const setCoverageParticipantsHandler = (val: string) => {
        if (parseInt(val) > 0) {
            setCoverageParticipants(val)
        }
    }

    const setHoursCountHandler = (val: string) => {
        if (parseInt(val) > 0) {
            setHoursCount(val)
        }
    }
    
    return (
        <div className={"stepOne-container"}>
            <div>
                <label htmlFor={""}>Название мероприятия</label>
                <MyInput value={name} onChange={setName} type={"text"} placeholder={"Введите название мероприятия"} />
            </div>
            <div>
                <label htmlFor={""}>Место проведения</label>
                <MyInput value={place} onChange={setPlace} type={"text"} placeholder={"Введите место проведение мероприятия"} />
            </div>
            <div className={"number-select"}>
                <div>
                    <label htmlFor={""}>Количество часов</label>
                    <MyInput value={hoursCount} onChange={setHoursCountHandler} type={"number"}/>
                </div>
                <div>
                    <label htmlFor={""}>Охват участников</label>
                    <MyInput value={coverageParticipants} onChange={setCoverageParticipantsHandler} type={"number"}/>
                </div>
            </div>
            <div>
                <label htmlFor="">Описание мероприятия</label>
                <MyTextarea maxLength={200} value={description} onChange={setDescription} placeholder={"Введите описание мероприятия"} />
            </div>
        </div>
    )
}

export default StepOne