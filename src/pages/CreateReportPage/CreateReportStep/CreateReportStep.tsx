import { Input, Textarea, Button, useNotification, Select } from "../../../components/UI"
import React, { useEffect, useState } from "react"
import { IOrganizators } from "../../../types/events"
import Organizer from "./Organizer/Organizer"
import "./CreateReportStep.scss"
import { IReport } from "../../../types/report"
import { useEventsStore } from "../../../stores"


interface IProps {
    data: IReport;
    setData: React.Dispatch<React.SetStateAction<IReport>>;
    eventDateStart: string;
}

const CreateReportStep: React.FC<IProps> = ({ data, setData, eventDateStart }) => {
    const { organizatorRoles } = useEventsStore(state => state)

    const { addNotific } = useNotification()

    const [startDate, setStartDate] = useState(data.start_date_fact)
    const [endDate, setEndDate] = useState(data.stop_date_fact)
    const [links, setLinks] = useState(data.links)
    const [peopleFact, setPeopleFact] = useState<string>(data.coverage_participants_fact + "")
    const [organizators, setOrganizators] = useState<IOrganizators[]>(data.organizators)
    const [place, setPlace] = useState(data.place_fact)
    const [countIndex, setCountIndex] = useState(data.count_index)

    const [error, setError] = useState(false)

    const [role, setRole] = useState<number>(0)
    const [nameOrganizer, setNameOrganizer] = useState("")
    const [description, setDescription] = useState("")

    const addOrganizatorsHandler = () => {
        if (!description.length || !nameOrganizer.length) {
            setError(true)
            return null
        }
        setOrganizators((prev) => [
            ...prev,
            {
                name: nameOrganizer,
                position: organizatorRoles.filter(item => item.id === +role)[0].name,
                description: description,
            },
        ]);
        setError(false)
        setDescription("");
        setNameOrganizer("");
        setRole(organizatorRoles[0].id);
    };

    const editOrganizators = (editIndex: number): void => {
        const organizatorEdit = organizators[editIndex];
        setDescription(organizatorEdit.description);
        setNameOrganizer(organizatorEdit.name);
        setRole(organizatorRoles.filter(item => item.name === organizatorEdit.position)[0].id);
        removeOrganizators(editIndex);
    };

    const removeOrganizators = (deleteIndex: number) => {
        setOrganizators(organizators.filter((_, index) => index !== deleteIndex));
    };

    const getMinDate = (startDate?: string) => {
        if (startDate) {
            return new Date(startDate).toISOString().split("T")[0];
        } else {
            return new Date(eventDateStart).toISOString().split("T")[0];
        }
    }

    useEffect(() => {
        if (organizatorRoles.length) {
            setRole(organizatorRoles[0].id)
        }
    }, [organizatorRoles])

    useEffect(() => {
        setData(prev => ({
            ...prev,
            start_date_fact: startDate,
            stop_date_fact: endDate,
            place_fact: place,
            coverage_participants_fact: +peopleFact,
            links: links,
            organizators: organizators
        }))

    }, [startDate, endDate, organizators, place, links, peopleFact])

    return (
        <div className={"createReport-container"}>
            <div >
                <div className={"createReport-input-container"}>
                    <label htmlFor="">Фактический охват участников:</label>
                    <Input type={"number"} value={peopleFact} onChange={setPeopleFact} min={0} />
                </div>
                <div className={"createReport-input-container"}>
                    <label htmlFor="">Фактическое место проведения:</label>
                    <Input type={"text"} value={place} onChange={setPlace} />
                </div>
                <div>
                    <label htmlFor="">Фактические даты проведения:</label>
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
                <div className={"createReport-input-container"}>
                    <label htmlFor="">Количественные показатели:</label>
                    <Textarea value={countIndex} onChange={setCountIndex} required={true} />
                </div>
                <div className={"createReport-input-container"}>
                    <label htmlFor="">Ссылки на материалы в интернете:</label>
                    <Textarea value={links} onChange={setLinks} required={true} />
                </div>
                <label className="label-organizers">Организаторы, оказывающие помощь в проведении мероприятии: </label>
                <div className="inputs-container">
                    <div className="create-organizers-container">
                        <div className="inputs-area">
                            <div>
                                <div className={"create-organizers-input-container"}>
                                    <label htmlFor="">Имя организатора:</label>
                                    <Input
                                        type={"text"}
                                        value={nameOrganizer}
                                        onChange={setNameOrganizer}
                                        required={true}
                                        id={error ? "invalid-area" : ""}
                                    />
                                </div>
                                <div className={"create-organizers-input-container"}>
                                    <label htmlFor="">Роль:</label>
                                    <Select options={organizatorRoles} value={role} setValue={setRole} />
                                </div>
                            </div>
                            <div>
                                <div className={"create-organizers-input-container"}>
                                    <label htmlFor="">Действие совершенные студентом:</label>
                                    <Textarea value={description} onChange={setDescription} required={true} />
                                </div>
                            </div>
                        </div>
                        <div className="AllOrganizers">
                            <div className="organizers-container">
                                <Button variant={"primary"} onClick={addOrganizatorsHandler}>
                                    Добавить организатора
                                </Button>
                                {organizators.map((data, index) => (
                                    <Organizer
                                        data={data}
                                        removeOrganizators={removeOrganizators}
                                        editOrganizators={editOrganizators}
                                        index={index}
                                        key={index}
                                    />
                                )) || <></>}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreateReportStep