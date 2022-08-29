import React, { useEffect, useState } from 'react'
import { IconCloseX } from '../../../assets/Icons'
import MyButton from '../../../components/UI/MyButton'
import MyInput from '../../../components/UI/MyInput'
import { ICreateEvnet, IImportantDates } from '../../../types/events';
import "./StepTwo.scss";
import classNames from 'classnames';
import { useNotification } from '../../../components/UI/MyNotification/useNotification';


interface IProps {
    data: ICreateEvnet;
    setData: React.Dispatch<React.SetStateAction<ICreateEvnet>>;
}

const StepTwo: React.FC<IProps> = ({ data, setData }) => {

    const { addToast } = useNotification()

    const [startDate, setStartDate] = useState(data.start_date)
    const [endDate, setEndDate] = useState(data.stop_date)

    const [enableImportantDates, setEnableImportantDates] = useState(data.important_dates.length > 0)

    const [importantDateName, setImportantDateName] = useState("")
    const [importantDateDate, setImportantDateDate] = useState("")
    const [importantDates, setImportantDates] = useState<IImportantDates[]>(data.important_dates)

    const addImportantDatesHandler = () => {
        if (importantDateName.length && importantDateDate.length) {
            setImportantDates([...importantDates, {
                date: new Date(importantDateDate).toLocaleDateString(),
                name: importantDateName
            }])
            setImportantDateName("")
            setImportantDateDate("")
        }
    }

    const deleteImpotantDatesHandler = (index: number) => {
        const newImportantDates = importantDates.filter((_, i) => i !== index)
        setImportantDates(newImportantDates)
    }

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
        } else {
            if (start_date < inp_date && inp_date < end_date) {
                if (importantDateName.length && importantDateDate.length) {
                    setImportantDates([...importantDates, {
                        date: new Date(importantDateDate).toLocaleDateString(),
                        name: importantDateName
                    }])
                    setImportantDateName("")
                    setImportantDateDate("")
                }
            } else {
                addToast("Ошибка!", "Ключевая дата выбрана вне мероприятия!", "danger")
            }
        }
    }

    useEffect(() => {
        setData(prev => ({
            ...prev,
            start_date: startDate,
            stop_date: endDate,
            important_dates: importantDates.map(item => {
                const date = item.date.split(".").map(item => parseInt(item))

                return {
                    name: item.name,
                    date: new Date(date[2], date[1], date[0]).toISOString()
                }
            })
        }))
    }, [startDate, endDate, importantDates])

    const setEnableImportantDatesHandler = () => {
        if (enableImportantDates) {
            setImportantDates([])
            setImportantDateName("")
            setImportantDateDate("")
        }
        setEnableImportantDates(!enableImportantDates)
    }

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
                <div>
                    <label htmlFor="check">Включить ключевые даты</label>
                    <input
                        type="checkbox"
                        id="check"
                        checked={enableImportantDates}
                        onChange={setEnableImportantDatesHandler}
                    />
                </div>
                <div className={classNames("special-dates", { "disabled": !enableImportantDates })}>
                    <div className={"block"}></div>
                    <h3>Ключевые даты</h3>
                    <div className={"special-dates__input"}>
                        <div>
                            <label htmlFor="">Название даты</label>
                            <MyInput value={importantDateName} onChange={setImportantDateName} type={"text"} />
                        </div>
                        <div>
                            <label htmlFor="">Дата</label>
                            <MyInput value={importantDateDate} onChange={setImportantDateDate} type={"date"} />
                        </div>
                    </div>
                    <div>
                        <MyButton variant={"success"} onClick={() => dateInputHandler(importantDateDate, "important")}>Добавить</MyButton>
                    </div>
                </div>
            </div>
            <div className={"special-dates__list"}>
                {importantDates.map((item, index) =>
                    <div key={index}>
                        <span className={"text-container"}>
                            <span className={"name"}>{index + 1}. {item.name}</span>
                            <span className={"date"}>{item.date}</span> </span>
                        <span className={"icon-container"} onClick={() => deleteImpotantDatesHandler(index)}>
                            <IconCloseX color={"black"} />
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default StepTwo