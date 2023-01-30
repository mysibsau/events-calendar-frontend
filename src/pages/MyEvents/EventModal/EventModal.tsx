import React, { useEffect, useState } from 'react'
import { Loader, Switcher, useNotification } from '../../../components/UI';
import { useEventsStore } from '../../../stores'
import { IEvent } from '../../../types/events';
import { IReport } from '../../../types/report';
import EventInfo from './EventInfo';
import "./EventModal.scss";
import EventReport from './EventReport';


interface IProps {
    eventId: string;
    isShowEvent: boolean;
}

type menuSelect = "description" | "report";


const EventModal: React.FC<IProps> = ({ eventId, isShowEvent }) => {
    const { getEvent, getReport } = useEventsStore(state => state)
    const { addNotific } = useNotification()

    const [menuSelect, setMenuSelect] = useState<menuSelect>("description")

    const [event, setEvent] = useState<IEvent>()
    const [report, setReport] = useState<IReport>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (isShowEvent) {
            getEvent(eventId).then((resp) => {
                setLoading(false)
                setEvent(resp)

                if (resp.status > "2") {
                    getReport(eventId).then((resp)=> {
                        setReport(resp)
                    })
                }
            })
        } else {
            setLoading(true)
        }
    }, [isShowEvent])

    const setSelectMenuHandler = () => {
        if (event) {
            if (menuSelect === "description") {
                if (report) {
                    setMenuSelect("report")
                }
            } else {
                setMenuSelect("description")
            }
        }
    }

    return (
        <div>
            {!loading && event
                ? <div className={"eventModal-container"}>
                    <div className={"switch-container"}>
                        <h4 className={menuSelect === "description" ? "active" : ""} onClick={setSelectMenuHandler}>
                            Информация
                        </h4>
                        <Switcher state={menuSelect === "report"} onClick={setSelectMenuHandler} />
                        <h4 className={menuSelect === "report" ? "active" : ""} onClick={setSelectMenuHandler}>
                            Отчет
                        </h4>
                    </div>
                    {menuSelect === "description"
                        ? <EventInfo event={event} />
                        : report ? <EventReport report={report} eventId={event.id} eventStatus={event.status} authorId={event.author_id}/> : null
                    }
                </div>
                : <h2 className='event-modal-loader-container'><Loader /></h2>
            }
        </div>
    )
}

export default EventModal