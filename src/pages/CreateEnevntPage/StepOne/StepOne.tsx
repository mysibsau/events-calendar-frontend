import React, { useEffect, useState } from 'react'
import { Input, Textarea, useNotification } from '../../../components/UI'
import { ICreateEvnet } from '../../../types/events';
import "./StepOne.scss"


interface IProps {
    data: ICreateEvnet;
    setData: React.Dispatch<React.SetStateAction<ICreateEvnet>>;
}

const StepOne: React.FC<IProps> = ({ data, setData }) => {
    const { addNotific } = useNotification()
    
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

    const dateInputHandler = (date: string, type: "start" | "end" | "important") => {
        const inp_date = new Date(date).getTime()
        const start_date = new Date(startDate).getTime()
        const end_date = new Date(endDate).getTime()

        if (type === "start") {
            if (end_date && inp_date > end_date) {
                setEndDate("")
            }
            setStartDate(date)
        } else if (type === "end") {
            if (start_date && start_date > inp_date) {
                addNotific({ title: "Ошибка!", body: "Конечная дата не может быть перед начальной!", type: "danger" })
            } else {
                setEndDate(date)
            }
        }
    }

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
                <Input value={name} onChange={setName} type={"text"} placeholder={"Введите название мероприятия"} />
            </div>
            <div>
                <label htmlFor={""}>Место проведения</label>
                <Input value={place} onChange={setPlace} type={"text"} placeholder={"Введите место проведение мероприятия"} />
            </div>
            <div>
                <label htmlFor="">Даты проведения</label>
                <div className={"dates-container"}>
                    <div>
                        <label htmlFor={""}>Дата начала</label>
                        <Input value={startDate} onChange={(val) => dateInputHandler(val, "start")} type={"date"} />
                    </div>
                    <div>
                        <label htmlFor={""}>Дата окончания</label>
                        <Input value={endDate} onChange={(val) => dateInputHandler(val, "end")} type={"date"} />
                    </div>
                </div>
            </div>
            <div className={"number-select-container"}>
                <div>
                    <label htmlFor={""}>Количество часов</label>
                    <Input value={hoursCount} onChange={setHoursCountHandler} type={"number"} placeholder={"Введите количество часов"}/>
                </div>
                <div>
                    <label htmlFor={""}>Охват участников</label>
                    <Input value={coverageParticipants} onChange={setCoverageParticipantsHandler} type={"number"}  placeholder={"Введите ожидаемый охват участников"}/>
                </div>
            </div>
            <div>
                <label htmlFor="">Описание мероприятия</label>
                <Textarea value={description} onChange={setDescription} placeholder={"Введите описание мероприятия"} maxLength={500} />
            </div>
        </div>
    )
}

export default StepOne