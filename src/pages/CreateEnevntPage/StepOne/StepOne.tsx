import React, { useEffect, useState } from 'react'
import { Input, Textarea } from '../../../components/UI'
import { ICreateEvnet } from '../../../types/events';
import "./StepOne.scss"


interface IProps {
    data: ICreateEvnet;
    setData: React.Dispatch<React.SetStateAction<ICreateEvnet>>;
}

const StepOne: React.FC<IProps> = ({ data, setData }) => {
    const [name, setName] = useState(data.name)
    const [place, setPlace] = useState(data.place)
    const [coverageParticipants, setCoverageParticipants] = useState("")
    const [hoursCount, setHoursCount] = useState("")
    const [description, setDescription] = useState(data.description)

    const [startDate, setStartDate] = useState(data.start_date)
    const [endDate, setEndDate] = useState(data.stop_date)

    useEffect(() => {
        setData(prev => ({
            ...prev,
            name: name,
            place: place,
            coverage_participants_plan: parseInt(coverageParticipants),
            hours_count: parseInt(hoursCount),
            description: description,
            start_date: startDate,
            stop_date: endDate
        }))
    }, [name, place, coverageParticipants, hoursCount, description, startDate, endDate])

    useEffect(() => {
        if (data.coverage_participants_plan > 0) {
            setCoverageParticipants(data.coverage_participants_plan.toString())
        }
        if (data.hours_count > 0) {
            setHoursCount(data.hours_count.toString())
        }
        setName(data.name)
        setPlace(data.place)
        setDescription(data.description)
    }, [])

    const getMinDate = (startDate?: string) => {
        if (startDate) {
            return new Date(startDate).toISOString().split("T")[0];
        } else {
            return new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split("T")[0];
        }
    }

    return (
        <div className={"stepOne-container"}>
            <div>
                <label htmlFor={""}>Название мероприятия<span className={"requaired_star"}>*</span></label>
                <Input value={name} onChange={setName} type={"text"} placeholder={"Введите название мероприятия"} />
            </div>
            <div>
                <label htmlFor={""}>Место проведения<span className={"requaired_star"}>*</span></label>
                <Input value={place} onChange={setPlace} type={"text"} placeholder={"Введите место проведение мероприятия"} />
            </div>
            <div>
                <label htmlFor="">Даты проведения<span className={"requaired_star"}>*</span></label>
                <div className={"dates-container"}>
                    <div>
                        <label htmlFor={""}>Дата начала</label>
                        <Input value={startDate} onChange={setStartDate} type={"date"} min={getMinDate()} />
                    </div>
                    <div>
                        <label htmlFor={""}>Дата окончания</label>
                        <Input value={endDate} onChange={setEndDate} type={"date"} min={getMinDate(startDate)} />
                    </div>
                </div>
            </div>
            <div className={"number-select-container"}>
                <div>
                    <label htmlFor={""}>Количество часов</label>
                    <Input value={hoursCount} onChange={setHoursCount} type={"number"} placeholder={"Введите количество часов"} min={0} />
                </div>
                <div>
                    <label htmlFor={""}>Охват участников<span className={"requaired_star"}>*</span></label>
                    <Input value={coverageParticipants} onChange={setCoverageParticipants} type={"number"} placeholder={"Введите ожидаемый охват участников"} min={0} />
                </div>
            </div>
            <div>
                <label htmlFor="">Описание мероприятия<span className={"requaired_star"}>*</span></label>
                <Textarea value={description} onChange={setDescription} placeholder={"Введите описание мероприятия"} maxLength={500} />
            </div>
        </div>
    )
}

export default StepOne