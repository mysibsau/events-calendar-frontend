import React, { useEffect, useState } from 'react'
import { IconCloseX, Input, Select } from '../../../components/UI'
import { useEventsStore } from '../../../stores';
import { ICreateEvnet, IObjects } from '../../../types/events';
import "./StepTwo.scss";


interface IProps {
    data: ICreateEvnet;
    setData: React.Dispatch<React.SetStateAction<ICreateEvnet>>;
}

type TSelectMenu = "education_work" | "role" | "format" | "direction" | "level" | "organization"

const educationWorkList = [
    {
        id: 0,
        name: "В рамках ОПОП"
    },
    {
        id: 1,
        name: "За пределами ОПОП"
    }
]

const selectTitles: Record<TSelectMenu, string> = {
    education_work: "Вопситательная работа: ",
    direction: "Направление воспитательных работ: ",
    format: "Формат мероприятия: ",
    role: "Роль СибГУ: ",
    level: "Уровень мероприятия: ",
    organization: "Ответственное подразделение: "
}

const StepTwo: React.FC<IProps> = ({ data, setData }) => {
    const { directionList, formatsList, rolesList, levelsList, organizationsList } = useEventsStore(state => state)

    const [currentSelectObjects, setCurrentSelectObjects] = useState<IObjects[]>(educationWorkList)
    const [currentSelectType, setCurrentSelectType] = useState<TSelectMenu>("education_work")
    const [selectItems, setSelectItems] = useState<Record<TSelectMenu, string>>({
        education_work: "",
        direction: "",
        format: "",
        role: "",
        level: "",
        organization: ""
    })

    const switchSelectmenu = (typeMenu: TSelectMenu) => {
        switch (typeMenu) {
            case "direction": {
                setCurrentSelectObjects(directionList)
                break
            }
            case "role": {
                setCurrentSelectObjects(rolesList)
                break
            }
            case "format": {
                setCurrentSelectObjects(formatsList)
                break
            }
            case "education_work": {
                setCurrentSelectObjects(educationWorkList)
                break
            }
            case "level": {
                setCurrentSelectObjects(levelsList)
                break
            }
            case "organization": {
                setCurrentSelectObjects(organizationsList)
                break
            }
        }
        setCurrentSelectType(typeMenu)
    }

    useEffect(() => {
        setSelectItems({
            education_work: data.educational_work_in_opop ? "В рамках ОПОП" : "За пределами ОПОП",
            direction: data.direction,
            format: data.format,
            role: data.role,
            level: data.level,
            organization: data.organization
        })
    }, [])

    const setDataHandler = (dataType: TSelectMenu, data: string) => {
        switch (dataType) {
            case "direction": {
                setData((prev => ({
                    ...prev,
                    direction: data,
                })))
                break
            }
            case "role": {
                setData((prev => ({
                    ...prev,
                    role: data,
                })))
                break
            }
            case "format": {
                setData((prev => ({
                    ...prev,
                    format: data,
                })))
                break
            }
            case "education_work": {
                setData((prev => ({
                    ...prev,
                    educational_work_in_opop: data === "В рамках ОПОП",
                })))
                break
            }
            case "level": {
                setData((prev => ({
                    ...prev,
                    level: data,
                })))
                break
            }
            case "organization": {
                setData((prev => ({
                    ...prev,
                    organization: data,
                })))
                break
            }
        }
        setSelectItems(prev => ({
            ...prev,
            [dataType]: data
        }))
    }

    return (
        <div className={"stepTwo-container"}>
            <div className={"inputs"}>
                <div onClick={() => switchSelectmenu("education_work")}>
                    <label>Воспитательная работа<span className={"requaired_star"}>*</span>: </label>
                    <div className={`inputs-item-name ${currentSelectType === "education_work" ? "active" : ""}`}>
                        {selectItems.education_work
                            ? selectItems.education_work
                            : "Выберите элемент"
                        }
                    </div>
                </div>
                <div onClick={() => switchSelectmenu("direction")}>
                    <label>Направление воспитательных работ<span className={"requaired_star"}>*</span>: </label>
                    <div className={`inputs-item-name ${currentSelectType === "direction" ? "active" : ""}`}>
                        {selectItems.direction
                            ? selectItems.direction
                            : "Выберите элемент"
                        }
                    </div>
                </div>
                <div onClick={() => switchSelectmenu("role")}>
                    <label>Роль СибГУ<span className={"requaired_star"}>*</span>: </label>
                    <div className={`inputs-item-name ${currentSelectType === "role" ? "active" : ""}`}>
                        {selectItems.role
                            ? selectItems.role
                            : "Выберите элемент"
                        }
                    </div>
                </div>
                <div onClick={() => switchSelectmenu("level")}>
                    <label>Уровень мероприятия<span className={"requaired_star"}>*</span>: </label>
                    <div className={`inputs-item-name ${currentSelectType === "level" ? "active" : ""}`}>
                        {selectItems.level
                            ? selectItems.level
                            : "Выберите элемент"
                        }
                    </div>
                </div>
                <div onClick={() => switchSelectmenu("format")}>
                    <label>Формат мероприятия<span className={"requaired_star"}>*</span>: </label>
                    <div className={`inputs-item-name ${currentSelectType === "format" ? "active" : ""}`}>
                        {selectItems.format.length
                            ? selectItems.format
                            : "Выберите элемент"
                        }
                    </div>
                </div>
                <div onClick={() => switchSelectmenu("organization")}>
                    <label>Ответственное подразделение<span className={"requaired_star"}>*</span>: </label>
                    <div className={`inputs-item-name ${currentSelectType === "organization" ? "active" : ""}`}>
                        {selectItems.organization.length
                            ? selectItems.organization
                            : "Выберите элемент"
                        }
                    </div>
                </div>
            </div>
            <div className={`select-input`}>
                <div className='title'>{selectTitles[currentSelectType]}</div>
                <ul className='items-container'>
                    {currentSelectObjects.map(item =>
                        <li
                            className={`${selectItems[currentSelectType] === item.name ? "active" : ""}`}
                            onClick={() => setDataHandler(currentSelectType, item.name)}
                            key={item.id}
                        >
                            {item.name}
                        </li>
                    )}
                </ul>
            </div>

        </div>
    )
}

export default StepTwo