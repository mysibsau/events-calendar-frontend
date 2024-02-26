import React, { useEffect, useState } from 'react';
import './MyEvents.scss'
import EventCard from "./EventCard/EventCard";
import { useAuthStore, useEventsStore } from '../../stores';
import GroupCard from './GroupCard';
import { TEventType } from '../../types/events';
import { Button, Loader, Modal, Switcher } from '../../components/UI';
import { randomColors } from '../../App';
import CreateGroupModal from './CreateGroupModal';
import AddInGroupModal from './AddInGroupModal';
import { useSearchParams } from 'react-router-dom';
import FiltersEvents from './FiltersEvents';


const MyEvents = () => {
    const { user } = useAuthStore(state => state)
    const { eventList, fetchEventList, loading, groupList, fetchInvitesEventList, generateTotalReport, currentEventType, archivedEvent } = useEventsStore(state => state)

    const [eventType, setEventType] = useState<TEventType>("my")

    const [showArchived,setShowArchived] = useState(false)

    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalContent, setModalContetn] = useState<React.ReactNode>()

    const [searchParams, setSearchParams] = useSearchParams({});

    const [sortDirection, setSortDirection] = useState('asc');
    const [sortBy, setSortBy] = useState("");

    useEffect(() => {
        if (eventType === "my") {
            fetchEventList()
        } else {
            fetchInvitesEventList(0)
        }
    }, [eventType, searchParams])

    useEffect(() => {
        setEventType(currentEventType)
    }, [currentEventType])

    const createArchivedHandler = () => {
        const eventIds = eventsIsChecked()
        archivedEvent({ events_ids: eventIds, name: '' })
    }

    const groupManipulationHandler = (type: "add" | "create") => {
        const eventIds = eventsIsChecked()

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

    const eventsIsChecked = () => {
        const eventIds = []

        for (const event of eventList) {
            if (event.isChecked && !event.group) {
                eventIds.push(event.id)
            }
        }

        return eventIds
    }

    const handleSortByResponsible = () => {
        console.log('author_name')
        if (sortBy === 'author_name') {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy('author_name')
            setSortDirection('asc')
        }
    }

        const handleSortByDate = () => {
        console.log('date')
        if (sortBy === 'date') {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy('date')
            setSortDirection('asc')
        }
    }

    const sortedEventList = [...eventList].sort((a, b) => {
        if (sortBy === 'author_name') {
            const nameA = a.author_name.toUpperCase()
            const nameB = b.author_name.toUpperCase()
            if (nameA < nameB) {
                return sortDirection === 'asc' ? -1 : 1
            }
            if (nameA > nameB) {
                return sortDirection === 'asc' ? 1 : -1
            }
            return 0
        } else if (sortBy === 'date') {
            const dateA = new Date(a.start_date).getTime()
            const dateB = new Date(b.start_date).getTime()
            return sortDirection === 'asc' ? dateA - dateB : dateB - dateA
        }
        return 0
    });

    const getSortIcon = (fieldName: string) => {
        if (sortBy === fieldName) {
            return sortDirection === 'asc' ? '↑' : '↓';
        }
        return null;
    };

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
                    {eventsIsChecked().length ? <Button variant={"success"} onClick={() => createArchivedHandler()}>{showArchived ? "Разархивировать" : "Архивировать"}</Button> : null }
                    <Button variant={showArchived ? "primary" : "default"} onClick={() => setShowArchived(!showArchived)}>Архив</Button>
                    {user.role === 1
                        ? <>
                            <Button variant={"success"} onClick={() => groupManipulationHandler("create")}>Создать новую группу</Button>
                            {groupList.length ? <Button variant={"success"} onClick={() => groupManipulationHandler("add")}>Добавить в группу</Button> : null}
                        </>
                        : null
                    }
                    {user.role !== 0
                        ? <>
                            <Button variant={"success"} onClick={generateTotalReport}>Выгрузить общий отчет в CSV</Button>
                        </>
                        : null
                    }
                </div>
            </div>
            <div className='filters-container'>
                <FiltersEvents searchParams={searchParams} setSearchParams={setSearchParams} />
            </div>
            <div className="events-table">
                <div className='events-table-head'>
                    <div>Название</div>
                    <div className='event-sort' onClick={handleSortByDate}>Даты {getSortIcon('date')}</div>
                    <div className='event-sort' onClick={() => handleSortByResponsible()}>Ответственный {getSortIcon('author_name')}</div>
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
                                {showArchived
                                    ?
                                    sortedEventList.map(event =>
                                        !event.archived ? null : <EventCard event={event} key={event.id} />
                                    )
                                    :
                                    sortedEventList.map(event =>
                                        event.archived ? null : <EventCard event={event} key={event.id} />
                                    )
                                }
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