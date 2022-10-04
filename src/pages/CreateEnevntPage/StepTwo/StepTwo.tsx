import React, { useEffect, useState } from 'react'
import MyInput from '../../../components/UI/MyInput'
import { ICreateEvnet } from '../../../types/events';
import "./StepTwo.scss";
import { useNotification } from '../../../components/UI/MyNotification/useNotification';


interface IProps {
    data: ICreateEvnet;
    setData: React.Dispatch<React.SetStateAction<ICreateEvnet>>;
}

const StepTwo: React.FC<IProps> = ({ data, setData }) => {

    const { addToast } = useNotification()

    const [startDate, setStartDate] = useState(data.start_date)
    const [endDate, setEndDate] = useState(data.stop_date)

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
                addToast("Ошибка!", "Конечная дата не может быть перед начальноый!", "danger")
            } else {
                setEndDate(date)
            }
        }
    }

    useEffect(() => {
        setData(prev => ({
            ...prev,
            start_date: startDate,
            stop_date: endDate
        }))
    }, [startDate, endDate])

    return (
        <div className={"stepTwo-container"}>
            <div className={"input-dates-container"}>
                <h3>Основные даты</h3>
                <div className={"main-dates"}>
                    <div>
                        <label htmlFor={""}>Дата начала</label>
                        <MyInput value={startDate} onChange={(val) => dateInputHandler(val, "start")} type={"date"} />
                    </div>
                    <div>
                        <label htmlFor={""}>Дата окончания</label>
                        <MyInput value={endDate} onChange={(val) => dateInputHandler(val, "end")} type={"date"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StepTwo