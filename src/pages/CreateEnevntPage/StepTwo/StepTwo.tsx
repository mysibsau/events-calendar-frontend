import React, { useEffect, useState } from 'react'
import { IconCloseX } from '../../../assets/Icons'
import MyButton from '../../../components/UI/MyButton'
import MyInput from '../../../components/UI/MyInput'
import { ICreateEvnet, IImportantDates } from '../../../types/event';
import "./StepTwo.scss";
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';


interface IProps {
    data: ICreateEvnet;
    setData: React.Dispatch<React.SetStateAction<ICreateEvnet>>;
}

const StepTwo: React.FC<IProps> = ({ data, setData }) => {

    const [startDate, setStartDate] = useState(data.start_date)
    const [endDate, setEndDate] = useState(data.stop_date)

    const [enableImportantDates, setEnableImportantDates] = useState(false)

    const [importantDateName, setImportantDateName] = useState("")
    const [importantDateDate, setImportantDateDate] = useState("")
    const [importantDates, setImportantDates] = useState<Record<string, IImportantDates>>({})

    const addImportantDatesHandler = () => {
        if (importantDateName.length && importantDateDate.length) {
            setImportantDates(prev => ({
                ...prev,
                ...{
                    [`${uuidv4()}`]: {
                        name: importantDateName,
                        date: (new Date(importantDateDate)).toLocaleString().split(",")[0]
                    }
                }
            }))
            setImportantDateName("")
            setImportantDateDate("")
        }
    }

    const deleteImpotantDatesHandler = (key: string) => {
        const newImportantDates = { ...importantDates }
        delete newImportantDates[key]
        setImportantDates(newImportantDates)
    }

    useEffect(() => {
        if (data.important_dates.length) {
            const newImpotanDates: Record<string, IImportantDates> = {}

            for (const impDate of data.important_dates) {
                newImpotanDates[`${uuidv4()}`] = impDate
            }

            setImportantDates(newImpotanDates)
            setEnableImportantDates(true)
        }
    }, [])

    useEffect(() => {
        setData(prev => ({
            ...prev,
            start_date: startDate,
            stop_date: endDate,
            important_dates: Object.values(importantDates)
        }))
    }, [startDate, endDate, importantDates])

    const setEnableImportantDatesHandler = () => {
        if (enableImportantDates) {
            setImportantDates({})
            setImportantDateName("")
            setImportantDateDate("")
        }
        setEnableImportantDates(!enableImportantDates)
    }

    return (
        <div className={"stepTwo-container"}>
            <div className={"input-dates-container"}>
                <div className={"main-dates"}>
                    <h3>Основные даты</h3>
                    <div>
                        <label htmlFor={""}>Дата начала</label>
                        <MyInput value={startDate} onChange={setStartDate} type={"date"} />
                    </div>
                    <div>
                        <label htmlFor={""}>Дата окончания</label>
                        <MyInput value={endDate} onChange={setEndDate} type={"date"} />
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
                        <div>
                            <MyButton variant={"success"} onClick={addImportantDatesHandler}>Добавить</MyButton>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"special-dates__list"}>
                {Object.keys(importantDates).map((key, index) =>
                    <div key={key}>
                        <span className={"text-container"}>
                            <span className={"name"}>{index + 1}. {importantDates[key].name}</span>
                            <span className={"date"}>{importantDates[key].date}</span> </span>
                        <span className={"icon-container"} onClick={() => deleteImpotantDatesHandler(key)}>
                            <IconCloseX color={"black"} />
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default StepTwo