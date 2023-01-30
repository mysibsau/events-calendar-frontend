import React, { useState } from 'react';
import './EventCard.scss'
import { IEvent } from "../../../types/events";
import { IconElips, ColorTypes } from '../../../components/UI/Icons';
import { useAuthStore, useEventsStore } from '../../../stores';
import EventModal from '../EventModal';
import { Button, Modal, Tooltip } from '../../../components/UI';


interface IProps {
    event: IEvent;
}

interface IElipsData {
    color: ColorTypes;
    message: string;
}

type TModalContent = "eventInfo" | "createReport"

const EventCard: React.FC<IProps> = ({ event }) => {
    const { setChecked } = useEventsStore(state => state)
    const { user } = useAuthStore(state => state)

    const [showEvent, setShowEvent] = useState(false)
    const [modalContent, setModalContetn] = useState<React.ReactNode>()

    const start_date = new Date(event.start_date).toLocaleString('ru', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    })

    const stop_date = new Date(event.stop_date).toLocaleString('ru', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    })

    const elipceData = (): IElipsData => {
        switch (event!.status) {
            case "0":
                return { color: "danger", message: "Отклонено" }
            case "1":
                return { color: "default", message: "В обработке" }
            case "2":
                return { color: "warning", message: "В ожидании отчета" }
            case "3":
                return { color: "success", message: "Верефицировано" }
            case "4":
                return { color: "danger", message: "Отклонен отчет" }
            case "5":
                return { color: "primary", message: "В ожидании верификации отчета" }
            default:
                return { color: "default", message: "В обработке" }
        }
    }

    const setModalContentHandler = (type: TModalContent) => {
        if (type === "eventInfo") {
            setModalContetn(<EventModal eventId={event.id.toString()} isShowEvent={true} />)
        }

        setShowEvent(true)
    }
    return (
        <div className={'eventCard-container'}>
            <div className={`event-card-item`}>
                <h2>
                    {user.role === 1 && !event.group
                        ? <input type="checkbox" id={`event-checkbox-${event.id}`} onChange={() => setChecked(event.id)} />
                        : <></>
                    }
                    <label htmlFor={`event-checkbox-${event.id}`}>
                        {event.name}
                    </label>
                </h2>
                <div className={"event-dates"}>
                    {start_date === stop_date
                        ? <span>{start_date}</span>
                        : <span>{start_date} - {stop_date}</span>
                    }
                </div>
                <div className={"event-author"}>
                    <span>{event.author_name}</span>
                </div>
                <div className={"event-place"}>
                    <span>{event.place}</span>
                </div>
                <div className={"event-status"}>
                    <Tooltip text={elipceData().message} position={"left"}>
                        <IconElips color={elipceData().color} size={25} />
                    </Tooltip>
                </div>
                <div>
                    <Button variant={"primary"} onClick={() => setModalContentHandler("eventInfo")}>Проверить</Button>
                </div>
            </div>
            <Modal isShow={showEvent} setIsShow={setShowEvent} title={`Название мероприятия: ${event.name}`}>
                {modalContent}
            </Modal>
        </div>
    );
};

export default EventCard;