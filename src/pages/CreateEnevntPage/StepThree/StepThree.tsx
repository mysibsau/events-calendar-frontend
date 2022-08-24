import React, { useEffect, useState } from 'react'
import MyInput from '../../../components/UI/MyInput';
import MySelect from '../../../components/UI/MySelect';
import { useEventsStore } from '../../../stores';
import { ICreateEvnet } from '../../../types/event';
import "./StepThree.scss";


interface IProps {
    data: ICreateEvnet;
    setData: React.Dispatch<React.SetStateAction<ICreateEvnet>>;
}

const StepThree: React.FC<IProps> = ({ data, setData }) => {
    const { directionList, formatsList, rolesList, levelsList, organizationsList, getData } = useEventsStore(state => state)

    const [educationalWork, setEducationalWork] = useState(false)
    const [role, setRole] = useState<number>(-1)
    const [format, setFormat] = useState<number>(-1)

    const [direction, setDirection] = useState(-1)
    const [level, setLevel] = useState(-1)
    const [organization, setOrganization] = useState(-1)

    const radioHandler = (val: React.ChangeEvent<HTMLInputElement>) => {
        const value = val.target.value

        if (value === "in") {
            setEducationalWork(true)
        } else {
            setEducationalWork(false)
        }
    }

    useEffect(() => {
        setEducationalWork(data.educational_work_outside_opop)
        setRole(data.role)
        setFormat(data.format)
        setDirection(data.direction)
        setLevel(data.level)
        setOrganization(data.organization)
    }, [])

    useEffect(() => {
        setData(prev => ({
            ...prev,
            educational_work: educationalWork,
            role: role,
            format: format,
            direction: direction,
            level: level,
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
                            checked={educationalWork}
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
                            checked={!educationalWork}
                        />
                    </div>
                </div>
            </div>
            <div>
                <label htmlFor={""}>Направление воспитательных работ: </label>
                <MySelect options={directionList} value={direction} setValue={(val) => setDirection(parseInt(val))} />
            </div>
            <div>
                <label htmlFor={""}>Роль СибГУ: </label>
                <MySelect options={rolesList} value={role} setValue={(val) => setRole(parseInt(val))} />
            </div>
            <div>
                <label htmlFor={""}>Уровень мероприятия: </label>
                <MySelect options={levelsList} value={level} setValue={(val) => setLevel(parseInt(val))} />
            </div>
            <div>
                <label htmlFor={""}>Формат мероприятия: </label>
                <MySelect options={formatsList} value={format} setValue={(val) => setFormat(parseInt(val))} />
            </div>
            <div>
                <label htmlFor={""}>Ответственное подразделение: </label>
                <MySelect options={organizationsList} value={organization} setValue={(val) => setOrganization(parseInt(val))} />
            </div>
        </div>
    )
}

export default StepThree