import React, { useEffect, useState } from 'react';
import './MyEvents.scss'
import EventCard from "./EventCard/EventCard";
import { useAuthStore, useEventsStore } from '../../stores';
import { useNavigate } from 'react-router-dom';
import GroupCard from './GroupCard';
import { TEventType } from '../../types/events';
import { Button, Loader, Modal, Switcher } from '../../components/UI';
import { randomColors } from '../../App';
import CreateGroupModal from './CreateGroupModal';
import AddInGroupModal from './AddInGroupModal';


const MyEvents = () => {
    const { user } = useAuthStore(state => state)
    const { eventList, fetchEventList, loading, groupList, fetchInvitesEventList, generateTotalReport, currentEventType } = useEventsStore(state => state)
    const navigate = useNavigate()

    const [eventType, setEventType] = useState<TEventType>("my")

    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalContent, setModalContetn] = useState<React.ReactNode>()

    useEffect(() => {
        if (eventType === "my") {
            fetchEventList()
        } else {
            fetchInvitesEventList(0)
        }
    }, [eventType])

    useEffect(() => {
        setEventType(currentEventType)
    }, [currentEventType])

    const groupManipulationHandler = (type: "add" | "create") => {
        const eventIds = []

        for (const event of eventList) {
            if (event.isChecked && !event.group) {
                eventIds.push(event.id)
            }
        }

        if (type === "create") {
            if (eventIds.length > 1) {
                setModalContetn(<CreateGroupModal setShowModal={setShowModal} />)
                setModalTitle("Создание группы мероприятий")
                setShowModal(true)
            }
        } else {
            if (eventIds.length > 0) {
                setModalContetn(<AddInGroupModal setShowModal={setShowModal} />)
                setModalTitle("Добавление мероприятий в группу")
                setShowModal(true)
            }
        }
    }

    return (
        <main className={"myEvents-container"}>
            <div className={"page-head"}>
                <div className={"events-switcher"}>
                    <h1 onClick={() => setEventType("my")} className={eventType === "my" ? "active" : ""}>Мои меропрития</h1>
                    {user.role === 1
                        ? <>
                            <Switcher state={eventType !== "my"} onClick={() => setEventType(eventType === "my" ? "invites" : "my")} />
                            <h1 onClick={() => setEventType("invites")} className={eventType === "invites" ? "active" : ""}>Мероприятия моих авторов</h1>
                        </>
                        : <></>
                    }
                </div>
                <div className={"gropus-controls"}>
                    {user.role === 1
                        ? <>
                            <Button variant={"success"} onClick={() => groupManipulationHandler("create")}>Создать новую группу</Button>
                            {groupList.length ? <Button variant={"success"} onClick={() => groupManipulationHandler("add")}>Добавить в группу</Button> : null}
                        </>
                        : null
                    }
                    {user.role === 2
                        ? <>
                            <Button variant={"success"} onClick={generateTotalReport}>Выгрузить общий отчет</Button>
                        </>
                        : null
                    }
                </div>
            </div>
            <div className="events-table">
                <div className='events-table-head'>
                    <div>Название</div>
                    <div>Даты</div>
                    <div>Ответственный</div>
                    <div>Аудитория</div>
                    <div>Статус</div>
                    <div style={{ width: 25 }}></div>
                </div>
                <div className={`events-table-body${loading ? " loaded" : ""}`}>
                    {loading
                        ? <Loader />
                        : <>
                            <div className={'groupList'}>
                                {groupList.map((group, index) =>
                                    <GroupCard group={group} key={group.id} color={randomColors[index]} />
                                )}
                            </div>
                            <div className={'eventsList'}>
                                {eventList.map(event =>
                                    <EventCard event={event} key={event.id} />
                                )}
                            </div>

                        </>}
                </div>
            </div>
            <Modal isShow={showModal} setIsShow={setShowModal} title={modalTitle}>
                {modalContent}
            </Modal>
        </main>
    );
};

export default MyEvents;