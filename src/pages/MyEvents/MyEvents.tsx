import React, { useEffect, useState } from 'react';
import './MyEvents.scss'
import EventCard from "./EventCard/EventCard";
import { useAuthStore, useEventsStore } from '../../stores';
import { useNavigate } from 'react-router-dom';
import GroupCard from './GroupCard';
import MyButton from '../../components/UI/MyButton';
import { TEventType } from '../../types/events';


const MyEvents = () => {
    const { user } = useAuthStore(state => state)
    const { eventList, fetchEventList, loading, groupList, createGroup, fetchInvitesEventList, updateGroup } = useEventsStore(state => state)
    const navigate = useNavigate()

    const [eventType, setEventType] = useState<TEventType>("my")

    useEffect(() => {
        if (eventType === "my") {
            fetchEventList()
        } else {
            fetchInvitesEventList(0)
        }
    }, [eventType])

    const createGroupHandler = () => {
        const eventIds = []

        for (const event of eventList) {
            if (event.isCheked) {
                eventIds.push(event.id)
            }
        }

        createGroup({ description: "123", events_ids: eventIds, name: "Oleg123", start_date: "2022-12-12", stop_date: "2022-12-14" })
    }

    const updateGroupHanler = () => {
        const eventIds: number[] = []

        for (const event of eventList) {
            if (event.isCheked) {
                eventIds.push(event.id)
            }
        }

        for (const group of groupList) {
            if (group.id === 16) {
                eventIds.push(...group.events.map(item => item.id))
            }
        }

        updateGroup(eventIds, 17)
    }

    return (
        <main className={"myEvents-container"}>
            <h1>
                <span onClick={() => setEventType("my")} className={`${eventType === 'my' ? "active" : ""}`}>
                    Мои меропрития
                </span>
                {user.status !== 0
                    ? <span onClick={() => setEventType("invites")} className={`${eventType === 'invites' ? "active" : ""}`}>
                        Мероприятия моих авторов
                    </span>
                    : <></>
                }
            </h1>
            {loading &&
                <h2 style={{ "textAlign": "center" }}>Загрузка...</h2>
            }
            {!eventList.length && !groupList.length && !loading &&
                <h2 style={{ "textAlign": "center" }}>Мероприятия отсутствуют 😞. &nbsp;
                    <span className={"addContent"} onClick={() => navigate("/create-event/")}>
                        Создать?
                    </span></h2>
            }
            <div className={"add-group-container"}>
                <MyButton onClick={updateGroupHanler} variant={"primary"}>Добавить в группу</MyButton>
                <MyButton onClick={createGroupHandler} variant={"primary"}>Создать новую группу</MyButton>
            </div>
            <div className={'groupList'}>
                {groupList.map(group =>
                    <GroupCard group={group} key={group.id} />
                )}
            </div>
            <div className={'eventsList'}>
                {eventList.map(event =>
                    <EventCard event={event} key={event.id} />
                )}
            </div>
        </main>
    );
};

export default MyEvents;